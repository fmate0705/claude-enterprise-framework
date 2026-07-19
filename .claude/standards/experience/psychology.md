# Applied Design Psychology

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Translate durable psychology principles into actionable design guidance. Only actionable rules are included; theory without a decision is omitted.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Psychology Rules

- **PSY-01 — Hick's Law (choice cost).** More choices slow decisions. A view MUST limit simultaneous choices; primary paths MUST be few, and secondary options MUST be progressively disclosed (`principles.md` XP-P27).
- **PSY-02 — Fitts's Law (target cost).** Distance and size govern acquisition time. Primary targets MUST be large and placed within easy reach (thumb reach on mobile); small, distant primary targets MUST NOT be used (`cta.md` CTA-06, `mobile.md` MO-02).
- **PSY-03 — Miller's Law (working memory).** People hold ~7±2 items. Groups (nav items, list chunks, steps) SHOULD stay within this range; long undivided lists MUST be chunked.
- **PSY-04 — Gestalt: Proximity.** Related items MUST be grouped by closeness; unrelated items MUST be separated (`spacing.md` SP-06).
- **PSY-05 — Gestalt: Similarity.** Items of the same kind MUST look the same; the same pattern MUST NOT be styled differently across the product (`composition.md` CO-08).
- **PSY-06 — Gestalt: Common Region & Continuity.** Grouping MUST use shared regions and aligned flow rather than decorative dividers; the eye MUST be led along a continuous path.
- **PSY-07 — Visual perception (contrast & scale).** Attention follows contrast and size. The most important element MUST carry the most contrast and scale (`hierarchy.md` HR-06/HR-07).
- **PSY-08 — Decision fatigue.** Repeated or heavy choices exhaust users. Flows MUST minimize and sequence decisions; a single screen MUST NOT demand many simultaneous decisions.
- **PSY-09 — Attention guidance.** The design MUST guide attention deliberately from message to action using hierarchy, not force it with intrusive motion.
- **PSY-10 — Cognitive load.** Extraneous load MUST be removed: consistent patterns, clear labels, and progressive disclosure reduce it; novelty and clutter increase it and MUST be avoided.
- **PSY-11 — Recognition over recall.** Interfaces MUST let users recognize options rather than recall them; hidden, unlabeled controls MUST NOT be relied upon.
- **PSY-12 — Honest influence.** Psychology MUST be used to reduce friction and clarify value, never to manipulate; dark patterns MUST NOT be used (`principles.md` XP-P26).

## Psychology Guarantees

- **PSY-G1** — Choices are few, chunked, and progressively disclosed.
- **PSY-G2** — Attention is guided by hierarchy; cognitive load is minimized.
- **PSY-G3** — Influence is honest; no manipulation.
