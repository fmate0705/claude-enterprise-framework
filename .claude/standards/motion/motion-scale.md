# Motion Scale

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Define the motion levels and fix which level applies per project type. A project MUST declare its motion level; motion MUST NOT exceed that level's ceiling. Levels are canonical in `motion.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Levels

| Level | Name | Includes |
|---|---|---|
| 0 | No motion | Instant state changes only (or reduced-motion fallback) |
| 1 | Essential feedback | Hover, focus, press, loading, error/success feedback |
| 2 | Micro-interactions | Level 1 + component transitions (dropdowns, tabs, accordions, toasts) |
| 3 | Page transitions | Level 2 + route and shared-element transitions, scroll reveals |
| 4 | Immersive experiences | Level 3 + choreographed hero and narrative motion (marketing only) |

Each level includes all lower levels. Level 1 (essential feedback) is the minimum for any interactive interface and is never removed except under reduced-motion (which falls back to Level 0 behavior for non-essential motion while keeping essential state changes perceivable).

## Level by Project Type

| Project type | Default level | Ceiling |
|---|---|---|
| Landing page | 3 | 4 |
| Marketing site | 3 | 4 |
| Corporate site | 2 | 3 |
| SaaS (marketing surface) | 3 | 4 |
| SaaS (app surface) | 2 | 2 |
| Dashboard | 1 | 2 |
| Admin panel | 1 | 1 |
| Documentation | 1 | 2 |
| Blog | 2 | 3 |

## Scale Rules

- **ML-01 — Declare the level.** A project MUST record its motion level in `memory/design-system.md`.
- **ML-02 — Respect the ceiling.** Motion MUST NOT exceed the project type's ceiling; immersive motion (Level 4) MUST NOT be used on dashboards or admin panels.
- **ML-03 — Productivity favors restraint.** Dashboards and admin panels MUST default to Level 1; motion there is essential feedback, not spectacle.
- **ML-04 — Marketing may go higher.** Landing and marketing surfaces MAY use Level 3–4, still within the performance budget and reduced-motion rules.
- **ML-05 — App surfaces stay calm.** Authenticated app surfaces MUST stay at Level 2 or below to keep repeated tasks fast and undistracting.
- **ML-06 — Reduced motion collapses non-essential.** Under `prefers-reduced-motion`, every project drops to essential feedback only, regardless of declared level.

## Scale Guarantees

- **ML-G1** — Every project declares a motion level and respects its ceiling.
- **ML-G2** — Productivity surfaces stay restrained; marketing may be richer.
- **ML-G3** — Reduced motion collapses to essential feedback everywhere.
