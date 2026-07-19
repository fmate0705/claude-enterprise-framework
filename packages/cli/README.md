# @cef/cli

The Claude Enterprise Framework command-line application. Installs the `cef` binary, which
becomes the runtime for the framework: it scaffolds, configures, validates, reviews, and
prepares enterprise websites for release (`ARCHITECTURE.md` §1).

```bash
npm i -g @cef/cli
cef info
```

> Status: M0 ships a runnable binary that reports its version. The command layer
> (`create`, `validate`, `review`, `release`, …) is delivered across milestones M4–M10.

## Development

```bash
corepack pnpm install
corepack pnpm build
node packages/cli/dist/bin/cef.js
```
