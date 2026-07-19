# Discoverability Anti-Patterns

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Document the discoverability anti-patterns this engine forbids. Each states the Problem, its Impact, and the Correct approach. A page containing any of these MUST be corrected before it passes review. (This catalog is required by the AS-010 anti-patterns mandate; it is not in the module's file list but is authored here as its canonical home.)

**Enforcement:** When a listed anti-pattern is detected, the page MUST NOT pass `review.md`/`validation.md`. The Correct approach MUST be applied.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Metadata & Titles

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-01 Missing title | Page has no `<title>` | Not indexable meaningfully | Unique title ≤ 60 chars |
| DAP-02 Duplicate titles | Same title across pages | Cannibalization, confusion | Unique title per page |
| DAP-03 Missing description | No meta description | Poor snippet, lost click | Unique description ≤ 160 |
| DAP-04 Duplicate descriptions | Same description across pages | Weak differentiation | Unique per page |
| DAP-05 Placeholder metadata | "Home", template defaults | Signals unfinished, untrusted | Real, specific metadata |
| DAP-06 Auto-generated descriptions | Boilerplate/scraped descriptions | Low quality, ignored | Hand-written, accurate |
| DAP-07 Keyword-stuffed title | Repeated keywords in title | Spam signal | Natural, descriptive title |
| DAP-08 Overlong title | Title far beyond 60 chars | Truncated, unclear | Concise ≤ 60 |
| DAP-09 Missing viewport | No viewport meta | Not mobile-friendly | `width=device-width` |
| DAP-10 Missing charset | No charset declared | Encoding errors | `<meta charset="utf-8">` |
| DAP-11 Missing lang | No `<html lang>` | Misclassified language | Set correct `lang` |
| DAP-12 No favicon/theme | Missing icons/theme color | Unpolished, low trust | Define icons + theme color |
| DAP-13 Misleading title | Title mismatches content | Bounce, distrust | Title reflects content |
| DAP-14 Metadata in client only | Metadata set only client-side | Crawlers miss it | Server-render metadata |

## Canonical

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-15 Missing canonical | No canonical URL | Duplicate-content ambiguity | Exactly one canonical |
| DAP-16 Duplicate canonicals | Multiple canonical tags | Conflicting signals | One canonical per page |
| DAP-17 Cross-canonical to unrelated | Canonical points elsewhere wrongly | Wrong page indexed | Self- or equivalent-canonical |
| DAP-18 Relative canonical | Non-absolute canonical | Ambiguous resolution | Absolute HTTPS URL |
| DAP-19 Canonical to noindex | Canonical targets a noindex page | Conflicting signals | Resolve the conflict |
| DAP-20 Parameter duplication | Params create duplicate URLs | Index bloat | Canonicalize to base |
| DAP-21 www/non-www split | Both resolve independently | Duplicate content | Redirect/canonicalize to one |

## Semantic HTML & Headings

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-22 Non-semantic HTML | `div` soup instead of elements | Weak structure signals | Semantic elements |
| DAP-23 Div buttons/links | `div` as controls | Inaccessible, uncrawlable | Real `button`/`a` |
| DAP-24 Multiple h1 | More than one `h1` | Ambiguous topic | Exactly one `h1` |
| DAP-25 Missing h1 | No `h1` | No clear topic | One descriptive `h1` |
| DAP-26 Skipped heading levels | `h2` → `h4` jumps | Broken outline | Sequential levels |
| DAP-27 Headings for styling | Heading tags to size text | Misleading outline | Style with tokens |
| DAP-28 No landmarks | Missing header/nav/main/footer | Unclear structure | Use landmarks |
| DAP-29 Multiple main | More than one `<main>` | Ambiguous primary content | Exactly one `main` |
| DAP-30 Faked lists/tables | `div`s as lists/tables | Lost semantics | `ul`/`ol`/`table` |
| DAP-31 Unlabeled nav | `nav` without accessible name | Ambiguous regions | Label each `nav` |
| DAP-32 Non-machine dates | Plain-text dates | Unparseable | `<time datetime>` |
| DAP-33 Uncaptioned figures | Media without figure/caption | Lost relationship | `figure`/`figcaption` |

## Structured Data

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-34 Broken schema | Invalid JSON-LD | Ignored or penalized | Valid schema.org |
| DAP-35 Schema mismatch | Schema not on the page | Deceptive; risk penalty | Match visible content |
| DAP-36 Wrong type | Mismatched schema type | Misclassification | Correct type |
| DAP-37 Fabricated ratings | Fake aggregateRating/review | Manipulative; penalty | Real, attributed data |
| DAP-38 Missing required fields | Incomplete schema | Not eligible for features | Include required fields |
| DAP-39 Inconsistent entities | Entity data varies | Fragmented signal | Consistent entity fields |
| DAP-40 Spammy markup | Marking up hidden/irrelevant content | Penalty risk | Mark up real content |
| DAP-41 No structured data | Recognizable type unmarked | Missed understanding | Emit appropriate JSON-LD |
| DAP-42 Duplicate conflicting schema | Two schemas contradict | Confusing signals | One coherent set |
| DAP-43 Unvalidated schema | Shipped without validation | Silent errors | Validate before ship |

## Robots & Crawlability

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-44 Accidental noindex | Production page noindex | Deindexed | Intentional index state |
| DAP-45 Missing robots.txt | No robots.txt | Uncontrolled crawling | Serve valid robots.txt |
| DAP-46 Conflicting robots rules | noindex + sitemap + canonical clash | Mixed signals | Resolve conflicts |
| DAP-47 Blocking resources | CSS/JS blocked in robots | Can't render page | Allow render resources |
| DAP-48 Disallow to deindex | Using disallow to remove page | Stays indexed | Use noindex |
| DAP-49 Infinite crawl paths | Endless parameter/calendar URLs | Crawl-budget waste | Control with canonical/robots |
| DAP-50 Staging indexed | Preview env indexable | Duplicate/leak | noindex/auth staging |
| DAP-51 Soft 404 | Missing page returns 200 | Index bloat | Return 404/410 |
| DAP-52 Redirect chains | Multiple redirect hops | Crawl waste, latency | Single-hop redirect |
| DAP-53 Client-only content | Primary content needs JS | Crawlers miss it | Server-render content |

## Sitemap

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-54 Missing sitemap | No sitemap.xml | Harder discovery | Serve a sitemap |
| DAP-55 Stale sitemap | Out of date after changes | Wrong URLs advertised | Update on route change |
| DAP-56 Noindex in sitemap | Listing noindex/non-canonical URLs | Conflicting signals | List only indexable canonicals |
| DAP-57 Sitemap not referenced | robots.txt lacks sitemap | Harder to find | Reference in robots.txt |
| DAP-58 Oversized sitemap | Exceeds URL/size limits | Ignored | Split with index |
| DAP-59 Fabricated lastmod | Fake modification dates | Distrust | Accurate lastmod |

## Internal Linking & IA

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-60 Orphan pages | Pages with no inbound links | Undiscoverable | Link from nav/content |
| DAP-61 Generic anchor text | "Click here"/"read more" | Weak relevance signal | Descriptive anchors |
| DAP-62 Broken internal links | Dead/`#` links | Crawl errors, distrust | Working canonical links |
| DAP-63 Links to non-canonical | Linking redirecting variants | Diluted signals | Link to canonical URLs |
| DAP-64 Deep burial | Key pages > 3 clicks deep | Under-discovered | Shallow depth |
| DAP-65 Script-only nav | Navigation not crawlable | Structure hidden | Real `<a href>` |
| DAP-66 No hierarchy | Flat pile of pages | Unclear structure | Categories/hubs/clusters |
| DAP-67 Missing breadcrumbs | Deep pages, no trail | Lost context | Breadcrumbs + JSON-LD |
| DAP-68 Footer link dump | Flat unlabeled footer links | Weak, noisy | Organized footer map |
| DAP-69 Over-linking | Excessive indiscriminate links | Diluted authority | Purposeful links |
| DAP-70 One-way hierarchy | Parent→child but not back | Weak connectivity | Bidirectional links |
| DAP-71 Duplicate entity pages | Competing pages for one entity | Fragmented authority | One canonical entity page |

## Content & AI Discoverability

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-72 Keyword stuffing | Repeated keywords | Spam; poor UX and retrieval | Natural language |
| DAP-73 Thin pages | Little/no substantive content | Low value; ignored | Substantive content |
| DAP-74 Duplicate content | Same content on many URLs | Dilution | Unique or canonicalize |
| DAP-75 Hidden content | Content hidden from users, shown to bots | Cloaking; penalty | Machine/human parity |
| DAP-76 Cloaking | Different content to crawlers | Penalty; distrust | Serve the same content |
| DAP-77 Vague headings | Non-descriptive section titles | Hard to extract | Descriptive headings |
| DAP-78 Ambiguous language | Hedged, unclear statements | Poor comprehension | Clear, factual language |
| DAP-79 Buried answers | Answers hidden in prose | Hard to retrieve | Front-load answers |
| DAP-80 Prose-only facts | Facts not in lists/tables | Hard to extract | Extractable structures |
| DAP-81 Inconsistent terminology | Same concept, many names | Weak retrieval | Consistent terms |
| DAP-82 Unexplained relationships | Concepts not connected | Weak understanding | Explain relationships |
| DAP-83 Fake statistics | Invented numbers | Distrust; risk | Verified data |
| DAP-84 Stale content as current | Outdated shown as fresh | Distrust | Accurate dates |
| DAP-85 AI filler | Hollow generic paragraphs | Low value | Specific, real content |

## Open Graph & Twitter

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-86 Missing OG tags | No Open Graph | Poor share previews | Full OG set |
| DAP-87 Missing og:image | No share image | Weak preview | 1200×630 image |
| DAP-88 Wrong og:image size | Off-spec image | Cropped/blurred | 1200×630, dimensions declared |
| DAP-89 Relative OG URLs | Non-absolute og:url/image | Broken previews | Absolute HTTPS |
| DAP-90 Missing Twitter card | No twitter tags | Poor X previews | Twitter card set |
| DAP-91 OG/Twitter mismatch | Conflicting share metadata | Inconsistent previews | Consistent OG/Twitter |
| DAP-92 Misleading OG | Share content misrepresents page | Distrust | Honest previews |

## Performance & Signals

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-93 Poor Core Web Vitals | LCP/INP/CLS over thresholds | Ranking/UX harm | Meet CWV thresholds |
| DAP-94 Layout shift | High CLS | Instability, misclicks | Reserve space; CLS ≤ 0.1 |
| DAP-95 Slow pages | Over-budget loading | Discovery/UX harm | Within budget |
| DAP-96 No HTTPS | HTTP or mixed content | Trust/ranking harm | HTTPS only |
| DAP-97 Not mobile-friendly | Poor mobile experience | Mobile-first indexing harm | Responsive, ≥16px, ≥44px |
| DAP-98 Unsized media | Images without dimensions | Layout shift | Explicit dimensions |
| DAP-99 Render-blocking resources | Blocking CSS/JS | Slow first paint | Defer/optimize |

## Internationalization & Local

| ID · Name | Problem | Impact | Correct approach |
|---|---|---|---|
| DAP-100 Missing hreflang | No language annotations | Wrong-language served | Reciprocal hreflang |
| DAP-101 Broken hreflang | Non-reciprocal/invalid | Ignored signals | Valid reciprocal set |
| DAP-102 Untranslated metadata | Wrong-language metadata | Confuses users/engines | Localized metadata |
| DAP-103 Mixed URL strategies | Inconsistent i18n URLs | Confusing structure | One consistent strategy |
| DAP-104 Auto-redirect only | Variant reachable only by redirect | Uncrawlable variants | Distinct crawlable URLs |
| DAP-105 NAP inconsistency | Varying name/address/phone | Weak local trust | Consistent NAP |
| DAP-106 Doorway location pages | Thin city+service pages | Penalty; low value | Substantive local pages |
| DAP-107 Fake service areas | Overreaching areas served | Distrust | Honest service areas |

## Anti-Pattern Guarantees

- **DAP-G1** — Detection of any listed anti-pattern MUST fail discoverability review.
- **DAP-G2** — The Correct approach is the required fix; a cosmetic fix MUST NOT pass.
- **DAP-G3** — Cloaking, fabrication, and spam are never permitted (Constitution Article IV).
