# Workflow States

**Framework:** CEF · **Specification:** AS-003 (Workflow Engine) · **Version:** 0.1.0

**Purpose:** Define the eighteen states every CEF project moves through, as a deterministic state machine. Claude is Always in Exactly one state and Never advances without satisfying the current state's exit criteria.

**How to read a state:** Each state declares Purpose, Required Inputs, Actions, Deliverables, Exit Criteria, Allowed Next States, Blocked States, Failure Conditions, and Memory Updated. Exit Criteria are the quality gate (see `quality-gates.md`). Transitions are enforced in `transitions.md`. Deliverables are catalogued in `deliverables.md`.

**The pipeline (fixed forward order):**
S01 Discovery → S02 Business Analysis → S03 Research → S04 Information Architecture → S05 Brand Strategy → S06 UX Planning → S07 UI Design → S08 Technical Planning → S09 Implementation → S10 Browser Review → S11 Accessibility Review → S12 SEO Review → S13 Performance Review → S14 Security Review → S15 Deployment → S16 Documentation → S17 Memory Update → S18 Completion.

**Global rules:**
- Forward skipping is Never allowed. A state advances Only to its Allowed Next State.
- A failed gate Never advances. It routes to the Failure Conditions target and re-enters the pipeline from there.
- Every state Must update the memory it owns before it exits.

---

### S01 — Discovery
- **Purpose:** Establish why the project exists, for whom, and what success means.
- **Required Inputs:** The user's request, brief, or problem statement; any existing brand or product context.
- **Actions:** 1. Elicit goal, audience, and success metrics. 2. Surface constraints (budget, legal, technical, timeline). 3. Classify the project type (`project-types.md`). 4. Record findings.
- **Deliverables:** Project Brief; populated `project.md` and `client.md`.
- **Exit Criteria:** Every item Must be true — the primary objective is stated; the audience is named; at least one measurable success metric exists; the project type is chosen.
- **Allowed Next States:** S02.
- **Blocked States:** S03–S18. No skipping.
- **Failure Conditions:** If the objective or audience is unknowable from available input → Stop and ask the user; remain in S01. Never fabricate a brief.
- **Memory Updated:** `project.md`, `client.md`.

### S02 — Business Analysis
- **Purpose:** Convert the brief into concrete, testable business requirements.
- **Required Inputs:** Project Brief (S01).
- **Actions:** 1. Define business goals and their priority. 2. Detail target-audience segments and their intent. 3. Fix success metrics and their measurement. 4. Identify scope boundaries and non-goals.
- **Deliverables:** Business Goals; Target Audience; Success Metrics; scope statement in `project.md`.
- **Exit Criteria:** Every business goal traces to a success metric; scope and non-goals are explicit; no requirement is ambiguous.
- **Allowed Next States:** S03.
- **Blocked States:** S04–S18; rollback to S01.
- **Failure Conditions:** If a requirement conflicts with the brief → return to S01 Discovery.
- **Memory Updated:** `project.md`, `client.md`.

### S03 — Research
- **Purpose:** Gather the external context needed to decide well.
- **Required Inputs:** Business requirements (S02).
- **Actions:** 1. Study domain, competitors, and reference products. 2. Collect technical and legal constraints. 3. Record open questions; answer or explicitly flag each.
- **Deliverables:** Research findings and references recorded in `decisions.md`; a resolved or flagged open-questions list.
- **Exit Criteria:** No unknown remains that would change a fundamental downstream decision; every open question is answered or flagged with an owner.
- **Allowed Next States:** S04.
- **Blocked States:** S05–S18; rollback to S01–S02.
- **Failure Conditions:** If research invalidates a business requirement → return to S02 Business Analysis.
- **Memory Updated:** `decisions.md`, `client.md`.

