# Navigation Experience

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix the design decisions that make wayfinding effortless. This governs the *experience* of navigation; the component behavior is in `components/navigation.md`, and the two MUST NOT be read as conflicting.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Navigation Experience Rules

- **XN-01 — Few, clear items.** Primary navigation SHOULD present 5–7 clear items; an overloaded nav MUST NOT be used (overflow moves to a menu).
- **XN-02 — Predictable placement.** Navigation MUST sit where users expect (top or side) and MUST be consistent across the product; surprising placement MUST NOT be used.
- **XN-03 — Clear current location.** The current location MUST be indicated clearly (`aria-current` + visual); color alone MUST NOT convey it (`components/navigation.md` NV-07).
- **XN-04 — Descriptive labels.** Nav labels MUST be short and descriptive; vague labels ("Solutions" with no meaning) SHOULD be avoided.
- **XN-05 — Findability.** Primary tasks MUST be reachable within a shallow path; deep burial of key actions MUST NOT occur.
- **XN-06 — Breadcrumbs for depth.** Deep hierarchies MUST provide breadcrumbs so users always know where they are.
- **XN-07 — Mobile navigation.** Mobile navigation MUST be an accessible disclosure with focus management; a hover-only menu MUST NOT be the sole mechanism (`mobile.md`).
- **XN-08 — Non-obstructive.** Sticky navigation MUST NOT obscure content or focus; it MUST offset anchors (`layout.md` LO-09).
- **XN-09 — Footer as map.** The footer MUST provide an organized secondary map (grouped links, legal, contact) — not a flat dump (`sections.md` SEC-10).
- **XN-10 — Skip link.** A skip-to-content link MUST be the first focusable element on pages with nav before main.

## Navigation-Experience Guarantees

- **XN-G1** — Few, clear, predictably placed items with obvious current state.
- **XN-G2** — Shallow findability; breadcrumbs for depth.
- **XN-G3** — Accessible mobile navigation and a skip link.
