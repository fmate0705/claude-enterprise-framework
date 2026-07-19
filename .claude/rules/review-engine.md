# Review Engine

**Framework:** CEF · **Specification:** AS-002 (Rule Engine) · **Version:** 0.1.0

**Purpose:** Define the mandatory review sequence that Every completed feature passes before it is done. Review is Never skipped and Never reordered. This engine operationalizes Article IX/X of the Constitution and the review workflow.

**Rule format:** Rule Name, Purpose, Trigger, Conditions, Decision, Actions, Expected Output, Example.

**The review sequence (fixed order):**
Code → Browser → Responsive → Accessibility → SEO → Performance → Docker → Documentation → Memory → Complete.

---

### RV-01 — Review Is Mandatory and Ordered
**Purpose:** Make review unavoidable and deterministic.
**Trigger:** When a feature or page is build-complete.
**Conditions:** If it is believed done.
**Decision:** Always run the sequence in Exactly this order: Code → Browser → Responsive → Accessibility → SEO → Performance → Docker → Documentation → Memory → Complete. Never skip or reorder a gate.
**Actions:** 1. Enter at Code. 2. Advance Only when the current gate passes.
**Expected Output:** A fully reviewed unit.
**Example:** A finished pricing page runs all gates before completion.

### RV-02 — A Failed Gate Blocks Advancement
**Purpose:** Stop defects from moving downstream.
**Trigger:** When a gate produces a blocker or major finding.
**Conditions:** If any finding is severity blocker or major.
**Decision:** Never advance to the next gate. Always fix blockers and majors, then re-run the failed gate.
**Actions:** 1. Fix the finding. 2. Re-run the gate. 3. Advance Only on pass.
**Expected Output:** No unresolved blocker or major passes a gate.
**Example:** A focus-trap bug at Accessibility is fixed before SEO runs.

### RV-03 — Code Gate
**Purpose:** Verify correctness and standards adherence.
**Trigger:** When review begins.
**Conditions:** If code exists.
**Decision:** Code Must pass correctness, type safety, `engineering-engine.md` rules, and the anti-pattern blacklist. Never pass code containing a listed anti-pattern.
**Actions:** 1. Review against engineering rules and anti-patterns. 2. Fix findings.
**Expected Output:** Correct, standard-compliant code.
**Example:** An unnecessary `useEffect` is removed at the Code gate.

### RV-04 — Browser Gate
**Purpose:** Verify real runtime behavior.
**Trigger:** When Code passes.
**Conditions:** If the unit renders in a browser.
**Decision:** Behavior Must be verified in a real browser via the Chrome DevTools MCP (TE-08). Never assert browser correctness without inspection.
**Actions:** 1. Inspect the running page. 2. Verify interactions and console cleanliness.
**Expected Output:** Verified runtime behavior.
**Example:** A form submit path is exercised in the browser.

### RV-05 — Responsive Gate
**Purpose:** Verify layout across viewports.
**Trigger:** When Browser passes.
**Conditions:** If the unit has layout.
**Decision:** Layout Must be correct at mobile, tablet, and desktop widths. Never pass a broken breakpoint.
**Actions:** 1. Check each breakpoint. 2. Fix reflow and overflow issues.
**Expected Output:** Correct responsive layout.
**Example:** A three-column grid stacks correctly on mobile.

### RV-06 — Accessibility Gate
**Purpose:** Verify WCAG 2.2 AA conformance.
**Trigger:** When Responsive passes.
**Conditions:** If the unit has content or interaction.
**Decision:** The unit Must pass `checklists/accessibility.md`. Accessibility is a floor; Never pass an AA violation.
**Actions:** 1. Run the accessibility checklist. 2. Fix every violation.
**Expected Output:** An AA-conformant unit.
**Example:** Missing form labels are added at this gate.

### RV-07 — SEO Gate
**Purpose:** Verify discoverability artifacts.
**Trigger:** When Accessibility passes.
**Conditions:** If the unit is a public page.
**Decision:** The page Must pass `checklists/seo.md` and `seo-engine.md` (SE-01–SE-13). Never pass a page with missing SEO.
**Actions:** 1. Run the SEO checklist. 2. Fix missing artifacts.
**Expected Output:** A fully optimized page.
**Example:** A missing canonical is added at this gate.

### RV-08 — Performance Gate
**Purpose:** Verify the performance budget.
**Trigger:** When SEO passes.
**Conditions:** If the unit affects a page's runtime weight.
**Decision:** The page Must pass `checklists/performance.md` — Core Web Vitals and bundle size within budget. Performance is a floor; Never pass an over-budget page.
**Actions:** 1. Measure CWV and bundle size. 2. Optimize until within budget.
**Expected Output:** An in-budget page.
**Example:** An oversized hero image is converted to AVIF to pass.

### RV-09 — Docker Gate
**Purpose:** Verify reproducible builds.
**Trigger:** When Performance passes.
**Conditions:** If the project is containerized.
**Decision:** The Docker build Must succeed and be reproducible from a clean checkout. Never pass a build that only works locally.
**Actions:** 1. Build the image cleanly. 2. Confirm reproducibility.
**Expected Output:** A reproducible image.
**Example:** The production image builds identically in CI.

### RV-10 — Documentation Gate
**Purpose:** Verify docs match reality.
**Trigger:** When Docker passes.
**Conditions:** If behavior or config changed.
**Decision:** Documentation and `CHANGELOG.md` Must reflect the shipped change. Never pass stale docs.
**Actions:** 1. Update affected docs. 2. Add the changelog entry.
**Expected Output:** Accurate documentation.
**Example:** A new setting is documented before completion.

### RV-11 — Memory Gate
**Purpose:** Persist decisions and deployment facts.
**Trigger:** When Documentation passes.
**Conditions:** If durable decisions or deployment state changed.
**Decision:** `memory/decisions.md`, `memory/deployment.md`, and `memory/project.md` Must be current. Never pass with stale memory.
**Actions:** 1. Record decisions and deployment. 2. Update project status.
**Expected Output:** Current memory.
**Example:** A release is recorded in deployment memory.

### RV-12 — Complete Gate
**Purpose:** Certify against the Definition of Done.
**Trigger:** When Memory passes.
**Conditions:** If all prior gates passed.
**Decision:** Report "complete" Only when Every Definition-of-Done condition reads pass (Constitution Article X). A single fail is reported as such and blocks completion.
**Actions:** 1. Produce the completion report. 2. State any remaining fail.
**Expected Output:** A defensible "done".
**Example:** All gates pass; the completion report shows every line pass.

### RV-13 — Severity Model
**Purpose:** Make triage deterministic.
**Trigger:** When a finding is recorded.
**Conditions:** If a defect is found in any gate.
**Decision:** Classify Exactly one severity: blocker (Must fix before advancing), major (Must fix before completion), minor (fix or record a waiver), nit (optional). Never leave a blocker or major unresolved.
**Actions:** 1. Assign severity. 2. Resolve or waive per severity. 3. Record waivers in `memory/decisions.md`.
**Expected Output:** Triaged, resolved findings.
**Example:** A contrast failure is a blocker; a phrasing tweak is a nit.
