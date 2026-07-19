# State Transitions

**Framework:** CEF · **Specification:** AS-003 (Workflow Engine) · **Version:** 0.1.0

**Purpose:** Define Every legal move between workflow states. Transitions are deterministic. There are Exactly two kinds: **forward** (advance on a passed gate) and **rollback** (return on a failed gate). Any move not defined here is undefined and Never allowed.

**Determinism rule:** From Every state there is Exactly one forward target and a fixed set of rollback targets. Claude Never invents a transition, Never skips forward, and Never advances on a failed gate.

---

## Forward Transitions

Each forward rule fires Only when the current state's exit criteria (`quality-gates.md`) pass.

| # | IF current state | AND gate condition | THEN next | ELSE |
|---|---|---|---|---|
| T01 | S01 Discovery | Objective, audience, metric, and project type are documented | S02 | Remain in S01 |
| T02 | S02 Business Analysis | Every goal traces to a metric; scope and non-goals are explicit | S03 | Remain in S02 |
| T03 | S03 Research | No fundamental unknown remains; open questions resolved or flagged | S04 | Remain in S03 |
| T04 | S04 Information Architecture | Every page/route and the content model are defined; no orphans | S05 | Remain in S04 |
| T05 | S05 Brand Strategy | Voice, type, and AA-viable color are explicit | S06 | Remain in S05 |
| T06 | S06 UX Planning | Every primary flow reaches its goal with defined states | S07 | Remain in S06 |
| T07 | S07 UI Design | Every screen is buildable from tokens; all states defined; AA contrast | S08 | Remain in S07 |
| T08 | S08 Technical Planning | Architecture recorded; deps justified; task plan has acceptance criteria | S09 | Remain in S08 |
| T09 | S09 Implementation | Builds; zero TS errors; zero lint errors; core works; standards met | S10 | Remain in S09 |
| T10 | S10 Browser Review | Flows work in-browser; all breakpoints correct; clean console | S11 | Remain in S10 |
| T11 | S11 Accessibility Review | `checklists/accessibility.md` passes with zero violations | S12 | Remain in S11 |
| T12 | S12 SEO Review | Every page satisfies SE-01–SE-13; sitemap current | S13 | Remain in S12 |
| T13 | S13 Performance Review | CWV and bundle size within budget | S14 | Remain in S13 |
| T14 | S14 Security Review | Input validated; secrets server-only; headers set; audit clean | S15 | Remain in S14 |
| T15 | S15 Deployment | Reproducible build; live and healthy; rollback tested | S16 | Remain in S15 |
| T16 | S16 Documentation | Docs match shipped behavior; changelog updated | S17 | Remain in S16 |
| T17 | S17 Memory Update | All memory current; no divergence from reality | S18 | Remain in S17 |
| T18 | S18 Completion | Every Definition-of-Done line reads pass | DONE | Rollback to failing gate |

## Rollback (Failure) Transitions

Each rollback rule fires When a gate fails or a defect class is detected. After the fix, the pipeline re-enters at the target and re-runs forward from there.

| # | IF failure class | Detected at | THEN return to |
|---|---|---|---|
| F01 | Missing or contradictory requirement | Any state | S01 Discovery |
| F02 | Requirement invalidated by research | S03–S04 | S02 Business Analysis |
| F03 | Required page unsupported by requirements | S04, S06 | S02 Business Analysis |
| F04 | Flow needs an unplanned page | S06 | S04 Information Architecture |
| F05 | Screen not composable from the design system | S07 | S06 UX Planning |
| F06 | Design system not implementable in constraints | S08 | S07 UI Design |
| F07 | Architecture conflict | S09, S15 | S08 Technical Planning |
| F08 | Runtime bug, broken flow, or broken breakpoint | S10 | S09 Implementation |
| F09 | Accessibility failure | S11 | S09 Implementation → S11 |
| F10 | SEO failure | S12 | S09 Implementation → S12 |
| F11 | Performance over budget | S13 | S09 Implementation → S13 |
| F12 | Security defect | S14, S15 | S09 Implementation → S14 |
| F13 | Non-reproducible build or failed health check | S15 | S09 Implementation |
| F14 | Docs contradict shipped behavior | S16 | Remain in S16 until corrected |
| F15 | Memory diverges from reality | S17 | Remain in S17 until reconciled |
| F16 | A Definition-of-Done line reads fail | S18 | The owning review state (S11–S14) |

## Transition Guarantees

- **GT-01 — Exactly one forward path.** From S(n) the Only forward target is S(n+1). Never S(n+2) or beyond.
- **GT-02 — No advance on failure.** If a gate fails, the forward rule Never fires; a rollback rule fires instead.
- **GT-03 — Re-entry is full.** After a rollback fix, Every intervening gate is re-run in order. Never assume a downstream gate still passes.
- **GT-04 — Undefined is forbidden.** A move absent from the forward and rollback tables is undefined; Claude Never performs it.
- **GT-05 — State is always known.** Claude Always records the current state in `session.md`; there is Never an unknown state.
