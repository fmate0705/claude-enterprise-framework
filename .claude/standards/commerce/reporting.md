# Reporting

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define operational and financial reporting. `analytics.md` defines what metrics mean; this file defines how reports are produced, secured, and trusted.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`metrics`), `orders.policy.yaml`.

---

## Source of Truth

- **REP-01 — Orders are the ledger.** Financial reports MUST derive from order and payment records, never from client analytics (`ANA-21`).
- **REP-02 — Reproducible.** A report MUST be reproducible: the same period MUST produce the same figures on re-run. A report that changes on re-run cannot be audited, and it cannot be defended.
- **REP-03 — Point-in-time is stated.** Where a report reflects a moment, the moment MUST be stated. Orders transition; a report run today over last month may differ from one run then, and that MUST be explicable.
- **REP-04 — Snapshots, not recomputation.** Historical reports MUST use order snapshots, never current catalog or tax values (`ORD-03`, `INV-03`).
- **REP-05 — Reconciled with the provider.** Financial reporting MUST reconcile against provider settlements (`PAY-37`).

## Content

- **REP-06 — Period and time zone are explicit.** Every report MUST state its period and time zone. "January" in two time zones is two different months of revenue.
- **REP-07 — Currency and basis are explicit.** (`CUR-19`.)
- **REP-08 — Definitions accompany figures.** Metric definitions MUST be discoverable from the report (`ANA-01`).
- **REP-09 — Exclusions are stated.** Test orders and other exclusions MUST be stated (`ANA-05`).
- **REP-10 — Refunds and disputes are visible.** Revenue reporting MUST show refunds and disputes, not only gross (`ANA-08`).
- **REP-11 — Empty periods render.** A period with no data MUST render an honest empty state, never a blank or a zero indistinguishable from a failure (`D-083`).
- **REP-12 — Partial data is labeled.** An incomplete period MUST be labeled incomplete. An in-progress day compared against complete days manufactures a decline that is not real.

## Access

- **REP-13 — Authorized.** Reports MUST be authorized. Reporting aggregates the most sensitive data in the system into one place (`AZ-12`).
- **REP-14 — Least privilege.** Access MUST be scoped to what the role requires (`AZ-02`).
- **REP-15 — Access is audited.** Report and export access MUST be audited (`AL-03`, `AL-06`).
- **REP-16 — Exports carry their class.** An exported report retains the class of its data (`DC-15`). A spreadsheet of customer orders on a laptop is Confidential data outside your controls.
- **REP-17 — Personal data is minimized.** Reports SHOULD aggregate rather than list individuals unless the purpose requires it (`PRV-03`).
- **REP-18 — Bulk export is a signal.** Bulk export MUST be audited and SHOULD alert (`AL-06`). It is the signature of both a legitimate report and exfiltration.

## Performance

- **REP-19 — Bounded cost.** Report queries MUST be bounded (`API-19`). An unbounded report over all orders is a denial-of-service primitive against your own database.
- **REP-20 — Not against the transactional path.** Heavy reporting SHOULD NOT contend with checkout. A report MUST NOT be able to slow a purchase.
- **REP-21 — Long reports are asynchronous.** Long-running reports MUST run out-of-band and notify on completion, never block a request (`E-029`).
- **REP-22 — Paginated.** (`API-18`.)

## Presentation

- **REP-23 — Accessible.** Charts and tables MUST be accessible: data reachable in text or table form, never conveyed by colour alone (`D-038`, `D-069`).
- **REP-24 — Honest axes.** Visualizations MUST NOT distort. A truncated axis that turns a 2% change into a cliff is a misleading claim (`AP-013`).
- **REP-25 — Figures are attributable.** Every figure MUST be traceable to its source records. A number nobody can trace is a number nobody should act on.

## Retention

- **REP-26 — Report data follows retention.** (`PRV-11`.) Reporting stores are not exempt from the retention schedule; they are frequently the place it is forgotten.
- **REP-27 — Financial records follow their obligation.** (`TAX-19`.) Conflicts with erasure escalate to counsel (`LEG-19`).

## Verification

The commerce gate verifies reports derive from order records, are reproducible, state period, time zone, currency, and exclusions, label partial data, are authorized and audited, bound their query cost, do not contend with checkout, and are accessible.
