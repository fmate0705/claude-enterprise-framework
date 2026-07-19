# Structured Data

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Fix the required schema.org structured data per page type. JSON-LD MUST be valid and MUST match visible content. Required types per page are canonical in `schema.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Format Rules

- **SD-01 — JSON-LD.** Structured data MUST be emitted as JSON-LD in the document; Microdata/RDFa MUST NOT be mixed in as the primary format.
- **SD-02 — Valid.** Every schema MUST be valid schema.org and MUST parse without errors; invalid schema MUST NOT be generated.
- **SD-03 — Truthful.** Structured data MUST describe content actually visible on the page; schema MUST NOT misrepresent or add content not present.
- **SD-04 — Type-appropriate.** The schema type MUST match the page's real type; a mismatched type MUST NOT be used.

## Required & Recognized Types

| ID · Type | Purpose | Required fields | Optional fields | When applicable |
|---|---|---|---|---|
| SD-05 WebSite | Identify the site + search action | `name`, `url` | `potentialAction` (SearchAction) | Site root; once per site |
| SD-06 Organization | Identify the publishing entity | `name`, `url`, `logo` | `sameAs`, `contactPoint` | Site-wide; brand pages |
| SD-07 LocalBusiness | Identify a physical business | `name`, `address`, `telephone` | `geo`, `openingHours`, `priceRange` | Local business/location pages |
| SD-08 WebPage | Describe the page | `name`, `url` | `breadcrumb`, `primaryImageOfPage` | Generic pages |
| SD-09 BreadcrumbList | Expose hierarchy | `itemListElement[]` | — | Pages deep in hierarchy |
| SD-10 Article | Describe an article/post | `headline`, `author`, `datePublished` | `dateModified`, `image`, `publisher` | Blog posts, news, articles |
| SD-11 FAQPage | Expose Q&A | `mainEntity[]` (Question + acceptedAnswer) | — | Pages with genuine FAQs |
| SD-12 Product | Describe a product | `name`, `image`, `offers` | `brand`, `aggregateRating`, `review` | Product pages |
| SD-13 Service | Describe a service | `name`, `provider` | `areaServed`, `offers` | Service pages |
| SD-14 Person | Describe a person | `name` | `jobTitle`, `sameAs`, `image` | Author/team/profile pages |
| SD-15 Event | Describe an event | `name`, `startDate`, `location` | `endDate`, `offers`, `performer` | Event pages |
| SD-16 SoftwareApplication | Describe an app | `name`, `applicationCategory` | `offers`, `aggregateRating`, `operatingSystem` | App/SaaS pages |
| SD-17 Review | Describe a review | `itemReviewed`, `reviewRating`, `author` | `datePublished` | Real, attributed reviews |
| SD-18 HowTo | Describe steps | `name`, `step[]` | `totalTime`, `supply`, `tool` | Step-by-step guides |

## Structured-Data Rules

- **SD-19 — One primary type per page.** A page MUST declare one primary type matching its purpose; supporting types (BreadcrumbList, Organization) MAY accompany it.
- **SD-20 — No fabricated ratings.** `aggregateRating`/`Review` MUST reflect real, attributed data; fabricated ratings MUST NOT be emitted (Constitution Article IV).
- **SD-21 — Consistent entities.** Entity fields (`name`, `sameAs`, IDs) MUST be consistent across pages (`entity-seo.md`).
- **SD-22 — Validate before ship.** Structured data MUST be validated (against schema.org and a testing tool) before completion.

## Structured-Data Guarantees

- **SD-G1** — Valid JSON-LD matching visible content on every applicable page.
- **SD-G2** — Correct primary type; consistent entities; no fabricated data.
- **SD-G3** — Validated before completion.
