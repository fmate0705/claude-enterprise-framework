# Tool Engine

**Framework:** CEF · **Specification:** AS-002 (Rule Engine) · **Version:** 0.1.0

**Purpose:** Make tool and skill selection deterministic. Claude Never randomly chooses an instrument. Every trigger has Exactly one designated instrument; the same need Always routes to the same tool. This engine implements Article VII of the Constitution.

**Rule format:** Rule Name, Purpose, Trigger, Conditions, Decision, Actions, Expected Output, Example.

---

## Master Routing Table

| Need | Instrument |
|---|---|
| Visual hierarchy | Taste Skill |
| Layout composition | Frontend Design Skill |
| Interaction polish | Emil Frontend Design Skill |
| Animation | Emil Motion Skill |
| UX validation | UI/UX Pro Max |
| Metadata | SEO Skill |
| Next.js metadata | Next.js SEO |
| Browser validation | Chrome DevTools MCP |
| Branded images | Higgsfield MCP |
| Premium UI inspiration | Search shadcn/ui → Magic UI → Aceternity UI |

---

### TE-01 — Visual Hierarchy Routes to Taste Skill
**Purpose:** Route hierarchy and refinement decisions to one instrument.
**Trigger:** When visual hierarchy, emphasis, or taste refinement is needed.
**Conditions:** If the work decides what the eye sees first and how emphasis is ordered.
**Decision:** Always use the **Taste Skill**. Never improvise hierarchy.
**Actions:** 1. Invoke the Taste Skill. 2. Apply its hierarchy decisions to the design tokens.
**Expected Output:** A clear, ordered visual hierarchy.
**Example:** Choosing what dominates a hero routes to the Taste Skill.

### TE-02 — Layout Composition Routes to Frontend Design Skill
**Purpose:** Route page and section composition to one instrument.
**Trigger:** When a layout or composition is created.
**Conditions:** If elements must be arranged into a page or section.
**Decision:** Always use the **Frontend Design Skill**.
**Actions:** 1. Invoke the Frontend Design Skill. 2. Compose using design-system primitives.
**Expected Output:** A composed, on-system layout.
**Example:** Arranging a features section routes to the Frontend Design Skill.

### TE-03 — Interaction Polish Routes to Emil Frontend Design Skill
**Purpose:** Route premium interaction detail to one instrument.
**Trigger:** When high-craft interaction detail is required.
**Conditions:** If states, transitions, and micro-detail must feel premium.
**Decision:** Always use the **Emil Frontend Design Skill**.
**Actions:** 1. Invoke the Emil Frontend Design Skill. 2. Apply within the performance budget.
**Expected Output:** Premium, budget-safe interaction detail.
**Example:** Refining hover and press states routes here.

### TE-04 — Animation Routes to Emil Motion Skill
**Purpose:** Route motion decisions to one instrument.
**Trigger:** When an animation is designed.
**Conditions:** If motion is admitted by DE-ANIM.
**Decision:** Always use the **Emil Motion Skill**. Never author motion ad hoc.
**Actions:** 1. Confirm DE-ANIM admits the motion. 2. Invoke the Emil Motion Skill. 3. Honor `prefers-reduced-motion`.
**Expected Output:** Purposeful, reduced-motion-safe animation.
**Example:** A page-transition choreography routes to the Emil Motion Skill.

### TE-05 — UX Validation Routes to UI/UX Pro Max
**Purpose:** Route flow and interaction validation to one instrument.
**Trigger:** When a UX decision or validation is required.
**Conditions:** If flow, structure, or interaction correctness is in question.
**Decision:** Always use **UI/UX Pro Max**.
**Actions:** 1. Invoke UI/UX Pro Max. 2. Apply its findings before implementation proceeds.
**Expected Output:** A validated flow.
**Example:** Validating a checkout flow routes here.

