# Claude Enterprise Framework (CEF)

> The operating standard for Claude Code when building enterprise-grade websites and applications.

**Version:** 0.1.0
**Status:** Initializing (AS-000 — Repository Initialization)

---

## What CEF Is

The Claude Enterprise Framework (CEF) is an opinionated, batteries-included standard that turns Claude Code from a general-purpose coding assistant into a **disciplined senior engineering team**.

It is not a website. It is not a UI kit. It is not a collection of loose prompts.

CEF is a **framework** — a coherent body of standards, workflows, checklists, templates, and institutional memory that governs how Claude Code discovers requirements, plans architecture, writes code, reviews its own work, and ships production software.

When CEF is installed, Claude Code stops improvising. It follows a documented, repeatable, opinionated process — the same way Laravel, Rails, or Vercel encode a point of view about how software should be built.

---

## Goals

CEF exists to make Claude-authored software **predictable, professional, and production-ready** by default. Specifically:

1. **Consistency** — Every project built with CEF follows the same architecture, naming, and quality conventions, regardless of who prompted it.
2. **Enterprise quality** — Accessibility, performance, SEO, security, and legal compliance are treated as first-class requirements, not afterthoughts.
3. **Opinionation** — CEF makes decisions so the engineer doesn't have to. There is a right way to do things, and CEF documents it.
4. **Repeatability** — Discovery, planning, implementation, review, and deployment are codified as workflows, not reinvented per session.
5. **Institutional memory** — Decisions, branding, and context persist across sessions through structured memory files.
6. **Speed without sacrifice** — Templates and prompts accelerate greenfield work while checklists guard the quality bar.

---

## Philosophy

CEF is built on a small set of strong beliefs:

- **Opinionated over configurable.** A framework that decides is more valuable than a framework that asks. Defaults are chosen, documented, and defended.
- **Documentation is the product.** The standards *are* the framework. Prose quality matters as much as code quality. No placeholders, no lorem ipsum, no empty files.
- **Standards are law; workflows are process.** Standards define *what good looks like*. Workflows define *how work moves* from idea to production.
- **Quality is not negotiable.** Accessibility, performance, and security are constraints, not features to be traded away under deadline pressure.
- **Memory beats repetition.** Context captured once — branding, architecture, decisions — should never need to be re-explained.
- **Every decision is opinionated.** When two approaches exist, CEF names the winner and explains why.

If it reads like a prompt, it doesn't belong here. If it reads like the documentation of a mature open-source framework, it does.

---

## Repository Overview

```
CEF/
├── README.md              This document
├── INSTALL.md             Global installation, updating, and usage
├── CHANGELOG.md           Versioned history of the framework
├── LICENSE                Licensing terms
├── .gitignore             Ignored artifacts
└── .claude/
    ├── CLAUDE.md          The framework constitution (loaded by Claude Code)
    ├── standards/         What "good" looks like — the rules of the framework
    ├── workflows/         How work moves from discovery to maintenance
    ├── checklists/        Gate criteria that must pass before a phase completes
    ├── templates/         Scaffolds for common project archetypes
    ├── prompts/           Bootstrapping prompts by website/application type
    ├── memory/            Persistent, per-project institutional memory
    └── examples/          Reference implementations built to CEF standards
```

- **`standards/`** — The canonical rules for architecture, design, motion, UI, React, Next.js, TypeScript, Docker, deployment, SEO, AI-SEO, performance, testing, security, accessibility, legal, images, copywriting, review, memory, and token optimization.
- **`workflows/`** — The lifecycle: discovery → planning → implementation → review → deployment → maintenance.
- **`checklists/`** — Pass/fail gates for design, SEO, performance, accessibility, deployment, and release.
- **`templates/`** — Opinionated starting points for Next.js, React, full-stack, landing page, dashboard, SaaS, and agency projects.
- **`prompts/`** — Ready-to-run project kickoff prompts for landing pages, company sites, SaaS, dashboards, ecommerce, portfolios, restaurants, medical, law firms, and hotels.
- **`memory/`** — Structured files where Claude records project, architecture, branding, client, design-system, session, decisions, todo, and deployment context.
- **`examples/`** — End-to-end reference builds: a premium landing page, a company site, an admin dashboard, and a full-stack app.

---

## Installation

CEF is designed to be installed **globally** so that every project Claude Code touches inherits the standard.

See [INSTALL.md](INSTALL.md) for the full guide covering:

- Installing CEF globally
- Updating to a new version
- Using CEF in an existing project
- Bootstrapping a new project from a CEF template or prompt

Quick summary:

```bash
# Clone the framework into your global Claude configuration
git clone <cef-repo-url> ~/.claude/cef
```

The authoritative, always-current instructions live in [INSTALL.md](INSTALL.md).

---

## Versioning

CEF follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`):

- **MAJOR** — Breaking changes to standards, workflows, or the framework contract that require existing projects to adapt.
- **MINOR** — New standards, workflows, templates, or prompts added in a backward-compatible way.
- **PATCH** — Corrections, clarifications, and non-breaking refinements to existing documents.

The current version is **0.1.0**. Every change is recorded in [CHANGELOG.md](CHANGELOG.md).

Architecture Specifications (AS-NNN) track major framework milestones. This repository was initialized under **AS-000: Repository Initialization**.

---

## Contribution Philosophy

CEF is developed like a professional open-source project.

- **Opinionated pull requests.** Contributions should take a position. "It depends" is not a standard.
- **No placeholders.** Every document must ship with meaningful content. Empty files, lorem ipsum, and TODO-only pages are not acceptable as final work.
- **Standards before features.** New capabilities land as documented standards first, templates and examples second.
- **Backward compatibility is respected.** Breaking a standard requires a MAJOR version bump and a migration note in the changelog.
- **Prose is reviewed like code.** Clarity, tone, and correctness of documentation are held to the same bar as software.

The goal is a framework that a senior engineer would trust on day one and still respect on day one thousand.

---

## Status

This repository is at **AS-000 — Repository Initialization**. The structure and scaffolding are in place; the standards, workflows, and rules will be authored in subsequent modules. See [CHANGELOG.md](CHANGELOG.md) for details.
