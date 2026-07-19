# Installing the Claude Enterprise Framework

**Purpose:** Explain how to install CEF globally, keep it updated, use it inside Claude Code, and bootstrap new projects from it.

**Description:** CEF is installed once, globally, so that every project you build with Claude Code inherits the same standards, workflows, and quality gates. This document is the authoritative guide to getting CEF onto a machine and putting it to work.

> **Note (AS-000):** The framework is currently being initialized. The commands below describe the intended installation model. Any step marked *TODO* will be finalized as tooling lands in a later module.

---

## Prerequisites

- [Claude Code](https://claude.com/claude-code) installed and authenticated.
- `git` available on your `PATH`.
- A POSIX shell (macOS/Linux) or PowerShell (Windows). Examples are given for both where they differ.

---

## 1. Install Globally

CEF lives alongside your global Claude configuration so it applies to every project.

**macOS / Linux**

```bash
git clone <cef-repo-url> ~/.claude/cef
```

**Windows (PowerShell)**

```powershell
git clone <cef-repo-url> "$env:USERPROFILE\.claude\cef"
```

Point your global Claude configuration at the framework so its constitution and standards load automatically:

- The framework's entry point is `.claude/CLAUDE.md`.
- Reference it from your global `~/.claude/CLAUDE.md` (or your global settings) so every session inherits CEF.

> *TODO:* Provide a one-line installer script (`install.sh` / `install.ps1`) that clones the repo and wires up the global reference automatically.

---

## 2. Update

CEF is versioned. To move to a newer release:

```bash
cd ~/.claude/cef
git pull --ff-only
```

Then review [CHANGELOG.md](CHANGELOG.md) for changes. Because CEF follows Semantic Versioning:

- A **PATCH** or **MINOR** update is safe to adopt immediately.
- A **MAJOR** update may change standards your existing projects rely on — read the migration notes before updating.

> *TODO:* Add a `cef update` helper that pulls, prints the changelog delta, and warns on MAJOR bumps.

---

## 3. Use

Once installed globally, CEF is active whenever you run Claude Code.

In practice this means:

1. Claude Code loads the framework constitution (`.claude/CLAUDE.md`).
2. It consults the relevant **standards** before writing code.
3. It follows the relevant **workflow** (discovery → planning → implementation → review → deployment → maintenance).
4. It runs the relevant **checklist** before considering a phase complete.
5. It records context in **memory** so decisions persist across sessions.

You do not need to paste standards into every prompt. That is the entire point — the standard is ambient.

---

## 4. Create a New Project

CEF accelerates greenfield work through **templates** and **prompts**.

### From a template

Templates are opinionated scaffolds for common archetypes:

- `templates/nextjs/` — Next.js application
- `templates/react/` — React application
- `templates/fullstack/` — Full-stack application
- `templates/landing-page/` — Marketing landing page
- `templates/dashboard/` — Data/admin dashboard
- `templates/saas/` — SaaS product
- `templates/agency/` — Agency / multi-client site

### From a prompt

Prompts bootstrap a project by website type. Ask Claude Code to build using the matching prompt:

- `prompts/landing-page.md`, `prompts/company.md`, `prompts/saas.md`, `prompts/dashboard.md`,
  `prompts/ecommerce.md`, `prompts/portfolio.md`, `prompts/restaurant.md`, `prompts/medical.md`,
  `prompts/law-firm.md`, `prompts/hotel.md`

Each prompt drives the discovery workflow, selects an appropriate template, and applies the full set of standards.

> *TODO:* Document the exact `cef new <template> <name>` command once the scaffolding tool ships.

---

## Verifying the Installation

After installing, confirm:

- `~/.claude/cef/.claude/CLAUDE.md` exists and is referenced by your global Claude configuration.
- Running Claude Code in a scratch directory shows CEF standards being consulted.

> *TODO:* Provide a `cef doctor` command that validates the install and prints the active framework version.

---

## Uninstalling

Remove the framework directory and delete the reference from your global Claude configuration:

```bash
rm -rf ~/.claude/cef
```

CEF stores no state outside its own directory and your global configuration reference.
