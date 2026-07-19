# Workflow Deliverables

**Framework:** CEF · **Specification:** AS-003 (Workflow Engine) · **Version:** 0.1.0

**Purpose:** Fix the tangible artifacts Every state Must produce. A state Never exits without its deliverables. Each deliverable has a form and a destination (a memory file, a project file, or shipped output). A state whose deliverables are absent has Not met its exit criteria.

**Rule:** Every workflow stage produces tangible outputs. A stage with no artifact is Never complete.

---

## Deliverables by State

| State | Deliverables | Destination |
|---|---|---|
| S01 Discovery | Project Brief; objective; audience; success metric; project type | `project.md`, `client.md` |
| S02 Business Analysis | Business Goals; Target Audience segments; Success Metrics; scope & non-goals | `project.md`, `client.md` |
| S03 Research | Competitor/domain findings; references; resolved open-questions list | `decisions.md`, `client.md` |
| S04 Information Architecture | Page/route map; navigation map; content model; crawl-intent per route | `architecture.md`, `todos.md` |
| S05 Brand Strategy | Moodboard; Typography; Color System; Voice & Tone | `branding.md` |
| S06 UX Planning | User-flow maps; interaction specs; per-flow empty/loading/error states | `design-system.md`, `todos.md` |
| S07 UI Design | Resolved tokens (color/type/spacing/radius/shadow); component inventory with variants & states | `design-system.md` |
| S08 Technical Planning | Folder Structure; Tech Stack; Dependencies; component architecture; sequenced task plan | `architecture.md`, `decisions.md`, `todos.md` |
| S09 Implementation | Working, standard-compliant increments; passing build | source tree, `session.md`, `todos.md` |
| S10 Browser Review | Runtime + responsive verification report; console-clean confirmation | `session.md`, `decisions.md` |
| S11 Accessibility Review | Passed `checklists/accessibility.md`; fix log | `decisions.md` |
| S12 SEO Review | Metadata; Schema (JSON-LD); Robots; Sitemap; LLMS (`llms.txt`); Canonical URLs; passed `checklists/seo.md` | shipped output, `decisions.md` |
| S13 Performance Review | CWV + bundle measurements; passed `checklists/performance.md` | `decisions.md` |
| S14 Security Review | Input/authz/secrets/headers review; dependency audit; fix log | `decisions.md` |
| S15 Deployment | Reproducible artifact; live release; tested rollback path; passed `checklists/deployment.md` | `deployment.md` |
| S16 Documentation | Updated docs & `README`; `CHANGELOG.md` entry; passed `checklists/release.md` | repo docs, `project.md` |
| S17 Memory Update | Reconciled `decisions.md`, `architecture.md`, `design-system.md`, `deployment.md`, `project.md` | all memory |
| S18 Completion | Completion report certifying every Definition-of-Done line | `project.md` |

---

## Deliverable Detail — Reference Artifacts

**S01 Project Brief** — one page: problem, objective, audience, project type, constraints.

**S02 Business Package** — Business Goals (ranked), Target Audience (segments + intent), Success Metrics (metric + target + measurement), scope statement with explicit non-goals.

**S05 Brand Package** — Moodboard (visual direction), Typography (families, scale, roles), Color System (palette + semantic tokens, AA-checked), Voice & Tone (principles + examples).

**S07 Design System** — resolved token tables and a component inventory; Every component lists variants and the states default/hover/focus/active/disabled/loading/error.

**S08 Technical Package** — Folder Structure (tree), Tech Stack (framework, language, key libraries), Dependencies (each with a one-line justification), component architecture, task plan with acceptance criteria.

**S12 SEO Package (per page)** — Metadata (unique title ≤ 60, description ≤ 160); Schema (valid JSON-LD for the page type); Robots (explicit index/noindex); Sitemap (route present); LLMS (`llms.txt` entry); Canonical URL (self-referencing unless consolidating). See `seo-engine.md`.

**S15 Deployment Package** — immutable versioned image; environment + secrets configuration (by reference); health checks; documented, tested rollback.

**S18 Completion Report** — the Definition-of-Done table (Constitution Article X), every line marked pass, with any fail named.

---

## Deliverable-to-Memory Map

Every state writes the memory it owns before exit (see `states.md`; consistent with `.claude/rules/memory-engine.md`).

| Phase | Memory file written |
|---|---|
| Discovery / Business Analysis / Research | `client.md`, `project.md` |
| Information Architecture / Technical Planning | `architecture.md`, `todos.md` |
| Brand Strategy / UX Planning / UI Design | `branding.md`, `design-system.md` |
| Implementation | `session.md`, `todos.md` |
| Reviews (Browser/A11y/SEO/Perf/Security) | `decisions.md` |
| Deployment | `deployment.md` |
| Memory Update / Completion | `decisions.md`, `deployment.md`, `project.md` |
