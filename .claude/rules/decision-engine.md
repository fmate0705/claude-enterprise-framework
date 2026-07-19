# Decision Engine

**Framework:** CEF · **Specification:** AS-002 (Rule Engine) · **Version:** 0.1.0

**Purpose:** Convert recurring engineering questions into deterministic decision trees. For Every category below, the same trigger under the same conditions Always produces the same decision. This engine removes improvisation from routine choices.

**Rule format:** Rule Name, Purpose, Trigger, Conditions, Decision, Actions, Expected Output, Example. The Decision or Actions field carries the decision tree.

**Categories covered:** Layout, Typography, Spacing, Components, Animations, Architecture, Routing, SEO, Images, Deployment, Review.

---

### DE-LAYOUT — Layout Selection
**Purpose:** Pick a layout deterministically from page type and viewport.
**Trigger:** When a page or section layout is chosen.
**Conditions:** If a page type and target viewport are known.
**Decision:** Select layout by type:
- If landing/marketing → spacious, single-column narrative with generous section padding.
- Else if dashboard/admin → dense, grid-based, information-first.
- Else if content/article → single measure column, 60–75ch line length.
- Else if application shell → persistent navigation plus routed content region.
**Actions:**
1. Classify the page type.
2. Apply the matching layout primitive from the design system.
3. Apply responsive rules (see `design-engine.md`).
**Expected Output:** A layout matched to purpose and viewport.
**Example:** A pricing page is classified marketing → spacious single-column with `py-24` sections.

### DE-TYPO — Typography Selection
**Purpose:** Choose type roles from the scale, never ad hoc.
**Trigger:** When text is placed.
**Conditions:** If a text role (display, heading, body, caption, label) applies.
**Decision:** Always map the role to a scale token. Never invent a size outside the scale. Body text is Only ever one base size per surface.
**Actions:**
1. Identify the text role.
2. Apply the matching type token (family, size, weight, line-height, tracking).
3. Enforce one `h1` per page and sequential heading levels.
**Expected Output:** Text that reads from a single type system.
**Example:** A section title maps to `heading-lg`; its paragraph maps to `body-md`.

### DE-SPACING — Spacing Selection
**Purpose:** Keep all spacing on one scale.
**Trigger:** When margin, padding, or gap is set.
**Conditions:** If a spatial value is required.
**Decision:** Always use a spacing-scale token (base 4px or 8px). Never use an off-scale pixel literal. Related elements use smaller steps; unrelated groups use larger steps.
**Actions:**
1. Choose the nearest scale token that expresses the intended grouping.
2. Apply proximity: tighter within a group, looser between groups.
**Expected Output:** Consistent rhythm across the surface.
**Example:** Card title-to-body gap is `space-2`; card-to-card gap is `space-6`.

### DE-COMPONENT — Component Reuse or Creation
**Purpose:** Prevent duplicate components.
**Trigger:** When a UI element is needed.
**Conditions:** If an existing component or variant could serve.
**Decision:**
- If an existing component matches → reuse it.
- Else if an existing component matches with a new variant → extend it with a variant.
- Else → create one new reusable component with defined props and states.
**Actions:**
1. Search the component inventory before building.
2. Reuse or extend before creating.
3. Give any new component all interaction states (default, hover, focus, active, disabled, loading, error).
**Expected Output:** One canonical component per pattern.
**Example:** A "ghost" button need adds a `variant="ghost"` to `Button`, not a new component.

### DE-ANIM — Animation Admission
**Purpose:** Admit motion Only when it communicates.
**Trigger:** When an animation is proposed.
**Conditions:** If the motion does or does not convey state, hierarchy, or continuity.
**Decision:**
- If motion communicates state/hierarchy/continuity AND stays within the performance budget → allow it, duration ≤ 300ms, standard easing.
- Else → Never add it.
- Always honor `prefers-reduced-motion` by reducing or removing non-essential motion.
**Actions:**
1. State what the motion communicates.
2. Verify budget and reduced-motion behavior.
**Expected Output:** Purposeful, budget-safe, reduced-motion-safe motion Only.
**Example:** A dropdown fades/scales in 150ms; a purely decorative background loop is rejected.

