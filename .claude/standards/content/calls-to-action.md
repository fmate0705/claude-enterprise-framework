# Calls to Action

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix CTA copy. A CTA MUST make the next action and its value clear. This is the copy standard for CTAs; the visual/hierarchy rules are in `experience/cta.md`, and the two MUST NOT conflict. CTA requirements are canonical in `content.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## CTA Copy Rules

- **CCT-01 — Verb-led.** CTA copy MUST start with a verb ("Get the report", "Start free"); "Submit"/"Click here" MUST NOT be used.
- **CCT-02 — Value-clear.** The CTA MUST make the outcome or value clear; a bare "Continue" without context SHOULD be avoided where value can be stated.
- **CCT-03 — One primary per view.** Copy MUST support Exactly one primary CTA per view; competing equal CTAs MUST NOT be written (`experience/cta.md` CTA-01).
- **CCT-04 — Specific over generic.** CTA text MUST be specific to the action ("Book a demo", not "Learn more") where a specific action exists.
- **CCT-05 — Reduce risk.** Supporting microcopy near the CTA SHOULD reduce risk honestly ("No credit card required", "Cancel anytime"); false reassurance MUST NOT be used.
- **CCT-06 — Consistent labels.** The same action MUST use the same CTA wording across the site (`CNP-19`).
- **CCT-07 — Honest.** A CTA MUST NOT promise more than the next step delivers (clicking "Start free" MUST actually start something free).
- **CCT-08 — Match intent.** CTA copy MUST match the reader's stage (a first-touch page CTA differs from a checkout CTA).
- **CCT-09 — Accessible.** CTA copy MUST be meaningful out of context for screen readers; icon-only CTAs MUST carry an accessible label (`ux-writing.md` UXW-16).
- **CCT-10 — No dark patterns.** CTA and its decline option MUST be honest; shaming decline text ("No, I don't want to save money") MUST NOT be used.

## CTA Guarantees

- **CCT-G1** — Verb-led, value-clear, specific CTA copy.
- **CCT-G2** — One primary CTA per view; consistent, honest labels.
- **CCT-G3** — Accessible; no dark patterns.
