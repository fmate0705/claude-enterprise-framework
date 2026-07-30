# Installing the CEF CLI

This guide explains how to build the `cef` command line from the monorepo, make it
available as a `cef` command, and verify the install. For the full command
reference and an end‑to‑end workflow, see [COMMANDS.md](COMMANDS.md).

---

## Prerequisites

- **Node.js ≥ 20** (the repo is developed and tested on Node 20+; Node 24 works).
- **pnpm 10** — the workspace pins `pnpm@10.15.0`. The easiest way to get the
  correct version is **Corepack**, which ships with Node:

  ```bash
  corepack enable
  ```

  Then run pnpm as `corepack pnpm …` (used throughout this guide) so the pinned
  version is always used.
- **git** on your `PATH` (used by `cef create` to initialize a repository).

> On Windows, run the commands from **Git Bash** or **PowerShell**. Where a
> command differs, both are shown.

---

## 1. Clone and install

```bash
git clone <cef-repo-url> cef
cd cef
corepack pnpm install
```

This installs every workspace package and links them together.

---

## 2. Build

Compile all packages (TypeScript project references, built in dependency order):

```bash
corepack pnpm build
```

This produces the compiled CLI at **`packages/cli/dist/bin/cef.js`**.

To rebuild after changes, run `corepack pnpm build` again, or `corepack pnpm clean`
first for a full rebuild.

---

## 3. Make `cef` available

The CLI is a Node executable. Pick whichever option suits you.

### Option A — a shell alias (simplest)

**macOS / Linux / Git Bash**

```bash
alias cef="node $(pwd)/packages/cli/dist/bin/cef.js"
```

Add that line (with an absolute path) to your `~/.bashrc` or `~/.zshrc` to make it
permanent.

**Windows (PowerShell)**

```powershell
function cef { node "C:\path\to\cef\packages\cli\dist\bin\cef.js" @args }
```

Add the function to your PowerShell `$PROFILE` to make it permanent.

### Option B — run it directly

No setup required — just call the built file:

```bash
node packages/cli/dist/bin/cef.js --version
node packages/cli/dist/bin/cef.js create my-app --yes
```

### Option C — link globally with pnpm

From the CLI package, link the `cef` binary onto your `PATH`:

```bash
corepack pnpm --filter @cef/cli link --global
```

> If a global link fails with a permissions error, use Option A or B instead — they
> require no elevated permissions.

---

## 4. Verify the install

```bash
cef --version        # prints the CLI version
cef --help           # lists every command
```

You should see the full command list (create, analyze, blueprint, design,
generate, review, approve, …). If `cef --help` prints the commands, the install is
working.

Run a dry scaffold to confirm end to end (writes nothing):

```bash
cef create demo --yes --dry-run
```

---

## 5. First run

```bash
cef create acme-law --yes --type landing-page --framework nextjs
cd acme-law
cef blueprint                      # plan the project
cef generate --theme legal         # generate the Next.js site
cef review --theme legal           # review across 12 quality gates
```

See [COMMANDS.md](COMMANDS.md) for the complete workflow, all options, and how the
pipeline fits together.

---

## Working on the CLI itself

The repo is a pnpm workspace with a single quality gate. Before committing any
change, the full `verify` gate must pass:

```bash
corepack pnpm verify
```

which runs, in order:

```
tsc -b                       # build all packages
tsc -p tsconfig.check.json   # type-check including tests
eslint .                     # lint
prettier --check .           # formatting
vitest run                   # the test suite
```

Useful individual scripts:

| Command | What it does |
| --- | --- |
| `corepack pnpm build` | Compile all packages |
| `corepack pnpm test` | Run the test suite once |
| `corepack pnpm test:watch` | Run tests in watch mode |
| `corepack pnpm lint` | ESLint |
| `corepack pnpm format` | Prettier check |
| `corepack pnpm format:write` | Prettier write |
| `corepack pnpm typecheck` | `tsc` build + test type‑check |

---

## Updating

```bash
git pull --ff-only
corepack pnpm install    # in case dependencies changed
corepack pnpm build      # rebuild the CLI
```

Review [CHANGELOG.md](CHANGELOG.md) for what changed between versions.

---

## Uninstalling

The CLI keeps no state outside the repository and the projects it generates.

- Remove any `cef` alias/function from your shell profile.
- If you linked globally: `corepack pnpm --filter @cef/cli unlink --global`.
- Delete the cloned repository.

---

## Note on the framework standards

Separately from the CLI, the CEF **constitution and standards** live in
[`.claude/`](.claude/) and are meant to be loaded by Claude Code (via your global
`~/.claude/CLAUDE.md`) so every session inherits the framework's engineering
discipline. That ambient‑standards install is independent of building the CLI and
is described in [`.claude/CLAUDE.md`](.claude/CLAUDE.md).
