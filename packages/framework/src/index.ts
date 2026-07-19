import { fileURLToPath } from 'node:url';

/**
 * `@cef/framework` — the CEF framework (AS-000…AS-020) shipped as data.
 *
 * The package contains the policies, standards, rules, templates, and descriptors the CLI
 * loads dynamically at runtime (`ARCHITECTURE.md` §7). It exposes no framework rules as
 * code — only a locator so consumers can resolve the data directory without hardcoding a
 * path. Milestone M1 migrates the existing `.claude/` content into this package.
 *
 * @returns the absolute filesystem path to the installed package root, where the framework
 * data (starting with `framework.manifest.yaml`) lives.
 */
export function frameworkRoot(): string {
  return fileURLToPath(new URL('..', import.meta.url));
}
