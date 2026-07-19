# Navigation (Discoverability)

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix navigation from the discoverability perspective — crawlable, semantic, and mapping the IA. This complements the Experience and Component navigation standards and MUST NOT conflict with them.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Navigation Discoverability Rules

- **NVD-01 — Crawlable links.** Navigation MUST use real `<a href>` links; script-only or button-only navigation that hides destinations from crawlers MUST NOT be used.
- **NVD-02 — Semantic landmark.** Navigation MUST be wrapped in a `<nav>` landmark with an accessible name (`semantic-html.md` SH-02).
- **NVD-03 — Maps the IA.** Primary navigation MUST reflect the site's top-level information architecture (`information-architecture.md`).
- **NVD-04 — Consistent across pages.** Navigation MUST be consistent site-wide so crawlers and users learn the structure once.
- **NVD-05 — Reachability.** Every important section MUST be reachable from navigation; key pages MUST NOT depend solely on contextual links (`internal-linking.md` IL-08).
- **NVD-06 — Descriptive labels.** Navigation labels MUST describe their destinations; vague labels MUST NOT obscure meaning.
- **NVD-07 — Mobile parity.** Mobile navigation MUST expose the same destinations as desktop (mobile-first indexing, `philosophy.md` DP-18).
- **NVD-08 — Footer navigation.** The footer MUST provide a secondary, organized map including legal and key pages (`internal-linking.md` IL-03).
- **NVD-09 — Skip link.** A skip-to-content link MUST precede navigation (`accessibility-signals.md`).
- **NVD-10 — Canonical destinations.** Navigation links MUST target canonical URLs (`canonical.md` CN-05).

## Navigation Guarantees

- **NVD-G1** — Crawlable, semantic navigation mapping the IA.
- **NVD-G2** — Consistent, descriptive, mobile-parity navigation.
- **NVD-G3** — Canonical destinations; skip link present.
