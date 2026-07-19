# Section Library

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Define the canonical marketing sections, each with its Purpose, Required content, Common mistakes, and Success criteria. Every section MUST serve one purpose (`principles.md` XP-P05). The canonical order is in `conversion.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

### SEC-01 — Hero
- **Purpose:** State the value proposition and drive the primary action within the first viewport.
- **Required content:** One benefit-led headline, one concise subhead, Exactly one primary CTA, optional supporting visual/proof.
- **Common mistakes:** Vague headline; multiple competing CTAs; decorative blob over the message; heavy media delaying LCP.
- **Success criteria:** A user understands the offer and the next step within seconds; one primary CTA; within performance budget.

### SEC-02 — Features
- **Purpose:** Explain what the product does, mapped to user needs.
- **Required content:** Real features with meaningful labels and, where useful, relevant visuals.
- **Common mistakes:** Three identical filler cards; generic icons; feature list with no benefit.
- **Success criteria:** Content-driven count; each feature ties to a benefit; scannable.

### SEC-03 — Benefits
- **Purpose:** Translate features into user outcomes.
- **Required content:** Concrete outcomes stated in the user's terms.
- **Common mistakes:** Restating features; vague value ("boost productivity") without specifics.
- **Success criteria:** Each benefit is specific and believable.

### SEC-04 — Process / How It Works
- **Purpose:** Show how the user gets value, step by step.
- **Required content:** A small number of clear, ordered steps.
- **Common mistakes:** Too many steps; unclear ordering; steps that are not actionable.
- **Success criteria:** The path to value is obvious and short.

### SEC-05 — Case Studies
- **Purpose:** Prove outcomes with real examples.
- **Required content:** Real client, real problem, real result (with permission).
- **Common mistakes:** Fabricated or vague results; no real numbers.
- **Success criteria:** Concrete, verifiable outcomes; real names/logos where permitted.

### SEC-06 — Testimonials / Social Proof
- **Purpose:** Build trust through authentic endorsement.
- **Required content:** Real quotes with attribution; real logos or metrics.
- **Common mistakes:** Fabricated testimonials; anonymous or generic praise; fake counts.
- **Success criteria:** Authentic, attributed proof; nothing invented (`trust.md`).

### SEC-07 — Pricing
- **Purpose:** Present plans so comparison and choice are effortless.
- **Required content:** Clear tiers, honest prices, what each includes, one recommended plan.
- **Common mistakes:** Hidden costs; too many tiers; unclear differences; fake urgency.
- **Success criteria:** Transparent, comparable pricing; one clear recommended path.

### SEC-08 — FAQ
- **Purpose:** Resolve objections and answer real questions.
- **Required content:** Real questions with concise, honest answers; question-shaped headings.
- **Common mistakes:** Marketing fluff disguised as questions; burying answers.
- **Success criteria:** Real objections addressed; answers front-loaded; `FAQPage` structure where applicable.

### SEC-09 — CTA (Conversion)
- **Purpose:** Present the primary action at the decision point.
- **Required content:** One primary CTA with a benefit-led, verb-led label; minimal distraction.
- **Common mistakes:** Weak or generic label; competing actions; fake urgency.
- **Success criteria:** Exactly one primary action; clear value of acting now (honest).

### SEC-10 — Footer
- **Purpose:** Provide navigation, legal, and trust closure.
- **Required content:** Grouped navigation, legal links (privacy, terms), contact, real company info.
- **Common mistakes:** Flat unlabeled link dump; missing legal links; broken links.
- **Success criteria:** Organized, complete, accessible; required legal present (`trust.md`).

## Section Guarantees

- **SEC-G1** — Every section serves one purpose with real content.
- **SEC-G2** — One primary action per conversion section; no fabricated proof.
- **SEC-G3** — Sections follow the canonical order for the page type.