### TE-06 — Metadata Routes to SEO Skill
**Purpose:** Route metadata authoring to one instrument.
**Trigger:** When metadata or structured data is authored.
**Conditions:** If a page needs title, description, canonical, or JSON-LD.
**Decision:** Always use the **SEO Skill**.
**Actions:** 1. Invoke the SEO Skill. 2. Produce metadata per `seo-engine.md`.
**Expected Output:** Complete, valid metadata.
**Example:** Authoring Open Graph tags routes to the SEO Skill.

### TE-07 — Next.js Metadata Routes to Next.js SEO
**Purpose:** Route framework-level metadata to one instrument.
**Trigger:** When metadata is implemented in Next.js.
**Conditions:** If the Next.js Metadata API or route metadata is used.
**Decision:** Always use **Next.js SEO** for the implementation, guided by the SEO Skill's content.
**Actions:** 1. Invoke Next.js SEO. 2. Implement the metadata objects and generators.
**Expected Output:** Correct Next.js metadata wiring.
**Example:** Implementing `generateMetadata` routes here.

### TE-08 — Browser Validation Routes to Chrome DevTools MCP
**Purpose:** Route runtime and responsive verification to one instrument.
**Trigger:** When browser behavior or responsive layout must be verified.
**Conditions:** If rendered output must be inspected at real viewports.
**Decision:** Always use the **Chrome DevTools MCP**. Never assert browser correctness without inspection.
**Actions:** 1. Invoke the Chrome DevTools MCP. 2. Verify layout at mobile, tablet, and desktop.
**Expected Output:** Verified runtime and responsive behavior.
**Example:** Confirming a grid reflow on mobile routes here.

### TE-09 — Branded Images Route to Higgsfield MCP
**Purpose:** Route bespoke brand imagery to one instrument.
**Trigger:** When brand-specific or bespoke imagery is required.
**Conditions:** If a required visual asset must be generated to brand.
**Decision:** Always use the **Higgsfield MCP**. Never substitute random stock for a required brand asset.
**Actions:** 1. Invoke the Higgsfield MCP with brand direction from `memory/branding.md`. 2. Produce the asset.
**Expected Output:** On-brand imagery.
**Example:** Generating a branded hero visual routes here.

### TE-10 — UI Inspiration Routes to the Component Search Order
**Purpose:** Route pattern discovery to one deterministic search order.
**Trigger:** When premium UI inspiration or a proven pattern is needed.
**Conditions:** If a component pattern should be referenced.
**Decision:** Always search in order: **shadcn/ui → Magic UI → Aceternity UI**. Never paste a found component verbatim; Always conform it to the design system and the UI standard.
**Actions:** 1. Search shadcn/ui first, then Magic UI, then Aceternity UI. 2. Adapt the pattern to tokens and standards.
**Expected Output:** An on-system component informed by proven patterns.
**Example:** A pricing table pattern is taken from shadcn/ui and re-tokenized.

### TE-11 — Never Skip Tool Selection
**Purpose:** Forbid ad hoc or skipped tooling.
**Trigger:** When any trigger in the Master Routing Table is present.
**Conditions:** If the described need occurs, regardless of phrasing.
**Decision:** Always route to the designated instrument. Never skip selection and Never substitute by preference.
**Actions:** 1. Detect the trigger from intent. 2. Route to its instrument.
**Expected Output:** Deterministic tooling on every triggered need.
**Example:** "Make the hero look better" is detected as a hierarchy trigger → Taste Skill.

### TE-12 — Fallback When an Instrument Is Unavailable
**Purpose:** Preserve the purpose when the preferred instrument is absent.
**Trigger:** When a designated instrument is unavailable in the environment.
**Conditions:** If the instrument cannot be invoked.
**Decision:** Never skip the step. Always state the instrument is unavailable, use the most capable available equivalent, and record the substitution when it affects the outcome.
**Actions:** 1. State the unavailability. 2. Use the best available equivalent. 3. Record in `memory/decisions.md` if outcome-affecting.
**Expected Output:** The trigger's purpose served despite the missing tool.
**Example:** With no Chrome DevTools MCP, responsive checks use the available browser preview, and the substitution is noted.
