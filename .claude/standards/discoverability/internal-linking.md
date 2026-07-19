# Internal Linking

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix internal linking. Links express relationships, distribute authority, and make every page reachable. Rules (including max click depth) are canonical in `discoverability.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Internal Linking Rules

- **IL-01 — Contextual links.** Body content MUST link to relevant related pages with descriptive anchor text; keyword-irrelevant or forced links MUST NOT be used.
- **IL-02 — Navigation links.** Primary navigation MUST link to key hubs/pages; navigation MUST be crawlable (real `<a href>`), not script-only.
- **IL-03 — Footer links.** The footer MUST provide an organized secondary set of links (key pages, legal); a flat unlabeled dump MUST NOT be used.
- **IL-04 — Related content.** Pages SHOULD link to related content (related articles, products, services) to build topic clusters (`information-architecture.md` IA-04).
- **IL-05 — Authority distribution.** Important pages MUST receive more internal links; a key page MUST NOT be under-linked or orphaned.
- **IL-06 — Descriptive anchor text.** Anchor text MUST describe the destination; "click here"/"read more" as the sole anchor MUST NOT be used (SE-07).
- **IL-07 — Link depth.** Important pages MUST be reachable within 3 clicks of the home page; critical pages MUST NOT be buried deeper without justification.
- **IL-08 — No orphans.** Every page MUST have at least one internal link pointing to it; orphan pages MUST NOT exist.
- **IL-09 — Working links.** Internal links MUST resolve (200); broken internal links and `href="#"` placeholders MUST NOT ship.
- **IL-10 — Canonical targets.** Internal links MUST point to canonical URLs, not redirecting or non-canonical variants (`canonical.md` CN-05).
- **IL-11 — Reasonable count.** A page SHOULD keep internal links purposeful; an excessive, indiscriminate link count MUST NOT be used.
- **IL-12 — Bidirectional hierarchy.** Parent and child pages MUST link to each other (`information-architecture.md` IA-05).

## Internal-Linking Guarantees

- **IL-G1** — Descriptive, working, canonical internal links throughout.
- **IL-G2** — Authority flows to key pages; nothing is orphaned.
- **IL-G3** — Important pages within 3 clicks; hierarchy is bidirectional.
