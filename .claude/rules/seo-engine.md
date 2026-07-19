# SEO Engine

**Framework:** CEF · **Specification:** AS-002 (Rule Engine) · **Version:** 0.1.0

**Purpose:** Guarantee that Every public page is discoverable by search engines and citable by AI answer engines. SEO is Never optional and Never a later pass. This engine enforces the SEO and AI-SEO standards deterministically.

**Rule format:** Rule Name, Purpose, Trigger, Conditions, Decision, Actions, Expected Output, Example.

**Global rule:** Every public page Must satisfy SE-01 through SE-13. A page that fails any of them is Never marked done.

---

### SE-01 — Page Metadata Is Mandatory
**Purpose:** Give every page a unique title and description.
**Trigger:** When a public page is created or changed.
**Conditions:** If the page is indexable.
**Decision:** Every page Must define a unique `title` (≤ 60 chars) and meta description (≤ 160 chars). Never reuse a title across pages. Never leave either empty.
**Actions:** 1. Author a unique title and description. 2. Wire them through the framework metadata API.
**Expected Output:** Unique, present metadata on the page.
**Example:** `/pricing` → title "Pricing — Acme", description of the plans.

### SE-02 — Canonical URL Is Mandatory
**Purpose:** Prevent duplicate-content ambiguity.
**Trigger:** When a page renders at a URL.
**Conditions:** If the content is reachable by any path.
**Decision:** Every page Must declare Exactly one canonical URL. Never omit it. Never point canonical at a different page's content.
**Actions:** 1. Set the canonical to the page's preferred absolute URL. 2. Verify it self-references unless intentionally consolidating.
**Expected Output:** One authoritative URL per page.
**Example:** `/blog/post` canonical is `https://site.com/blog/post`.

### SE-03 — JSON-LD Structured Data Is Mandatory
**Purpose:** Make page meaning machine-readable.
**Trigger:** When a page has a recognizable type.
**Conditions:** If the page is an Article, Product, Organization, BreadcrumbList, FAQ, or similar.
**Decision:** Every page Must emit valid JSON-LD for its type. Never emit JSON-LD that misrepresents the visible content.
**Actions:** 1. Select the schema.org type. 2. Emit valid JSON-LD matching visible content.
**Expected Output:** Valid, truthful structured data.
**Example:** A blog post emits `Article` JSON-LD with headline, author, and dates.

### SE-04 — Open Graph Is Mandatory
**Purpose:** Control how pages appear when shared.
**Trigger:** When a page can be shared.
**Conditions:** If the page is public.
**Decision:** Every page Must define `og:title`, `og:description`, `og:type`, `og:url`, and `og:image`. Never ship without an OG image.
**Actions:** 1. Set OG tags. 2. Provide a correctly sized OG image (1200×630).
**Expected Output:** Correct social preview.
**Example:** Sharing `/` shows the brand OG card.

### SE-05 — Twitter Cards Are Mandatory
**Purpose:** Control appearance on Twitter/X.
**Trigger:** When a page can be shared to Twitter/X.
**Conditions:** If the page is public.
**Decision:** Every page Must define `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`. Use `summary_large_image` When a hero image exists.
**Actions:** 1. Set Twitter tags. 2. Reuse the OG image unless a Twitter-specific one is provided.
**Expected Output:** Correct Twitter preview.
**Example:** A landing page uses `summary_large_image`.

### SE-06 — Semantic Headings Are Mandatory
**Purpose:** Give pages a correct document outline.
**Trigger:** When headings are placed.
**Conditions:** If the page has sections.
**Decision:** Every page Must have Exactly one `h1`, with heading levels descending in order and Never skipped. Never use headings for styling.
**Actions:** 1. Assign one `h1`. 2. Nest `h2`–`h6` in order.
**Expected Output:** A valid heading outline.
**Example:** `h1` page title → `h2` sections → `h3` subsections.

