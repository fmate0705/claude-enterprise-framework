# Quality Gates

**Framework:** CEF · **Specification:** AS-003 (Workflow Engine) · **Version:** 0.1.0

**Purpose:** Define the gate that guards Every state exit. No project moves to the next state unless the current state's gate passes. A gate is a set of conditions; Every condition Must be true. A single false condition fails the gate and Never advances.

**Gate rule:** Pass Only when Every condition reads true. On any false condition → apply the failure route (`transitions.md`) and re-run the gate after the fix.

---

### G01 — Discovery Gate
Pass Only when Every condition is true:
- The primary objective is stated.
- The target audience is named.
- At least one measurable success metric exists.
- The project type is selected (`project-types.md`).
**On fail:** Remain in S01; Stop and ask for missing user-held input.

### G02 — Business Analysis Gate
- Every business goal maps to a success metric.
- Scope and non-goals are explicit.
- No requirement is ambiguous or self-contradictory.
**On fail:** Remain in S02, or F01 → S01 if a requirement contradicts the brief.

### G03 — Research Gate
- No unknown remains that would change a fundamental downstream decision.
- Every open question is answered or flagged with an owner.
**On fail:** Remain in S03, or F02 → S02 if research invalidates a requirement.

### G04 — Information Architecture Gate
- Every required page and route is defined.
- The content model is defined per page type.
- No orphan pages exist.
- Each route has an explicit index/noindex intent.
**On fail:** Remain in S04, or F03 → S02 if a page lacks a supporting requirement.

### G05 — Brand Strategy Gate
- Voice and tone are explicit.
- Typography is selected.
- The color system is defined and AA-viable.
- A moodboard/imagery direction exists.
**On fail:** Remain in S05; Stop and ask for user-held brand inputs.

### G06 — UX Planning Gate
- Every primary flow reaches its goal via defined steps.
- Each flow defines empty, loading, and error states.
- No flow depends on an undefined screen.
**On fail:** Remain in S06, or F04 → S04 if a flow needs an unplanned page.

### G07 — UI Design Gate
- Every screen is composable from the design system.
- Every component defines all interaction states.
- Contrast meets AA in every theme.
- No off-token color, type, or spacing values exist.
**On fail:** Remain in S07, or F05 → S06 if a screen is not composable.

### G08 — Technical Planning Gate
- Architecture is recorded in `architecture.md`.
- Every dependency carries a justification.
- The task plan has acceptance criteria for every task.
- No fundamental decision is deferred to build time.
**On fail:** Remain in S08, or F06 → S07 if the system is not implementable.

### G09 — Implementation Gate
- The application builds successfully.
- Zero TypeScript errors.
- Zero lint errors.
- Core functionality works.
- Components follow the standards and contain no listed anti-pattern (`anti-patterns.md`).
**On fail:** Remain in S09, or F07 → S08 on an architecture conflict, or F01 → S01 on a missing requirement.

### G10 — Browser Review Gate
- Every key flow works in a real browser (Chrome DevTools MCP).
- Layout is correct at mobile, tablet, and desktop.
- The console is free of errors.
- No horizontal body overflow at any breakpoint.
**On fail:** F08 → S09 Implementation.

### G11 — Accessibility Gate
- `checklists/accessibility.md` passes with zero violations.
- All functionality is keyboard operable with visible focus.
- Contrast meets WCAG 2.2 AA; color is never the sole signal.
- Every control has an accessible name; images have correct `alt`.
**On fail:** F09 → S09 Implementation, then re-run G11. Accessibility is a floor; Never waive.

### G12 — SEO Gate
- Every public page satisfies SE-01–SE-13 (`seo-engine.md`).
- `checklists/seo.md` passes.
- No production page is accidentally `noindex`.
- The sitemap and `llms.txt` are current.
**On fail:** F10 → S09 Implementation, then re-run G12.

### G13 — Performance Gate
- LCP, INP, and CLS are within budget on representative pages.
- Bundle size is within budget.
- `checklists/performance.md` passes.
**On fail:** F11 → S09 Implementation, then re-run G13. Performance is a floor; Never waive.

### G14 — Security Gate
- All input is validated and sanitized at boundaries.
- No secret is exposed to the client.
- Security headers and CSP are set.
- The dependency audit is clean.
**On fail:** F12 → S09 Implementation, then re-run G14. Security is a floor; Never waive.

### G15 — Deployment Gate
- The Docker build is reproducible from a clean checkout.
- Secrets and health checks are configured for the target.
- The release is live and healthy.
- A rollback path is documented and tested.
**On fail:** F13 → S09 Implementation, or F12 → S14 on a security regression.

### G16 — Documentation Gate
- Documentation matches shipped behavior.
- `CHANGELOG.md` records the release.
- `checklists/release.md` passes.
**On fail:** Remain in S16 until docs are corrected (F14).

### G17 — Memory Gate
- `decisions.md`, `architecture.md`, `deployment.md`, and `project.md` are current.
- No memory file diverges from reality (ME-09).
**On fail:** Remain in S17 until reconciled (F15).

### G18 — Completion Gate
- Every Definition-of-Done condition (Constitution Article X) reads pass.
**On fail:** F16 → the owning review state; re-enter the pipeline there. A single fail Never yields "done".

---

## Gate Guarantees

- **QG-01 — No skip.** A gate is Never bypassed, and its conditions are Never partially accepted.
- **QG-02 — Floors never waived.** G11, G13, and G14 (accessibility, performance, security) and legal compliance are floors; Only an explicit, recorded, scoped user waiver may lower one, and Never below law.
- **QG-03 — Re-run after fix.** After any rollback, the failed gate and Every downstream gate are re-run in order.
- **QG-04 — Evidence required.** A gate passes on demonstrated evidence (build output, checklist result, measurement), Never on assumption.