### DE-ARCH — Architecture Decision
**Purpose:** Choose structure deterministically and consult memory first.
**Trigger:** When an architectural choice is made.
**Conditions:** If the choice affects structure, data flow, or boundaries.
**Decision:** Always read `memory/architecture.md` and `memory/decisions.md` first. Then apply Constitution Principles 5, 7, 9, 21: simplest sufficient design, single responsibility, server-first, focused modules. Never contradict recorded architecture without a recorded reason.
**Actions:**
1. Read architecture memory.
2. Choose the simplest structure meeting the requirement.
3. Record significant decisions.
**Expected Output:** Architecture consistent with memory and principles.
**Example:** Data fetching is placed in a Server Component per the recorded server-first decision.

### DE-ROUTING — Routing Decision
**Purpose:** Make routing predictable.
**Trigger:** When a route is added or changed.
**Conditions:** If a URL must be created or altered.
**Decision:** Always use lowercase, hyphenated, semantic path segments. Every route Must define its metadata (see DE-SEO and `seo-engine.md`). Never create a route without a canonical URL. Dynamic segments Only where content is parameterized.
**Actions:**
1. Name the route semantically.
2. Attach metadata and canonical URL.
3. Add the route to the sitemap.
**Expected Output:** A discoverable, well-named route.
**Example:** `/case-studies/acme` is created with metadata, canonical, and a sitemap entry.

### DE-SEO — New Page SEO Flow
**Purpose:** Guarantee SEO completeness on Every new page.
**Trigger:** When a new page is created.
**Conditions:** If a page is public.
**Decision:** Always execute this flow in order before continuing implementation:
Create page metadata → Check sitemap → Check robots → Generate structured data (JSON-LD) → Generate Open Graph → Generate canonical URL → Continue implementation.
**Actions:**
1. Author `title`, description, and canonical.
2. Add the page to the sitemap; verify robots allows it.
3. Add JSON-LD for the page type and Open Graph/Twitter tags.
**Expected Output:** A page that is fully indexable and shareable at creation.
**Example:** A new blog post ships with Article JSON-LD, OG tags, canonical, and a sitemap entry. See `seo-engine.md`.

### DE-IMAGES — Image Decision
**Purpose:** Keep images fast, correct, and accessible.
**Trigger:** When an image is added.
**Conditions:** If the image is content or decoration.
**Decision:** Always serve AVIF/WebP with fallback, set explicit width and height, and provide responsive `sizes`. Lazy-load below the fold; mark the LCP image high priority. If content → meaningful `alt`. Else if decorative → empty `alt`. Never ship an unsized or oversized image.
**Actions:**
1. Convert and size the asset.
2. Set dimensions, `sizes`, loading priority, and `alt`.
**Expected Output:** Fast, non-shifting, accessible images.
**Example:** A hero image is AVIF, sized, `priority`, with descriptive `alt`.

### DE-DEPLOY — Deployment Decision
**Purpose:** Make releases safe and reversible.
**Trigger:** When a release is prepared.
**Conditions:** If code is going to a shared environment.
**Decision:** Always pass `checklists/deployment.md` first. Never deploy without a reproducible build, configured secrets, health checks, and a tested rollback. Promote Only in order preview → staging → production.
**Actions:**
1. Run the deployment checklist.
2. Build an immutable, versioned artifact.
3. Verify health, then record the release in `memory/deployment.md`.
**Expected Output:** A verified, reversible production release.
**Example:** A build promoted to production after staging verification, with rollback ready.

### DE-REVIEW — Review Entry Decision
**Purpose:** Route Every completed unit into review.
**Trigger:** When a feature or page is reported build-complete.
**Conditions:** If code is written and believed done.
**Decision:** Always enter the review sequence before calling anything done (see `review-engine.md`). Never mark work complete before review passes.
**Actions:**
1. Enter the review sequence.
2. Resolve blockers and majors.
**Expected Output:** No "done" without a passed review.
**Example:** A finished form enters review; a focus-order blocker is fixed before completion.
