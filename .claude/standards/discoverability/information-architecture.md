# Information Architecture

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix how a site's content is organized for discovery. A clear hierarchy and topic structure help users and crawlers understand and reach every page.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## IA Rules

- **IA-01 — Clear hierarchy.** The site MUST have a clear hierarchy (home → categories/hubs → detail pages); a flat, unstructured pile of pages MUST NOT be used at scale.
- **IA-02 — One purpose per page.** Every page MUST serve one clear purpose and topic (`philosophy.md` DP-08).
- **IA-03 — Categories and topics.** Related pages MUST be organized into categories/topics; a page MUST belong to a logical place in the structure.
- **IA-04 — Topic clusters.** Related content SHOULD be organized into clusters around a hub page (pillar) that links to and from cluster pages.
- **IA-05 — Parent/child.** Parent pages MUST link to their children and children back to parents; hierarchy MUST be navigable in both directions.
- **IA-06 — Hub pages.** Hub/pillar pages MUST provide an overview and link to detailed pages on the topic.
- **IA-07 — Landing pages.** Conversion landing pages MUST fit the IA and MUST be reachable; orphaned landing pages MUST NOT exist (`internal-linking.md`).
- **IA-08 — Shallow depth.** Important pages MUST be reachable within a small number of clicks from the home page (`internal-linking.md` IL-07).
- **IA-09 — Consistent URLs mirror IA.** URL structure SHOULD mirror the hierarchy (`/category/subtopic/page`) so paths are meaningful.
- **IA-10 — No orphan pages.** Every page MUST be reachable from navigation or contextual links; orphan pages MUST NOT exist.

## IA Guarantees

- **IA-G1** — A clear, navigable hierarchy with categories, hubs, and clusters.
- **IA-G2** — One purpose per page; URLs mirror the structure.
- **IA-G3** — Shallow depth to key pages; no orphans.
