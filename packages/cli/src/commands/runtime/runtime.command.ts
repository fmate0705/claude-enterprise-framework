import { resolve } from 'node:path';
import { cefError, err, ErrorCode, isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import { Runtime, SilentLogger } from '@cef/runtime';
import type { ExecutionSession } from '@cef/runtime';
import { NodeFileSystem } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';

/**
 * `cef runtime <action>` — boots the Runtime for the current project and inspects it.
 * `info` shows loaded engines, skills, MCPs, order, and validation status; `graph` renders
 * the execution graph. Inspection only — it never generates.
 */
export class RuntimeCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'runtime',
    description: 'Inspect the runtime for the current project (info | graph).',
    arguments: [{ name: '<action>', description: 'info | graph' }],
    options: [
      { flags: '--dir <path>', description: 'project directory (default: current directory)' },
      { flags: '--json', description: 'output machine-readable JSON (info only)' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const action = input.args[0];
    if (action !== 'info' && action !== 'graph') {
      return err(
        cefError(ErrorCode.InvalidInput, `Unknown runtime action "${action ?? ''}".`, {
          hint: 'Use "cef runtime info" or "cef runtime graph".',
        }),
      );
    }

    const root =
      typeof input.options['dir'] === 'string' ? resolve(input.options['dir']) : process.cwd();

    const booted = await new Runtime().boot({
      projectRoot: root,
      fs: new NodeFileSystem(),
      logger: new SilentLogger(),
    });
    if (isErr(booted)) {
      return booted;
    }

    if (action === 'graph') {
      return ok({ message: this.renderGraph(booted.value) });
    }
    const asJson = input.options['json'] === true;
    return ok({ message: asJson ? this.renderJson(booted.value) : this.renderInfo(booted.value) });
  }

  private renderInfo(session: ExecutionSession): string {
    const list = (values: readonly string[]): string =>
      values.length > 0 ? values.join(', ') : '—';
    const engines = session.engines
      .map((id, index) => `  ${String(index + 1).padStart(2, ' ')}. ${id}`)
      .join('\n');
    const added =
      session.addedEngines.length > 0 ? ` (auto-added: ${session.addedEngines.join(', ')})` : '';
    return [
      `Runtime: ready`,
      `Project: ${session.manifest.project.name} (${session.manifest.project.type}) — ${session.project.framework}`,
      `Framework version: ${session.manifest.frameworkVersion}`,
      `Validation: passed`,
      '',
      `Engines — ${session.engines.length}${added}, in execution order:`,
      engines,
      '',
      `Skills: ${list(session.skills)}`,
      `MCP: ${list(session.mcp)}`,
      `Capabilities: ${session.capabilities.length}`,
    ].join('\n');
  }

  private renderJson(session: ExecutionSession): string {
    return `${JSON.stringify(
      {
        status: session.status,
        project: { name: session.manifest.project.name, type: session.manifest.project.type },
        framework: session.project.framework,
        frameworkVersion: session.manifest.frameworkVersion,
        engines: session.engines,
        addedEngines: session.addedEngines,
        skills: session.skills,
        mcp: session.mcp,
        validation: 'passed',
      },
      null,
      2,
    )}`;
  }

  private renderGraph(session: ExecutionSession): string {
    return [
      `Execution graph — ${session.graph.nodeCount()} nodes, ${session.graph.edgeCount()} edges`,
      `(each line shows an engine and the dependencies it waits for):`,
      '',
      session.graph.render(),
    ].join('\n');
  }
}
