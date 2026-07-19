# Commerce Engine Validation

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define the checks that prove this engine is internally sound and that a commerce project satisfies it. `review.md` validates the *project*; this file validates the *engine* and the hard gates that admit no judgment.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Hard Gates

These MUST pass. They admit no waiver.

- **CV-01 — Checkout is deterministic.** The flow MUST follow `checkout.policy.flow` in order. A step MUST NOT be reordered, and MUST NOT be skipped except where inapplicable and declared (`CHK-01`, `CHK-02`).
- **CV-02 — Workflows are complete.** Every workflow MUST reach a terminal state: checkout to confirmation and order creation; orders to a terminal state; returns to refunded or rejected; subscriptions to cancelled or expired. A workflow with no terminal state is incomplete (`CV-06`).
- **CV-03 — Money is never floating point.** No float arithmetic on money anywhere (`PRC-02`). This is the engine's most consequential technical gate.
- **CV-04 — No duplicate-charge path.** Every charge carries a stable idempotency key (`PAY-15`, `PAY-16`).
- **CV-05 — Never a charge without an order, or an order without a charge.** Both MUST be prevented and detected by reconciliation (`CHK-25`, `PAY-38`).
- **CV-06 — Every declared state is reachable and every terminal state terminates.** No orphan states; no transition outside `orders.policy.transitions` (`ORD-10`).
- **CV-07 — Payment integrations follow the documented pattern.** Provider isolated behind a typed interface, no leaked types, no raw card data, verified idempotent webhooks, fulfilment on verified confirmation only (`payments.md`).
- **CV-08 — Required legal notices exist.** Terms of Sale, refund policy, shipping policy, and privacy policy MUST exist and be reachable before purchase, each carrying the mandatory disclaimer (`CLG-03`, `CLG-05`, `CLG-25`).
- **CV-09 — Guest checkout works.** A purchase MUST complete without an account (`GST-01`).
- **CV-10 — No cost after payment.** The final itemized total MUST precede payment (`CHK-17`).

## Engine Consistency

- **CV-11 — Single source of truth.** Every canonical value MUST live in exactly one policy. A value restated in a second policy or hard-coded in a document is a defect (`COM-06`, `XV-12`).
- **CV-12 — Policies match documentation.** Every rule referencing a canonical value MUST reference it, never restate it. Drift is a defect.
- **CV-13 — No duplicated ownership.** No topic MUST be owned by two engines. Where this engine touches another's domain, the boundary MUST be stated explicitly (`overview.md`; `KV-05`). Specifically: authentication defers to M-SEC (`CAU-01`); currency formatting to `localization.policy`; analytics collection to `operations/analytics.md`; product copy to `content/products.md`; CTA rules to `conversion.policy`; legal content to `content/legal-pages.md`.
- **CV-14 — Cross-references resolve.** Every referenced file, rule ID, and policy key MUST exist.
- **CV-15 — No contradictions.** No rule MUST contradict another, the Constitution, or a higher-priority engine. A conflict MUST be named and resolved by precedence, never silently.
- **CV-16 — RFC-2119 throughout.** Hedging verbs MUST NOT appear.
- **CV-17 — Anti-patterns are complete.** `anti-patterns.md` MUST carry at least 100 entries, each stating problem, business impact, and recommended solution.
- **CV-18 — Every document is substantive.** No placeholders, no lorem ipsum, no empty sections (Article IV).

## Alignment

- **CV-19 — Provider-agnostic.** No document MUST mandate a provider or embed provider-specific implementation as the standard. Named providers MUST appear only as examples deferring to their official documentation (`PAY-01`, `PAY-06`).
- **CV-20 — No embedded rates.** Tax rates, exchange rates, and carrier rate tables MUST NOT be embedded (`TAX-01`, `CUR-13`, `SHP-08`). Each is wrong the moment it changes, and silently.
- **CV-21 — No legal conclusions.** No document MUST state a legal conclusion, assert applicability, or set a legally operative deadline (`LEG-02`, `LEG-03`).
- **CV-22 — No speculative recommendations.** Guidance MUST rest on durable architecture, not on a trend or an unverified claim.

## Project Validation

Executed at the gate (`review.md`):

- **CV-23 — Every review area is resolved.** All ten checked; a not-applicable area carries a recorded reason (`CRV-05`).
- **CV-24 — Live verification occurred.** Checkout MUST be completed in a real browser across breakpoints with the Chrome DevTools MCP (`CRV-04`, TE-08).
- **CV-25 — The unhappy path was exercised.** Declines, timeouts, stock races, duplicate webhooks, and expired reservations MUST be tested (`CRV-09`, `INT-25`).
- **CV-26 — No open finding of consequence.** (`CRV-02`.)
- **CV-27 — Decisions are recorded.** Provider selections, tax treatment, discount stacking, and every waiver MUST be in `memory/decisions.md` (`ME-07`).
- **CV-28 — Reconciliation is active.** (`PAY-37`.)

## Reporting

- **CV-29 — Report honestly.** Each check as pass or fail with evidence. A single fail is a fail (Article XI).
- **CV-30 — Never claim compliance.** A passed validation MUST NOT be reported as legal compliance or as proof the system is secure. It reports that these checks, at this scope, at this time, passed (`CRV-11`).
