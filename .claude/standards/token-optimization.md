# Token Optimization Standard

**Purpose:** Define how CEF keeps Claude's context lean and effective — what to load, when, and how to avoid wasting the token budget.

**Description:** Context is a finite, expensive resource, and how it is spent determines how well Claude performs. This standard will prescribe the discipline of loading only the standards relevant to the task at hand, summarizing rather than pasting, using memory as compressed long-term storage, and structuring documents so they are cheap to reference. It governs the framework's own economy: CEF must be powerful without being heavy. It coordinates with the memory standard and the workflows that decide what context each phase needs.

## Scope

- Selective loading: pull only the standards a task requires.
- Summarization vs. full-text inclusion.
- Using memory as compressed context.
- Document structure that minimizes reference cost.
- Measuring and budgeting context usage per workflow phase.

## Status

Draft (AS-000). This standard is scaffolded; its rules will be authored in a later module.

## TODO

- [ ] Define selective-loading rules per workflow phase.
- [ ] Codify when to summarize vs. include full text.
- [ ] Specify how memory offloads context.
- [ ] Provide guidance on measuring token spend.