### S04 — Information Architecture
- **Purpose:** Define the structure — pages, routes, navigation, and content model.
- **Required Inputs:** Requirements (S02) and research (S03).
- **Actions:** 1. Map every page and route. 2. Define navigation and hierarchy. 3. Define the content model per page type. 4. Mark each route's index/noindex intent.
- **Deliverables:** Page/route map; content model; navigation map recorded in `architecture.md`.
- **Exit Criteria:** Every required page and its relationships are defined; no orphan pages; each route has a stated purpose and crawl intent.
- **Allowed Next States:** S05.
- **Blocked States:** S06–S18; rollback to S01–S03.
- **Failure Conditions:** If a required page has no supporting requirement → return to S02 Business Analysis.
- **Memory Updated:** `architecture.md`, `todos.md`.

### S05 — Brand Strategy
- **Purpose:** Fix the verbal and visual identity.
- **Required Inputs:** Audience and positioning (S02); references (S03).
- **Actions:** 1. Define voice and tone. 2. Select typography. 3. Define the color system. 4. Assemble a moodboard / imagery direction.
- **Deliverables:** Moodboard; Typography; Color System; Voice & Tone recorded in `branding.md`.
- **Exit Criteria:** Voice, type, and color are explicit enough to build from without guessing; color choices are AA-viable; brand decisions trace to the audience.
- **Allowed Next States:** S06.
- **Blocked States:** S07–S18; rollback to S01–S04.
- **Failure Conditions:** If brand inputs are user-held and missing (logo, primary color) → Stop and ask; remain in S05. Never invent a brand.
- **Memory Updated:** `branding.md`.

### S06 — UX Planning
- **Purpose:** Design the flows and interaction model before any surface.
- **Required Inputs:** IA (S04); brand (S05).
- **Actions:** 1. Define primary user flows end to end. 2. Specify interaction patterns and states per flow. 3. Route flow decisions through UX validation (UI/UX Pro Max, `tool-engine.md`). 4. Define empty/loading/error behavior per flow.
- **Deliverables:** User-flow maps; interaction and state specifications recorded in `design-system.md`.
- **Exit Criteria:** Every primary flow reaches its goal with defined steps and states; no flow depends on an undefined screen.
- **Allowed Next States:** S07.
- **Blocked States:** S08–S18; rollback to S04–S05.
- **Failure Conditions:** If a flow requires an unplanned page → return to S04 Information Architecture.
- **Memory Updated:** `design-system.md`, `todos.md`.

### S07 — UI Design
- **Purpose:** Resolve brand and flows into a concrete design system and screens.
- **Required Inputs:** Brand (S05); flows (S06).
- **Actions:** 1. Resolve tokens (color, type, spacing, radius, shadow). 2. Define the component inventory, variants, and states. 3. Apply hierarchy and layout via the Taste and Frontend Design Skills (`tool-engine.md`). 4. Verify contrast in every theme.
- **Deliverables:** Resolved design tokens; component inventory with variants and states in `design-system.md`.
- **Exit Criteria:** Every screen is buildable from the system; every component defines all interaction states; contrast meets AA in all themes; no off-token values.
- **Allowed Next States:** S08.
- **Blocked States:** S09–S18; rollback to S05–S06.
- **Failure Conditions:** If a required screen cannot be composed from the system → return to S06 UX Planning.
- **Memory Updated:** `design-system.md`.

### S08 — Technical Planning
- **Purpose:** Decide architecture, stack, and the sequenced build plan.
- **Required Inputs:** IA (S04); design system (S07); research constraints (S03).
- **Actions:** 1. Read `architecture.md` and `decisions.md` (ME-02). 2. Choose stack, folder structure, and dependencies. 3. Define the component architecture and data flow. 4. Sequence tasks with acceptance criteria.
- **Deliverables:** Folder Structure; Tech Stack; Dependencies; component architecture in `architecture.md`; task plan in `todos.md`.
- **Exit Criteria:** Architecture is recorded; every dependency is justified; the task plan has acceptance criteria; no fundamental decision is left for build time.
- **Allowed Next States:** S09.
- **Blocked States:** S10–S18; rollback to S04–S07.
- **Failure Conditions:** If the design system cannot be implemented within constraints → return to S07 UI Design.
- **Memory Updated:** `architecture.md`, `decisions.md`, `todos.md`.

