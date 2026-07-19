# Discoverability Philosophy

**Framework:** CEF · **Specification:** AS-010 (Discoverability Engine) · **Version:** 0.1.0

**Purpose:** Establish the principles of discoverability. Search engines rank pages; language models understand information. Both require structure, context, authority, consistency, accuracy, and trust. These ~30 principles govern every discoverability decision.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

### DP-01 — Machines Understand Structure
Structure (semantics, headings, schema) is how machines parse meaning. Structure MUST precede styling.

### DP-02 — Entities Matter
Content MUST name and describe real entities (brands, products, people, places) consistently so systems can identify them.

### DP-03 — Context Beats Keywords
Meaning comes from context and relationships, not keyword repetition. Content MUST read naturally; keyword stuffing MUST NOT be used.

### DP-04 — Headings Communicate Hierarchy
Headings form the document outline. Exactly one `h1`; levels descend in order and MUST NOT be skipped.

### DP-05 — Metadata Should Be Descriptive
Title and description MUST accurately and specifically describe the page; generic or placeholder metadata MUST NOT ship.

### DP-06 — Links Create Understanding
Internal links express relationships and distribute authority. Descriptive links MUST connect related content.

### DP-07 — Schemas Explain Meaning
Structured data makes meaning machine-readable. Valid JSON-LD MUST describe the page's type and MUST match visible content.

### DP-08 — Every Page Has One Purpose
Each page MUST serve one clear purpose and topic; unfocused pages dilute understanding and discoverability.

### DP-09 — Semantics Are Signals
Semantic elements are discoverability signals, not decoration. Real semantics MUST be used over generic containers.

### DP-10 — Clarity Over Cleverness
Content MUST be clear and unambiguous; clever or vague phrasing harms both humans and machines.

### DP-11 — Consistency Builds Authority
Consistent naming, structure, and metadata across a site build authority; inconsistency erodes it.

### DP-12 — Accuracy Builds Trust
Every claim, title, and schema field MUST be accurate; misrepresentation destroys trust with users and systems.

### DP-13 — Answer Real Questions
Content SHOULD answer the questions users actually ask, in the words they use, front-loaded under clear headings.

### DP-14 — One Canonical Truth
Each piece of content MUST have Exactly one canonical URL; duplication without canonicalization confuses indexing.

### DP-15 — Crawlability Is a Prerequisite
Content that cannot be crawled cannot be discovered. Pages MUST be reachable and MUST NOT be accidentally blocked.

### DP-16 — Speed Is a Signal
Performance is a discoverability and ranking signal; slow pages MUST be brought within budget (Constitution Principle 13).

### DP-17 — Accessibility Is Discoverability
Accessible semantics (alt text, landmarks, labels) are also machine signals; accessibility and discoverability reinforce each other.

### DP-18 — Mobile Is the Index
Indexing is mobile-first; the mobile experience MUST contain the same content and structure as desktop.

### DP-19 — Structure Before Style
Discoverability depends on structure decided while building; it MUST NOT be retrofitted after visual design.

### DP-20 — Content Is the Product
Thin, empty, or duplicated content MUST NOT be published; substantive, original content is the basis of discovery.

### DP-21 — Internal Links Map the Site
A deliberate internal-linking structure maps the site for crawlers and users; orphan pages MUST NOT exist.

### DP-22 — Titles Are Promises
A title MUST accurately promise the page's content; clickbait or mismatched titles MUST NOT be used.

### DP-23 — Descriptions Earn the Click
A meta description SHOULD earn the click by summarizing value honestly; it MUST NOT mislead.

### DP-24 — Freshness Where It Matters
Time-sensitive content MUST expose accurate dates; stale content presented as current MUST NOT be used.

### DP-25 — Unique Over Duplicate
Titles, descriptions, and content MUST be unique per page; duplication across pages MUST NOT be used.

### DP-26 — Explicit Over Implicit
Robots directives, canonical URLs, and language MUST be explicit and intentional; implicit defaults MUST NOT be relied upon for critical signals.

### DP-27 — Terminology Consistency
Consistent terminology for the same concept supports retrieval; the same thing MUST NOT be named differently across pages without reason.

### DP-28 — Relationships Explain Concepts
Content MUST make relationships between concepts explicit (definitions, comparisons, hierarchies) so systems can connect them.

### DP-29 — Trust Signals Compound
Accurate metadata, valid schema, working links, HTTPS, and real content compound into trust; a few broken signals erode it.

### DP-30 — Machine and Human Parity
Machines MUST receive the same content humans do; cloaking or hidden divergent content MUST NOT be used.

## Philosophy Guarantees

- **DP-G1** — Content is structured, entity-rich, accurate, and unique.
- **DP-G2** — Metadata, canonical, and robots signals are explicit and honest.
- **DP-G3** — Machines and humans receive the same crawlable, accessible content.
