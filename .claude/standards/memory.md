# Memory Standard

**Purpose:** Define how CEF captures, structures, and reuses institutional memory across sessions — what is remembered, where, and when.

**Description:** A framework that forgets is a framework that repeats itself. This standard governs the `memory/` directory: which facts belong in `project`, `architecture`, `branding`, `client`, `design-system`, `session`, `decisions`, `todos`, and `deployment`; the format each file uses; when Claude must write to memory; and how memory is read back at the start of work. It ensures branding, decisions, and context are established once and honored forever. It coordinates with the token-optimization standard so memory stays useful without bloating context.

## Scope

- The role and schema of each memory file.
- When to write to memory (decisions, branding, deployment facts).
- When to read memory (start of every workflow).
- Keeping memory current, deduplicated, and trustworthy.
- The relationship between memory and token budget.

## Status

Draft (AS-000). This standard is scaffolded; its rules will be authored in a later module.

## TODO

- [ ] Define the schema for each memory file.
- [ ] Codify write triggers and read timing.
- [ ] Specify deduplication and staleness rules.
- [ ] Link memory discipline to token optimization.
