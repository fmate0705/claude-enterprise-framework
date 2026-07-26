import { dirname, resolve } from 'node:path';
import { cefError, err, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import { DesignEngine } from '@cef/design-system';
import type {
  ComponentDescriptor,
  DesignPreset,
  Theme,
  ValidationReport,
} from '@cef/design-system';
import { NodeFileSystem } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';

type Handler = (input: CommandInput) => Promise<Result<CommandOutput, CefError>>;

/**
 * `cef design <action>` — inspect, preview, validate, and emit the design system. Dispatch is a
 * registry lookup over action handlers; there is no switch statement. Inspection actions need no
 * project; `tokens` and `theme` write into `.cef/design/`.
 */
export class DesignCommand implements Command {
  private readonly engine = new DesignEngine();
  private readonly fs = new NodeFileSystem();
  private readonly handlers = new Map<string, Handler>([
    ['list', (input) => this.list(input)],
    ['inspect', (input) => this.inspect(input)],
    ['preview', (input) => this.preview(input)],
    ['validate', () => this.validate()],
    ['tokens', (input) => this.tokens(input)],
    ['theme', (input) => this.theme(input)],
  ]);

  readonly definition: CommandDefinition = {
    name: 'design',
    description:
      'Inspect the design system (list | inspect | preview | validate | tokens | theme).',
    arguments: [
      { name: '<action>', description: 'list | inspect | preview | validate | tokens | theme' },
      { name: '[target]', description: 'kind or id (e.g. components, hero, luxury)' },
    ],
    options: [
      { flags: '--dir <path>', description: 'project directory for tokens/theme (default: cwd)' },
      { flags: '--preset <id>', description: 'apply a design preset' },
      { flags: '--theme <id>', description: 'theme id (default: base)' },
      { flags: '--print', description: 'print instead of writing files' },
      { flags: '--json', description: 'machine-readable JSON output' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const action = input.args[0];
    const handler = action !== undefined ? this.handlers.get(action) : undefined;
    if (!handler) {
      return err(
        cefError('INVALID_INPUT', `Unknown design action "${action ?? ''}".`, {
          hint: 'Use list | inspect | preview | validate | tokens | theme.',
        }),
      );
    }
    return handler(input);
  }

  private async list(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const kind = input.args[1];
    if (kind === undefined) {
      return ok({
        message: [
          'Design system:',
          `  components  ${this.engine.components.size()}`,
          `  layouts     ${this.engine.layouts.all().length}`,
          `  themes      ${this.engine.themes.list().length}`,
          `  presets     ${this.engine.presets.list().length}`,
          `  patterns    ${this.engine.patterns.all().length}`,
          'List one with: cef design list <components|layouts|themes|presets|patterns>',
        ].join('\n'),
      });
    }
    const rows = this.rowsFor(kind);
    if (!rows) {
      return err(
        cefError('INVALID_INPUT', `Unknown kind "${kind}".`, {
          hint: 'Use components | layouts | themes | presets | patterns.',
        }),
      );
    }
    return ok({
      message: `${kind} (${rows.length}):\n${rows.map((row) => `  ${row}`).join('\n')}`,
    });
  }

  private rowsFor(kind: string): readonly string[] | undefined {
    switch (kind) {
      case 'components':
        return this.engine.components
          .all()
          .map((c) => `${c.id.padEnd(18)} ${c.category.padEnd(14)} ${c.complexity}`);
      case 'layouts':
        return this.engine.layouts
          .all()
          .map((l) => `${l.id.padEnd(16)} ${l.sections.length} sections`);
      case 'themes':
        return this.engine.themes.list().map((t) => `${t.id.padEnd(14)} ${t.category}`);
      case 'presets':
        return this.engine.presets.list().map((p) => `${p.id.padEnd(12)} ${p.description}`);
      case 'patterns':
        return this.engine.patterns.all().map((p) => `${p.id.padEnd(20)} → ${p.layout}`);
      default:
        return undefined;
    }
  }

  private async inspect(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const id = input.args[1];
    if (id === undefined) {
      return err(
        cefError('INVALID_INPUT', 'Provide an id to inspect.', {
          hint: 'e.g. cef design inspect hero',
        }),
      );
    }
    const component = this.engine.components.get(id);
    if (component) {
      return ok({ message: this.renderComponent(component) });
    }
    const theme = this.engine.themes.get(id);
    if (theme) {
      return ok({ message: this.renderTheme(theme) });
    }
    const preset = this.engine.presets.get(id);
    if (preset) {
      return ok({ message: this.renderPreset(preset) });
    }
    return err(
      cefError('INVALID_INPUT', `No component, theme, or preset with id "${id}".`, {
        hint: 'Use "cef design list <kind>" to see available ids.',
      }),
    );
  }

  private async preview(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const id = input.args[1];
    const preset = id !== undefined ? this.engine.presets.get(id) : undefined;
    const theme = id !== undefined ? this.engine.themes.get(id) : undefined;
    if (!preset && !theme) {
      return err(
        cefError('INVALID_INPUT', `Preview needs a preset or theme id (got "${id ?? ''}").`, {
          hint: 'e.g. cef design preview premium',
        }),
      );
    }
    if (preset) {
      const tokens = this.engine.resolveTokens(preset.id);
      return ok({
        message: [
          `Preview — preset "${preset.name}"`,
          preset.description,
          `  type ratio     ${preset.typography.ratio} (base→7xl: ${tokens.typography.scale.base.sizeRem}rem → ${tokens.typography.scale['7xl'].sizeRem}rem)`,
          `  radius (md)    ${tokens.radius.md}`,
          `  grid           ${tokens.gridColumns} columns`,
          `  motion         ${preset.motionStyle}`,
          `  color strategy ${preset.colorStrategy}`,
        ].join('\n'),
      });
    }
    return ok({ message: this.renderTheme(theme as Theme) });
  }

  private async validate(): Promise<Result<CommandOutput, CefError>> {
    const report = this.engine.validate();
    if (report.issues.length === 0) {
      return ok({ message: '✔ Design system is valid — no issues found.' });
    }
    const lines = this.renderIssues(report);
    if (!report.ok) {
      return err(cefError('VALIDATION_FAILED', `Design validation failed:\n${lines}`));
    }
    return ok({ message: `Design system valid with warnings:\n${lines}` });
  }

  private async tokens(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const presetId =
      typeof input.options['preset'] === 'string' ? input.options['preset'] : undefined;
    const themeId = typeof input.options['theme'] === 'string' ? input.options['theme'] : 'base';

    if (input.options['print'] === true) {
      return ok({
        message: this.engine.tokens.toCssVariables(this.engine.resolveTokens(presetId)),
      });
    }
    const files = this.engine.designFiles({
      ...(presetId !== undefined ? { presetId } : {}),
      themeId,
    });
    await this.writeAll(input, files);
    return ok({
      message: [`✔ Wrote ${files.length} design files:`, ...files.map((f) => `  ${f.path}`)].join(
        '\n',
      ),
    });
  }

  private async theme(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const themeId = input.args[1] ?? 'base';
    const theme = this.engine.themes.get(themeId);
    if (!theme) {
      return err(
        cefError('INVALID_INPUT', `Unknown theme "${themeId}".`, {
          hint: 'Use "cef design list themes".',
        }),
      );
    }
    const presetId =
      typeof input.options['preset'] === 'string' ? input.options['preset'] : undefined;
    const css = this.engine.styleTemplate(themeId, presetId);
    if (input.options['print'] === true) {
      return ok({ message: css });
    }
    await this.writeAll(input, [{ path: '.cef/design/styles.css', content: css }]);
    return ok({ message: `✔ Wrote .cef/design/styles.css for theme "${themeId}".` });
  }

  private async writeAll(
    input: CommandInput,
    files: readonly { path: string; content: string }[],
  ): Promise<void> {
    const root =
      typeof input.options['dir'] === 'string' ? resolve(input.options['dir']) : process.cwd();
    for (const file of files) {
      const outputPath = resolve(root, file.path);
      await this.fs.mkdir(dirname(outputPath));
      await this.fs.writeFile(outputPath, file.content);
    }
  }

  private renderComponent(component: ComponentDescriptor): string {
    return [
      `${component.name} (${component.id}) — ${component.category}, ${component.complexity} complexity`,
      component.description,
      `  variants:      ${component.variants.join(', ')}`,
      `  slots:         ${component.slots.map((s) => `${s.name}${s.required ? '*' : ''}`).join(', ')}`,
      `  composition:   ${component.compositionRules.join(' · ')}`,
      `  dependencies:  ${component.dependencies.length > 0 ? component.dependencies.join(', ') : '—'}`,
      `  accessibility: ${component.accessibilityNotes.join(' · ')}`,
      `  seo:           ${component.seoNotes.length > 0 ? component.seoNotes.join(' · ') : '—'}`,
      `  animation:     ${component.animation.supported ? component.animation.presets.join(', ') : 'none'}`,
      `  responsive:    ${component.responsiveBehaviour}`,
      `  frameworks:    ${component.supportedFrameworks.join(', ')}`,
    ].join('\n');
  }

  private renderTheme(theme: Theme): string {
    const pair = (label: string, fg: string, bg: string): string => {
      const check = this.engine.accessibility.check(fg, bg);
      return `  ${label.padEnd(20)} ${fg} on ${bg} — ${check?.ratio ?? '?'}:1 ${check?.aa ? 'AA' : 'FAIL'}`;
    };
    return [
      `Theme "${theme.name}" (${theme.id}) — ${theme.category}`,
      'Light scheme contrast:',
      pair('foreground/bg', theme.light.foreground, theme.light.background),
      pair('primary text', theme.light.primaryForeground, theme.light.primary),
      'Dark scheme contrast:',
      pair('foreground/bg', theme.dark.foreground, theme.dark.background),
      pair('primary text', theme.dark.primaryForeground, theme.dark.primary),
    ].join('\n');
  }

  private renderPreset(preset: DesignPreset): string {
    return [
      `Preset "${preset.name}" (${preset.id})`,
      preset.description,
      `  typography     ${preset.typography.ratio}, pairing ${preset.typography.pairingId}`,
      `  spacing        ${preset.spacingDensity}`,
      `  motion         ${preset.motionStyle}`,
      `  component style radius=${preset.componentStyle.radius}, button=${preset.componentStyle.button}, elevation=${preset.componentStyle.elevation}`,
      `  grid           ${preset.gridColumns} columns`,
      `  color strategy ${preset.colorStrategy}`,
    ].join('\n');
  }

  private renderIssues(report: ValidationReport): string {
    return report.issues
      .map((issue) => `  ${issue.severity === 'error' ? '✖' : '⚠'} ${issue.message}`)
      .join('\n');
  }
}
