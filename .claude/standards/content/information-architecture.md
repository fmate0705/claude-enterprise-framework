# Content Information Architecture

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how content is organized across a site so readers and machines find and understand it. This is the content-planning view; the discoverability crawl view is in `discoverability/information-architecture.md`, and the two MUST NOT conflict.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Content IA Rules

- **CIA-01 — One purpose per page.** Each page MUST have one clear purpose and topic; multi-purpose pages MUST NOT dilute the message (`CNP-36`).
- **CIA-02 — Content model first.** A typed content model (page types, fields, relationships) MUST be defined before writing at scale so structure is consistent (`memory/architecture.md`).
- **CIA-03 — Topic clusters.** Related content SHOULD be organized into clusters around a hub/pillar page that links to and from cluster pages.
- **CIA-04 — Logical hierarchy.** Content MUST be organized in a clear hierarchy (home → sections → pages); a flat, unorganized set MUST NOT be used at scale.
- **CIA-05 — Match intent to page.** Content MUST match the visitor's intent and stage for each page (awareness, consideration, decision, support) (`CNP-36`).
- **CIA-06 — Consistent labels.** Section, category, and navigation labels MUST be consistent and descriptive across the site (`CNP-19`).
- **CIA-07 — Reachable content.** Every content page MUST be reachable from navigation or contextual links; orphaned content MUST NOT exist (discoverability IL-08).
- **CIA-08 — Internal linking strategy.** Content MUST link to related content with descriptive anchors to build clusters and guide readers (`discoverability/internal-linking.md`).
- **CIA-09 — No duplicate topics.** The same topic MUST NOT be split across competing pages; one authoritative page per topic (`CNP-19`, discoverability DAP-74).
- **CIA-10 — Progressive depth.** Content SHOULD offer a summary with the option to go deeper (progressive disclosure) rather than overwhelming at once.

## Content-IA Guarantees

- **CIA-G1** — One purpose per page; a defined content model.
- **CIA-G2** — Topic clusters with hub pages and internal linking.
- **CIA-G3** — Consistent labels; reachable, non-duplicated content.
