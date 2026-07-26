import { dirname, resolve } from 'node:path';
import { isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import { NodeFileSystem } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { loadClaudeContext, projectRoot } from './support.js';

/** `cef roadmap` — display the implementation roadmap; `--write` also persists `.cef/roadmap.md`. */
export class RoadmapCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'roadmap',
    description: 'Display the implementation roadmap with milestone progress.',
    options: [
      { flags: '--dir <path>', description: 'project directory (default: current directory)' },
      { flags: '--write', description: 'also write .cef/roadmap.md' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await loadClaudeContext(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const { engine, roadmap } = loaded.value;
    const rendered = engine.renderRoadmap(roadmap);

    if (input.options['write'] === true) {
      const fs = new NodeFileSystem();
      const outputPath = resolve(projectRoot(input), rendered.path);
      await fs.mkdir(dirname(outputPath));
      await fs.writeFile(outputPath, rendered.content);
    }

    return ok({ message: rendered.content });
  }
}
