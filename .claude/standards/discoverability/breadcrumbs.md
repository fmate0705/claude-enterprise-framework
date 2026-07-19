# Breadcrumbs

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix breadcrumb usage. Breadcrumbs expose hierarchy to users and machines and MUST carry structured data.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Breadcrumb Rules

- **BC-01 — On deep pages.** Pages deep in the hierarchy MUST provide breadcrumbs showing the path from home to the current page.
- **BC-02 — Structured data.** Breadcrumbs MUST emit `BreadcrumbList` JSON-LD matching the visible trail (`structured-data.md` SD-09).
- **BC-03 — Reflect hierarchy.** The trail MUST reflect the real IA path, not an arbitrary or marketing sequence (`information-architecture.md`).
- **BC-04 — Current page marked.** The current page MUST be marked (`aria-current="page"`) and MUST NOT be a link.
- **BC-05 — Accessible.** Breadcrumbs MUST be within a labeled `nav` landmark and MUST be keyboard-accessible.
- **BC-06 — Canonical links.** Breadcrumb links MUST point to canonical URLs (`canonical.md` CN-05).
- **BC-07 — Consistent placement.** Breadcrumbs MUST be placed consistently across the site.
- **BC-08 — Not a replacement.** Breadcrumbs MUST NOT replace primary navigation; they complement it.

## Breadcrumb Guarantees

- **BC-G1** — Breadcrumbs on deep pages reflecting the real hierarchy.
- **BC-G2** — `BreadcrumbList` JSON-LD matching the visible trail.
- **BC-G3** — Accessible, canonical, consistently placed.
