# Priority Engine

**Framework:** Claude Enterprise Framework (CEF) · **Specification:** AS-002 (Rule Engine) · **Version:** 0.1.0

**Purpose:** Define the single, ordered authority that resolves every conflict between valid options. When any two decisions compete and both cannot be satisfied, this engine decides which wins. It refines Article II of the Constitution into a deterministic ladder.

**Rule format:** Every rule states Rule Name, Purpose, Trigger, Conditions, Decision, Actions, Expected Output, and Example. Language is deterministic: Always, Never, Must, Only, Exactly, When, If, Else, Every.

---

## The Priority Ladder

The ladder, highest authority first. Higher Always wins over lower.

1. **User Goals**
2. **Correctness**
3. **Maintainability**
4. **Accessibility**
5. **Performance**
6. **SEO**
7. **Developer Experience**
8. **Visual Polish**
9. **Animations**

---

### PR-01 — The Priority Ladder
**Purpose:** Provide the one ordered authority for resolving trade-offs.
**Trigger:** When two or more valid options conflict and cannot all be satisfied.
**Conditions:** If choosing one option improves a higher-ranked priority at the cost of a lower one.
**Decision:** Always select the option that better serves the higher-ranked priority on the ladder.
**Actions:**
1. Name the priorities each option serves.
2. Rank those priorities by the ladder.
3. Select the option serving the highest-ranked priority.
4. If the trade-off is significant, record it in `memory/decisions.md`.
**Expected Output:** A decision justified by a named priority rank.
**Example:** An animation (9) that raises Largest Contentful Paint past budget (5) is removed. Performance wins.

### PR-02 — Non-Negotiable Floors
**Purpose:** Prevent the ladder from being read as permission to fall below a hard minimum.
**Trigger:** When an option would drop accessibility, security, legal compliance, or the performance budget below its floor.
**Conditions:** If the option violates WCAG 2.2 AA, introduces a security defect, breaks a legal requirement, or exceeds the performance budget.
**Decision:** Never select it. Floors are constraints, not priorities. Only an explicit, recorded, scoped user waiver may lower a floor.
**Actions:**
1. Reject the violating option.
2. Select the best floor-compliant option.
3. If the user waives a floor, record the waiver and its scope in `memory/decisions.md`.
**Expected Output:** No shipped work below any floor.
**Example:** A higher-contrast palette is chosen over a prettier low-contrast one, because AA contrast is a floor.

### PR-03 — User Goals Are Supreme
**Purpose:** Keep every unit of work aimed at the stated objective.
**Trigger:** When an option does not advance a goal recorded in `memory/project.md`.
**Conditions:** If the work serves no stated user goal.
**Decision:** Never build it. Every feature Must trace to a user goal.
**Actions:**
1. Cut or defer non-goal work.
2. If intent is ambiguous, ask the user before building.
**Expected Output:** Only goal-serving work enters the build.
**Example:** An unrequested decorative section is cut.

### PR-04 — Correctness Outranks All Buildable Qualities
**Purpose:** Incorrect software has negative value regardless of polish.
**Trigger:** When an option is faster, prettier, or simpler but incorrect.
**Conditions:** If the output is wrong, unsafe, or misleading.
**Decision:** Never trade correctness for any priority ranked below it.
**Actions:**
1. Reject the incorrect option.
2. Fix correctness first, then optimize lower priorities.
**Expected Output:** Correct behavior before any optimization.
**Example:** A memoization that returns stale data is reverted even though it is faster.

### PR-05 — Maintainability Outranks Convenience
**Purpose:** Protect the reader who arrives later without context.
**Trigger:** When a shortcut speeds delivery but harms long-term clarity.
**Conditions:** If an option reduces readability, increases duplication, or hides intent.
**Decision:** Always prefer the more maintainable option once Correctness is satisfied.
**Actions:**
1. Choose the clearer structure.
2. Refactor duplication into shared code.
**Expected Output:** Code a competent engineer changes safely without archaeology.
**Example:** A shared component replaces three near-identical copies.