### S09 — Implementation
- **Purpose:** Build to the plan and to every applicable standard, task by task.
- **Required Inputs:** Task plan (S08); design system (S07); the rule engine (`.claude/rules/`).
- **Actions:** 1. Inspect existing code before changing it (E-001). 2. Reuse before building (DE-COMPONENT). 3. Implement each task to standards, with all states. 4. Update `session.md` and `todos.md` per milestone.
- **Deliverables:** Working, standard-compliant increments; updated `session.md` and `todos.md`.
- **Exit Criteria:** The application builds successfully; zero TypeScript errors; zero lint errors; core functionality works; components follow the standards and contain no listed anti-pattern.
- **Allowed Next States:** S10.
- **Blocked States:** S11–S18; rollback to S08.
- **Failure Conditions:** If an architecture conflict surfaces → return to S08 Technical Planning. If a requirement is missing → return to S01 Discovery.
- **Memory Updated:** `session.md`, `todos.md`.

### S10 — Browser Review
- **Purpose:** Verify real runtime behavior and responsive layout.
- **Required Inputs:** A building application (S09).
- **Actions:** 1. Inspect the running app via the Chrome DevTools MCP (TE-08). 2. Exercise key flows and interactions. 3. Verify layout at mobile, tablet, and desktop. 4. Confirm a clean console.
- **Deliverables:** Verified runtime behavior and responsive layout; findings logged.
- **Exit Criteria:** Every key flow works in a real browser; layout is correct at all breakpoints; no console errors; no horizontal overflow.
- **Allowed Next States:** S11.
- **Blocked States:** S12–S18; rollback to S09.
- **Failure Conditions:** If any flow, breakpoint, or console check fails → return to S09 Implementation.
- **Memory Updated:** `session.md`, `decisions.md`.

### S11 — Accessibility Review
- **Purpose:** Verify WCAG 2.2 AA conformance.
- **Required Inputs:** A browser-verified build (S10).
- **Actions:** 1. Run `checklists/accessibility.md`. 2. Verify semantics, keyboard operability, focus, contrast, labels. 3. Fix every violation.
- **Deliverables:** A passed accessibility checklist; recorded fixes.
- **Exit Criteria:** The accessibility checklist passes with zero violations. Accessibility is a floor and Never yields.
- **Allowed Next States:** S12.
- **Blocked States:** S13–S18; rollback to S09.
- **Failure Conditions:** If any AA violation exists → return to S09 Implementation, then re-enter S11.
- **Memory Updated:** `decisions.md`.

### S12 — SEO Review
- **Purpose:** Verify discoverability and citability artifacts.
- **Required Inputs:** An accessible build (S11).
- **Actions:** 1. Run `checklists/seo.md` and `seo-engine.md` (SE-01–SE-13). 2. Verify metadata, canonical, JSON-LD, OG, Twitter, headings, links, robots, sitemap, `llms.txt`.
- **Deliverables:** A passed SEO checklist; complete per-page SEO artifacts.
- **Exit Criteria:** Every public page satisfies SE-01–SE-13; no page is accidentally `noindex`; the sitemap is current.
- **Allowed Next States:** S13.
- **Blocked States:** S14–S18; rollback to S09.
- **Failure Conditions:** If any SEO artifact is missing → return to S09 Implementation, then re-enter S12.
- **Memory Updated:** `decisions.md`.

### S13 — Performance Review
- **Purpose:** Verify the performance budget.
- **Required Inputs:** An SEO-complete build (S12).
- **Actions:** 1. Run `checklists/performance.md`. 2. Measure Core Web Vitals and bundle size on representative pages. 3. Optimize until within budget.
- **Deliverables:** A passed performance checklist; measured CWV and bundle figures.
- **Exit Criteria:** LCP, INP, and CLS are within budget; bundle size is within budget. Performance is a floor and Never yields.
- **Allowed Next States:** S14.
- **Blocked States:** S15–S18; rollback to S09.
- **Failure Conditions:** If any metric exceeds budget → return to S09 Implementation, then re-enter S13.
- **Memory Updated:** `decisions.md`.

