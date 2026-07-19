# Page Structure

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the canonical content structure for each page type: its Purpose, Required sections, Recommended order, Tone, and Content expectations. Required sections per page type are canonical in `content.policy.yaml`. Section order and visual treatment coordinate with `experience/sections.md`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Canonical Page Structures

### PST-01 — Landing Page
- **Purpose:** Convert a targeted visitor on one offer.
- **Required sections:** Hero, social proof, benefits/features, how it works, proof (testimonials/case studies), FAQ, final CTA.
- **Order:** Hero → social proof → benefits → how it works → proof → FAQ → final CTA.
- **Tone:** Confident, benefit-led, warm.
- **Content expectations:** One offer, one primary CTA, real proof, objections handled.

### PST-02 — Corporate Site (Home)
- **Purpose:** Establish credibility and route visitors to the right section.
- **Required sections:** Hero, what we do, proof, key offerings, about summary, contact/CTA.
- **Order:** Hero → what we do → offerings → proof → about → contact.
- **Tone:** Credible, clear, professional.
- **Content expectations:** Clear positioning, real company info, navigable IA.

### PST-03 — Agency Site (Home)
- **Purpose:** Demonstrate capability and win inquiries.
- **Required sections:** Hero, services, selected work/case studies, process, proof, contact/CTA.
- **Order:** Hero → services → work → process → proof → contact.
- **Tone:** Confident, crafted, specific.
- **Content expectations:** Real case studies, clear services, distinct positioning.

### PST-04 — SaaS (Marketing Home)
- **Purpose:** Communicate the product's value and drive signup.
- **Required sections:** Hero, value proposition, features/benefits, how it works, pricing summary, proof, FAQ, CTA.
- **Order:** Hero → value → features → how it works → proof → pricing → FAQ → CTA.
- **Tone:** Clear, confident, helpful.
- **Content expectations:** Benefit-led, honest pricing link, real proof.

### PST-05 — Portfolio
- **Purpose:** Showcase work and convert to inquiries.
- **Required sections:** Hero/intro, selected work, about, contact.
- **Order:** Hero → work → about → contact.
- **Tone:** Distinct, confident, concise.
- **Content expectations:** Real projects, clear role/outcomes, minimal chrome.

### PST-06 — Dashboard (App Content)
- **Purpose:** Support task completion, not persuasion.
- **Required sections:** N/A (app surface); microcopy per `ux-writing.md`.
- **Order:** Task-driven.
- **Tone:** Clear, concise, calm.
- **Content expectations:** Actionable microcopy; empty/error/success states written.

### PST-07 — Blog (Article)
- **Purpose:** Educate and build authority.
- **Required sections:** Title (H1), intro, structured body (H2/H3), author, date, related links.
- **Order:** Title → intro → body → conclusion/CTA → author → related.
- **Tone:** Helpful, clear, credible.
- **Content expectations:** Substantive, original, well-structured, real author (`blog.md`).

### PST-08 — Documentation
- **Purpose:** Enable the reader to accomplish a task.
- **Required sections:** Title, overview, steps/reference, examples, related.
- **Order:** Title → overview → steps → examples → related.
- **Tone:** Precise, patient, thorough.
- **Content expectations:** Accurate, complete, scannable, current.

### PST-09 — Pricing Page
- **Purpose:** Enable an informed purchase decision.
- **Required sections:** Plans/tiers, what's included, one recommended plan, FAQ, CTA.
- **Order:** Plans → inclusions → recommended → FAQ → CTA.
- **Tone:** Transparent, plain, reassuring.
- **Content expectations:** Honest prices, no hidden costs, clear differences (`CVC-09`).

### PST-10 — About Page
- **Purpose:** Build trust through the story, people, and values.
- **Required sections:** Mission/story, values, team, proof, contact/CTA.
- **Order:** Story → values → team → proof → contact.
- **Tone:** Authentic, human, credible.
- **Content expectations:** Real people, honest story (`about-pages.md`).

### PST-11 — Service Page
- **Purpose:** Explain a service and convert.
- **Required sections:** What it is, who it's for, benefits, process, proof, pricing/CTA.
- **Order:** What → who → benefits → process → proof → CTA.
- **Tone:** Clear, specific, credible.
- **Content expectations:** Concrete scope, real outcomes (`services.md`).

### PST-12 — Contact Page
- **Purpose:** Make contacting effortless and trustworthy.
- **Required sections:** Contact methods, form, location/hours, response expectation.
- **Order:** Intro → methods → form → location.
- **Tone:** Welcoming, clear, brief.
- **Content expectations:** Real contact info, minimal form (`contact-pages.md`).

### PST-13 — FAQ
- **Purpose:** Resolve real objections and questions.
- **Required sections:** Grouped questions with concise answers.
- **Order:** Most-common first; grouped by topic.
- **Tone:** Direct, helpful, honest.
- **Content expectations:** Real questions, front-loaded answers (`faq.md`).

### PST-14 — Case Study
- **Purpose:** Prove outcomes with a real example.
- **Required sections:** Client/context, problem, solution, results (real numbers), quote/CTA.
- **Order:** Context → problem → solution → results → CTA.
- **Tone:** Factual, credible, specific.
- **Content expectations:** Real client (with permission), real results (`case-studies.md`).

---

## Page-Structure Rules

- **PST-15 — Required sections present.** A page of a given type MUST include its required sections; a page MUST NOT ship missing them.
- **PST-16 — Purposeful sections.** Every section MUST serve the page's purpose; filler sections MUST NOT be added (`experience` XP-P05).
- **PST-17 — Order by default.** The recommended order SHOULD be followed unless a recorded reason justifies a change.
- **PST-18 — Real content only.** Every section MUST contain real content; placeholder or fabricated sections MUST NOT be published (`CNP-21`, `trust-signals.md`).

## Page-Structure Guarantees

- **PST-G1** — Each page type has its required sections, in a purposeful order.
- **PST-G2** — Tone and content expectations match the page's purpose.
- **PST-G3** — Real content throughout; no filler or fabrication.
