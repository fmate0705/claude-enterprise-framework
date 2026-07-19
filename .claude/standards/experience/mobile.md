# Mobile-First Design

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix mobile-first design decisions. Mobile is the default baseline (`principles.md` XP-P31); the layout is designed for small screens and enhanced upward. Touch and accessibility thresholds are canonical in `experience.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Mobile Rules

- **MO-01 — Touch targets.** Interactive targets MUST be ≥ 44×44px with ≥ 8px between adjacent targets; smaller targets MUST NOT be used.
- **MO-02 — Thumb reach.** Primary actions MUST be placed within thumb reach; critical actions MUST NOT be stranded in hard-to-reach corners.
- **MO-03 — Gesture considerations.** Standard gestures MAY be used; essential actions MUST also be available without a gesture, and a gesture MUST NOT be the only way to perform a critical action.
- **MO-04 — Navigation.** Mobile navigation MUST be an accessible disclosure with focus management (`navigation.md` XN-07).
- **MO-05 — Typography scaling.** Type MUST step down proportionally while keeping body ≥ 16px to avoid zoom (`typography.md` TY-02/TY-11).
- **MO-06 — Spacing adjustments.** Section spacing MUST step down to the mobile values (64px) while keeping content off the edges (≥ 16px) (`spacing.md` SP-04/SP-08).
- **MO-07 — Reflow, not shrink.** Content MUST reflow and stack on small screens; it MUST NOT rely on zoom-out, and MUST NOT cause horizontal overflow (`responsive.md`).
- **MO-08 — Performance.** Mobile MUST meet the performance budget on representative devices/networks; heavy assets MUST NOT be shipped to mobile unoptimized.
- **MO-09 — Orientation.** The interface MUST remain usable in both orientations.

## Mobile Guarantees

- **MO-G1** — Designed mobile-first; targets ≥ 44px within thumb reach.
- **MO-G2** — Body ≥ 16px; content reflows without overflow.
- **MO-G3** — Mobile meets the performance budget.