### S14 — Security Review
- **Purpose:** Confirm the system is defensible against hostile input.
- **Required Inputs:** An in-budget build (S13).
- **Actions:** 1. Review input validation, authentication, and authorization. 2. Verify secrets are server-only and headers/CSP are set. 3. Audit dependencies for known vulnerabilities.
- **Deliverables:** A security review record; resolved findings.
- **Exit Criteria:** All input is validated at boundaries; no secret is client-exposed; security headers are set; dependency audit is clean. Security is a floor and Never yields.
- **Allowed Next States:** S15.
- **Blocked States:** S16–S18; rollback to S09.
- **Failure Conditions:** If any security defect of consequence exists → return to S09 Implementation, then re-enter S14.
- **Memory Updated:** `decisions.md`.

### S15 — Deployment
- **Purpose:** Release safely, reproducibly, and reversibly.
- **Required Inputs:** A fully reviewed build (S14); `deployment.md`.
- **Actions:** 1. Read `deployment.md` (ME-04). 2. Pass `checklists/deployment.md`. 3. Build an immutable, versioned artifact. 4. Promote preview → staging → production and verify health.
- **Deliverables:** A verified production release; a tested rollback path recorded in `deployment.md`.
- **Exit Criteria:** The Docker build is reproducible; secrets and health checks are configured; the release is live and healthy; rollback is tested.
- **Allowed Next States:** S16.
- **Blocked States:** S17–S18; rollback to S09 or S14.
- **Failure Conditions:** If the build is not reproducible or health checks fail → return to S09 Implementation. If a security regression appears → return to S14 Security Review.
- **Memory Updated:** `deployment.md`.

### S16 — Documentation
- **Purpose:** Make documentation reflect what shipped.
- **Required Inputs:** A live release (S15).
- **Actions:** 1. Update project docs and `README`. 2. Add a `CHANGELOG.md` entry. 3. Pass `checklists/release.md`.
- **Deliverables:** Updated documentation; a changelog entry; a passed release checklist.
- **Exit Criteria:** Documentation matches shipped behavior; the changelog records the release; no stale docs remain.
- **Allowed Next States:** S17.
- **Blocked States:** S18; rollback to S15.
- **Failure Conditions:** If docs contradict shipped behavior → remain in S16 until corrected.
- **Memory Updated:** `project.md`.

### S17 — Memory Update
- **Purpose:** Persist every durable decision, architecture change, and deployment fact.
- **Required Inputs:** Documented release (S16).
- **Actions:** 1. Record decisions in `decisions.md`. 2. Update `architecture.md` and `design-system.md` if changed. 3. Record the release in `deployment.md`. 4. Update `project.md` status and clear `session.md` scratch state.
- **Deliverables:** Current memory across all affected files.
- **Exit Criteria:** A future session can resume without rediscovery; no memory file diverges from reality (ME-09).
- **Allowed Next States:** S18.
- **Blocked States:** None forward; rollback to S16.
- **Failure Conditions:** If memory diverges from reality → remain in S17 until reconciled.
- **Memory Updated:** `decisions.md`, `architecture.md`, `deployment.md`, `project.md`, `session.md`.

### S18 — Completion
- **Purpose:** Certify the work against the Definition of Done (Constitution Article X).
- **Required Inputs:** Current memory (S17).
- **Actions:** 1. Produce the completion report. 2. Confirm every Definition-of-Done condition reads pass. 3. State any remaining fail explicitly.
- **Deliverables:** A completion report certifying every Definition-of-Done line.
- **Exit Criteria:** Every Definition-of-Done condition reads pass. A single fail blocks completion.
- **Allowed Next States:** None. The project is done, or it re-enters the pipeline at the failing gate.
- **Blocked States:** None.
- **Failure Conditions:** If any Definition-of-Done line reads fail → route to the owning review state and re-enter the pipeline there.
- **Memory Updated:** `project.md` (status: complete).
