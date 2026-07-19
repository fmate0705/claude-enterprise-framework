# Conflict Resolution

**Framework:** CEF · **Specification:** AS-004 (Knowledge Engine) · **Version:** 0.1.0

**Purpose:** Resolve every incompatibility between two modules deterministically. When two loaded modules give guidance that cannot both be followed, this procedure produces Exactly one winner. A conflict is Never left open and is Never resolved by preference.

**Definition:** A *conflict* exists When following module A's guidance would violate module B's guidance for the same decision. Overlap without incompatibility is not a conflict.

---

## Resolution Procedure

```
RESOLVE(A, B):
  1. FLOOR CHECK
     If either option violates a floor (A11y AA, Security, Performance
     budget, Legal) → reject that option outright. The floor wins.
  2. TIER CHECK
     If tier(A) ≠ tier(B) → the higher tier wins (priorities.md, PY-01).
  3. SPECIFICITY CHECK
     If tier(A) = tier(B) → the module that OWNS the artifact wins (PY-03).
  4. ESCALATION
     If neither owns it → escalate to the next higher tier and repeat,
     terminating at M-CONST (PY-04).
  5. RECORD
     If the resolution changes a durable decision → write it to
     memory/decisions.md (ME-07) citing the winning module and rule.
```

Every conflict exits at step 1, 2, 3, or 4 with a single winner. Step 5 makes significant resolutions auditable.

## Conflict Rules

### CF-01 — Floors Are Absolute
**Decision:** A floor Always defeats a non-floor option, regardless of tier. No design, performance shortcut, or scaffold Ever wins against Accessibility AA, Security, the Performance budget, or Legal compliance.
**Example:** A template's low-contrast style conflicts with the Accessibility floor → the floor wins; the template is recolored.

### CF-02 — Higher Tier Wins
**Decision:** Between non-floor modules of different tiers, the higher tier Always wins.
**Example:** A Prompt (Tier 8) suggests skipping metadata; SEO (Tier 7) requires it → SEO wins.

### CF-03 — Ownership Breaks Same-Tier Ties
**Decision:** Within a tier, the owning module wins for artifacts it owns.
**Example:** M-UI and M-DESIGN (both Tier 6) differ on a button's states → M-UI wins; it owns component rules.

### CF-04 — Escalation Always Terminates
**Decision:** An unresolved same-tier, no-owner conflict escalates upward until a tier owns the decision, terminating at the Constitution.
**Example:** Two Tier-5 engineering modules disagree on a data boundary → escalate to M-ARCH (Tier 4), which owns boundaries.

### CF-05 — Constitution Is Never Overridden
**Decision:** No module Ever wins against M-CONST. A module that appears to contradict the Constitution is defective and is revised (Constitution Article XIII).
**Example:** A standard that permits placeholder content conflicts with Article IV → the standard is wrong and is corrected.

### CF-06 — User Instruction Within Scope
**Decision:** An explicit user instruction wins over the default ladder for the current task, Except it Never defeats a floor (CF-01). It is recorded and scoped (PY-05).
**Example:** The user mandates a specific hero layout; it is used unless it breaks a floor.

### CF-07 — Record Significant Resolutions
**Decision:** Every resolution that changes architecture, the design system, or a floor waiver is written to `memory/decisions.md`. A silent resolution of a durable conflict is Never allowed.

## Worked Conflicts

| Conflict | Modules | Resolution |
|---|---|---|
| Animation vs. performance budget | M-MOTION (T6) vs M-PERF (floor) | Floor wins (CF-01); motion is reduced to fit budget. |
| Template layout vs. design system | M-TEMPLATES (T8) vs M-DESIGN (T6) | Higher tier wins (CF-02); template conforms to the system. |
| Component states dispute | M-UI vs M-DESIGN (both T6) | Owner wins (CF-03); M-UI decides component states. |
| Data boundary dispute | M-REACT vs M-NEXT (both T5) | Escalate to M-ARCH (CF-04); architecture decides. |
| SEO vs. developer convenience | M-SEO (T7) vs a Prompt (T8) | Higher tier wins (CF-02); SEO required. |
| Standard permits placeholder | any standard vs M-CONST | Constitution wins (CF-05); standard revised. |

Because the procedure is total (a winner exists for Every pair) and terminating (escalation ends at Tier 1), `validation.md` records **KV-02 (no conflicting priorities): PASS**.