### SE-07 — Internal Links Are Mandatory
**Purpose:** Distribute link equity and aid crawling.
**Trigger:** When a page is authored.
**Conditions:** If related pages exist.
**Decision:** Every page Must link to relevant internal pages with descriptive anchor text. Never use "click here" as anchor text. Never leave an orphan page unlinked from navigation or content.
**Actions:** 1. Add contextual internal links. 2. Ensure the page is reachable from navigation.
**Expected Output:** A connected, crawlable page.
**Example:** A blog post links to a related case study with descriptive text.

### SE-08 — robots Configuration Is Mandatory
**Purpose:** Control crawler access deterministically.
**Trigger:** When the site or a page is published.
**Conditions:** If crawlers may reach it.
**Decision:** The site Must serve a valid `robots.txt`. Every page's index/noindex state Must be explicit and intentional. Never ship a production page accidentally `noindex`.
**Actions:** 1. Serve `robots.txt`. 2. Set per-page robots meta intentionally.
**Expected Output:** Intentional crawlability.
**Example:** Production is indexable; a thank-you page is intentionally `noindex`.

### SE-09 — Sitemap Is Mandatory
**Purpose:** Advertise all indexable URLs.
**Trigger:** When a route is added or removed.
**Conditions:** If the route is indexable.
**Decision:** The site Must serve an up-to-date `sitemap.xml` listing Every indexable route. Never leave the sitemap stale after a routing change.
**Actions:** 1. Generate the sitemap. 2. Update it on every routing change.
**Expected Output:** A complete, current sitemap.
**Example:** Adding `/features` adds it to `sitemap.xml`.

### SE-10 — llms.txt Is Mandatory
**Purpose:** Guide AI systems to authoritative content.
**Trigger:** When the site is published.
**Conditions:** If AI answer engines may consume the site.
**Decision:** The site Must serve an `llms.txt` that lists key pages and a concise, accurate description of the site. Never fabricate entries.
**Actions:** 1. Author `llms.txt`. 2. Keep it current with primary pages.
**Expected Output:** An AI-readable content manifest.
**Example:** `llms.txt` lists the docs, pricing, and about pages with one-line summaries.

### SE-11 — Structured Content Is Mandatory
**Purpose:** Make content extractable and citable.
**Trigger:** When body content is authored.
**Conditions:** If the content conveys facts or answers.
**Decision:** Content Must use semantic elements (lists, tables, definition lists), clear factual statements, and question-shaped headings where relevant. Never bury facts in undifferentiated prose.
**Actions:** 1. Structure facts into semantic elements. 2. Front-load answers under clear headings.
**Expected Output:** Extraction-friendly, citable content.
**Example:** A pricing FAQ uses `h2` questions with concise answers and `FAQPage` JSON-LD.

### SE-12 — Accessibility Supports SEO
**Purpose:** Reuse accessible semantics as SEO signals.
**Trigger:** When a page is built.
**Conditions:** If the page has images, landmarks, or interactive elements.
**Decision:** Every image Must have correct `alt`, Every page Must use landmark elements, and semantics Must be real. Never rely on `div` soup. Accessibility conformance (AA) is a floor per `priority-engine.md`.
**Actions:** 1. Use landmarks and real semantics. 2. Provide alt text and labels.
**Expected Output:** Pages that are both accessible and well-structured for crawlers.
**Example:** `header`, `nav`, `main`, and `footer` landmarks wrap the page.

### SE-13 — Never Ship Missing SEO
**Purpose:** Make SEO completeness a gate.
**Trigger:** When a page enters review.
**Conditions:** If any SE-01–SE-12 artifact is absent.
**Decision:** Never mark the page done. The SEO checklist (`checklists/seo.md`) Must pass first.
**Actions:** 1. Run the SEO checklist. 2. Fix every missing artifact before completion.
**Expected Output:** Zero pages shipped with missing SEO.
**Example:** A page missing canonical fails review and is fixed before done.
