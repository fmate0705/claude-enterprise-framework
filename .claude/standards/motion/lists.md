# List Motion

**Framework:** CEF · **Specification:** AS-009 (Motion Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix motion for list add/remove/reorder. List motion MUST make changes obvious with continuity and MUST stay performant on large lists.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## List Motion Rules

- **LST-01 — Add.** A new item MUST animate in (fade + subtle slide, UI band) so its arrival is obvious.
- **LST-02 — Remove.** A removed item MUST animate out (fade + collapse, exit easing) so its departure is clear; instant vanish MUST NOT be used for user-initiated removal.
- **LST-03 — Reorder.** Reordering MUST animate items to their new positions (shared-position transition) so the user tracks the change; abrupt jumps MUST NOT be used.
- **LST-04 — Stagger sparingly.** Initial list reveals MAY stagger with a small delay (30–60ms per item) and MUST cap the total sequence within the band ceiling; long staggered cascades MUST NOT be used.
- **LST-05 — Large lists.** For long or virtualized lists, per-item entrance motion MUST be minimal or disabled to preserve performance (`performance.md`); heavy motion on thousands of rows MUST NOT be used.
- **LST-06 — No layout thrash.** List motion MUST use transform/opacity; animating layout properties that reflow the list MUST NOT be used (`performance.md` MPF-03).
- **LST-07 — Consistency.** All lists MUST use consistent add/remove/reorder motion.
- **LST-08 — Reduced motion.** Under `prefers-reduced-motion`, list changes MUST reduce to instant or opacity while remaining perceivable.

## List Motion Guarantees

- **LST-G1** — Add, remove, and reorder are obvious with continuity.
- **LST-G2** — Motion is minimal on large/virtualized lists; no layout thrash.
- **LST-G3** — Consistent and reduced-motion safe.
