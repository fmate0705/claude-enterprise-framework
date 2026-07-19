# Capability Loader

**Framework:** CEF · **Specification:** AS-015 (Runtime Engine) · **Version:** 1.0.0

**Purpose:** Load the capability profile for the classified project type. The profile declares exactly what the project needs: engines, skills, MCPs, legal documents, assets, workflow, and validation. Unnecessary modules MUST NOT be loaded.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Capability Profiles

One profile per project type, in `.claude/capabilities/`:

`landing-page` · `marketing-site` · `corporate-site` · `agency-site` · `portfolio` · `saas` · `dashboard` · `admin-panel` · `blog` · `ecommerce` · `api` · `fullstack`

## Profile Schema

Every profile MUST declare:

| Field | Meaning |
|---|---|
| `capability` | The profile's canonical name |
| `classification` | Aliases and signals that select it (`project-classifier.md`) |
| `complexity_default` | The default tier before Discovery refines it |
| `engines.required` | The engines that MUST load |
| `engines.excluded` | The engines that MUST NOT load, with a reason |
| `skills` | The skills expected for this type |
| `mcps` | The MCPs expected for this type |
| `legal_documents` | The legal pages required (`content/legal-pages.md`) |
| `assets` | The assets required (`assets/`) |
| `workflow` | The workflow project-type variant and deltas (`workflow-engine/project-types.md`) |
| `profiles` | Density, motion level, architecture type (owned by their engines) |
| `validation` | Gates that apply and where emphasis falls |

## Loader Rules

- **CAP-01 — Profile required.** A project MUST load exactly one capability profile matching its classification; execution MUST NOT proceed without one.
- **CAP-02 — Minimum set.** Only `engines.required` MUST be loaded; an excluded engine MUST NOT be loaded (Constitution Article IX, RT-02).
- **CAP-03 — Exclusions justified.** Every exclusion MUST carry a reason in the profile; an unexplained exclusion MUST NOT exist.
- **CAP-04 — Kernel always.** The kernel (Constitution, Rules, Workflow, Knowledge) MUST load for every project regardless of profile; it MUST NOT be excluded (`engine-loader.md`).
- **CAP-05 — Floors survive exclusion.** Excluding an engine MUST NOT remove a floor that still applies. Where a UI exists, accessibility applies; security and performance always apply.
- **CAP-06 — Deltas applied.** Classification deltas (`project-classifier.md` CLS-02) MUST be applied on top of the profile and recorded.
- **CAP-07 — Profiles reference, never redefine.** A profile MUST reference values owned by other engines (density, motion level, architecture type, gates); it MUST NOT restate or contradict them (RT-04).
- **CAP-08 — Complexity may add, never remove.** A higher complexity tier MAY add engines/validation; it MUST NOT remove a required engine.
- **CAP-09 — Recorded.** The loaded profile, its deltas, and the resulting engine set MUST be recorded in `memory/project.md` and `memory/architecture.md`.
- **CAP-10 — Reload on re-classification.** If the project is re-classified, the profile MUST be reloaded and the context re-derived (`context-manager.md`).

## Worked Example — Landing Page vs. Dashboard

```
landing-page  → engines: Architecture, Platform, Components, Experience, Motion,
                          Discoverability, Content, Assets, QA, Operations
dashboard     → engines: Architecture, Platform, Components, Experience, Motion,
                          Content, QA, Operations
                excluded: Discoverability (app is intentionally noindex),
                          Assets (no brand-asset production surface)
```

The dashboard omits two engines because the type has no output for them — not to save effort. The omission is declared and justified in the profile.

## Capability Loader Guarantees

- **CAP-G1** — Exactly one profile per project, declaring required and excluded engines with reasons.
- **CAP-G2** — Minimum engine set loaded; kernel always; floors never removed.
- **CAP-G3** — Profiles reference owning engines; the resulting set is recorded.
