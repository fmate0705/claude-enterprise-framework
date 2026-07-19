#!/usr/bin/env node
import { CEF_CORE_VERSION } from '@cef/core';
import { readCliVersion } from '../version.js';

/**
 * M0 entry point.
 *
 * Prints the CLI and core versions to prove the binary runs and that cross-package
 * resolution (`@cef/cli` → `@cef/core`) works end-to-end through the workspace. The
 * Commander program and command registry replace this in milestone M4
 * (`ARCHITECTURE.md` §10); the Command Pattern dispatch is introduced there.
 */
function main(): void {
  const cliVersion = readCliVersion();
  process.stdout.write(`cef ${cliVersion} (core ${CEF_CORE_VERSION})\n`);
}

main();
