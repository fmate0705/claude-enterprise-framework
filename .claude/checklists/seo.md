# SEO / Discoverability Checklist — Gate 7

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Execute the discoverability gate. **Owner:** SEO Specialist (with AI SEO Specialist). Governed by `standards/quality/discoverability-review.md`, `standards/discoverability/`, and `rules/seo-engine.md` (SE-01…13).

Limits are owned by `metadata.policy.yaml` and `discoverability.policy.yaml`.

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-SEO-01 | Unique title per page | Every page has a unique `<title>` ≤60 chars | Missing, duplicate, or overlong title | Critical | SEO Specialist |
| CHK-SEO-02 | Unique description per page | Every page has a unique description ≤160 chars | Missing or duplicate description | Critical | SEO Specialist |
| CHK-SEO-03 | Canonical URL | Exactly one absolute, self-referencing canonical | Missing, multiple, or conflicting canonical | Critical | SEO Specialist |
| CHK-SEO-04 | Open Graph complete | og:title/description/type/url/image present; image on-spec | Missing OG tags or image | Major | SEO Specialist |
| CHK-SEO-05 | Twitter card | twitter:card/title/description/image present and OG-consistent | Missing or inconsistent Twitter tags | Major | SEO Specialist |
| CHK-SEO-06 | Viewport, charset, lang | All three present and correct | Any missing | Major | Frontend Engineer |
| CHK-SEO-07 | Robots explicit | Per-page index state explicit and intentional; production indexable | Accidental noindex or conflicting rules | Critical | SEO Specialist |
| CHK-SEO-08 | robots.txt + sitemap | Valid robots.txt referencing a current sitemap | Missing/stale sitemap or unreferenced | Major | SEO Specialist |
| CHK-SEO-09 | Sitemap contents | Only canonical, indexable URLs listed | noindex/non-canonical URLs listed | Major | SEO Specialist |
| CHK-SEO-10 | Structured data valid | JSON-LD valid for the page type and matches visible content | Invalid or misrepresenting schema | Major | SEO Specialist |
| CHK-SEO-11 | Semantic landmarks | header/nav/main/footer present; exactly one `main` | Missing landmarks or multiple `main` | Major | Frontend Engineer |
| CHK-SEO-12 | Heading outline | Exactly one `h1`; sequential levels | Multiple h1 or skipped levels | Major | Frontend Engineer |
| CHK-SEO-13 | Internal links | Descriptive anchors; no orphans; key pages ≤3 clicks | Orphan page or generic anchors | Major | SEO Specialist |
| CHK-SEO-14 | llms.txt | Present, current, consistent with the sitemap | Missing or stale | Minor | AI SEO Specialist |
| CHK-SEO-15 | Image SEO | Descriptive filenames; alt decided on every image | Generic filenames or missing alt | Major | SEO Specialist |
| CHK-SEO-16 | Rendered metadata verified | Metadata verified in a real browser (Chrome DevTools MCP) | Verified only in source | Major | QA Engineer |
| CHK-SEO-17 | No discoverability anti-patterns | Zero entries from `discoverability/anti-patterns.md` (DAP-01…107) | Any listed anti-pattern present | Major | SEO Specialist |

**Gate pass:** category score ≥ 90, 0 Critical, 0 Major.
