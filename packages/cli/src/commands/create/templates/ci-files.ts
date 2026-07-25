import type { GeneratedFile } from '@cef/core';
import type { PackageManager } from '@cef/core';
import type { TemplateContext } from '../context.js';

const SETUP: Record<PackageManager, { install: string; run: string; cache: string }> = {
  pnpm: { install: 'pnpm install --frozen-lockfile=false', run: 'pnpm', cache: 'pnpm' },
  npm: { install: 'npm install', run: 'npm run', cache: 'npm' },
  yarn: { install: 'yarn install', run: 'yarn', cache: 'yarn' },
  bun: { install: 'bun install', run: 'bun run', cache: '' },
};

/** GitHub Actions CI workflow, generated when requested. */
export function githubActions(ctx: TemplateContext): GeneratedFile {
  const pm = SETUP[ctx.spec.packageManager];
  const usesPnpm = ctx.spec.packageManager === 'pnpm';
  const content = `name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
${usesPnpm ? '      - uses: pnpm/action-setup@v4\n' : ''}      - uses: actions/setup-node@v4
        with:
          node-version: 20
${pm.cache ? `          cache: ${pm.cache}\n` : ''}      - run: ${pm.install}
      - run: ${pm.run} build
`;
  return { path: '.github/workflows/ci.yml', content };
}