### PR-06 — Accessibility Outranks Performance, SEO, and Aesthetics
**Purpose:** Rank inclusion above every quality below it on the ladder.
**Trigger:** When an accessible option costs performance, SEO, polish, or animation.
**Conditions:** If the accessible option is worse on a lower-ranked priority only.
**Decision:** Always choose the accessible option. Accessibility Only yields to User Goals, Correctness, and Maintainability, and never below its AA floor.
**Actions:**
1. Choose the accessible pattern.
2. Recover the lower priority by other means where possible.
**Expected Output:** Accessible interfaces that also meet lower priorities where feasible.
**Example:** A real focusable `button` is used over a lighter non-focusable `div`.

### PR-07 — Performance Outranks SEO, DX, and Aesthetics
**Purpose:** Rank measured speed above discoverability, developer comfort, and decoration.
**Trigger:** When a faster option costs SEO tooling, developer convenience, polish, or animation.
**Conditions:** If the slower option wins Only on a priority ranked below Performance.
**Decision:** Always choose the option that keeps Core Web Vitals and bundle size within budget.
**Actions:**
1. Choose the in-budget option.
2. Defer or lazy-load lower-priority weight.
**Expected Output:** Pages within the performance budget.
**Example:** A heavy carousel library is replaced with a lighter native solution.

### PR-08 — SEO Outranks DX and Aesthetics
**Purpose:** Rank discoverability above developer convenience and decoration.
**Trigger:** When an SEO-correct option is less convenient or less flashy.
**Conditions:** If the alternative wins Only on Developer Experience, Visual Polish, or Animation.
**Decision:** Always choose the SEO-correct option.
**Actions:**
1. Preserve semantic structure and metadata.
2. Achieve the visual goal without breaking structure.
**Expected Output:** Discoverable pages with intact metadata and semantics.
**Example:** A single semantic `h1` is kept even when a styled `div` would be simpler to lay out.

### PR-09 — Visual Polish Outranks Animation
**Purpose:** Rank static quality above motion.
**Trigger:** When animation competes with static clarity or with any higher priority.
**Conditions:** If motion adds no communication value or costs a higher priority.
**Decision:** Always resolve for polish and higher priorities first. Animation is the lowest priority and is added Only after all others are satisfied.
**Actions:**
1. Deliver the static, polished result first.
2. Add motion Only when it communicates state or hierarchy.
**Expected Output:** Interfaces that are complete without motion and improved by it where present.
**Example:** A page ships fully usable with no animation; a subtle transition is added last.

### PR-10 — Explicit User Instruction Overrides Default Ranking
**Purpose:** Honor the user's authority within scope while protecting floors.
**Trigger:** When the user gives an explicit instruction for the current task that conflicts with the default ladder.
**Conditions:** If the instruction does not lower a non-negotiable floor (PR-02).
**Decision:** Always follow the explicit instruction for that task Only. Never extend the override to the next task automatically.
**Actions:**
1. Apply the instruction within its scope.
2. Record the override in `memory/decisions.md` when it changes a significant default.
**Expected Output:** The user's choice honored without silent scope creep.
**Example:** The user requests a bold hero animation; it is added, still within the performance budget floor.

### PR-11 — Record Every Significant Conflict
**Purpose:** Make trade-offs auditable and non-repeating.
**Trigger:** When a priority conflict changes a durable decision.
**Conditions:** If the resolved conflict affects architecture, design system, or a floor waiver.
**Decision:** Always write the decision, its rank basis, and the rejected alternative to `memory/decisions.md`.
**Actions:**
1. Record decision, context, alternatives, and rationale.
2. Reference the rule ID that resolved it.
**Expected Output:** A durable, reviewable record.
**Example:** "Chose server rendering over a lighter client bundle: Accessibility (4) and SEO (6) outrank DX (7)."
