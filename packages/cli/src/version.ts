import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Reads the CLI's own version from its `package.json` — the single source of truth, so the
 * printed version can never drift from the published version (no hardcoded version literal).
 *
 * Resolves `package.json` relative to this module, which works both from source (under
 * `vitest`) and from the compiled output (`dist/version.js`), because in both layouts the
 * file sits one directory above the module.
 */
export function readCliVersion(): string {
  const packageJsonUrl = new URL('../package.json', import.meta.url);
  const raw = readFileSync(fileURLToPath(packageJsonUrl), 'utf8');
  const parsed = JSON.parse(raw) as { version?: unknown };
  if (typeof parsed.version !== 'string') {
    throw new Error('@cef/cli package.json is missing a string "version" field');
  }
  return parsed.version;
}
