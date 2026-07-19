# Product Variants

**Framework:** CEF · **Specification:** AS-017 (Commerce Platform Engine) · **Version:** 2.0.0 · **Module:** M-COMMERCE

**Purpose:** Define option axes and variants. The variant is what the customer actually buys; modeling it as an afterthought of the product is the origin of most catalog defects.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `commerce.policy.yaml` (`variants`).

---

## Model

- **VAR-01 — The variant is the purchasable unit.** Price, stock, SKU, and identity MUST live at the variant. A product with options is a container; the variant is the thing (`CP-27`).
- **VAR-02 — Option axes are explicit.** Every axis (size, colour, format, term) MUST be declared with its permitted values. Axes MUST NOT be inferred from free text in a product name.
- **VAR-03 — A variant is a full combination.** A variant MUST specify a value on every declared axis. A partial combination MUST NOT be purchasable.
- **VAR-04 — A default variant exists.** Where a product has axes, a default MUST be defined so the page renders a price without requiring a selection.
- **VAR-05 — Price per variant.** Variants MUST support independent pricing. A single product price applied across variants of differing cost is a modeling error.
- **VAR-06 — Stock per variant.** Stock MUST be tracked per variant. Product-level stock across variants oversells the popular ones and hides the dead ones (`inventory.md`).

## Selection

- **VAR-07 — Unavailable combinations are not selectable.** A combination that does not exist MUST NOT be selectable. Letting a customer select it and fail at add-to-cart wastes their effort and reads as brokenness.
- **VAR-08 — Out-of-stock combinations are visible but disabled.** An existing-but-unavailable combination SHOULD remain visible and disabled with its reason stated, never silently removed (`D-054`). Removal makes the customer believe it never existed.
- **VAR-09 — Selection is reflected in state.** The selected variant SHOULD be reflected in the URL so the selection is shareable and back-button safe.
- **VAR-10 — Price updates on selection.** The displayed price, availability, and imagery MUST update to the selected variant. A stale price after selection is a pricing lie (`pricing.policy.display`).
- **VAR-11 — Selection is accessible.** Option controls MUST be real form controls, labeled and keyboard-operable (`E-019`, `D-072`). Swatches MUST NOT convey meaning by colour alone (`D-038`).
- **VAR-12 — Add-to-cart requires a resolved variant.** Add-to-cart MUST be blocked until a complete combination resolves to a real variant, with the reason stated.

## Integrity

- **VAR-13 — The server resolves the variant.** The server MUST resolve and validate the variant, its price, and its availability. A client-supplied variant price MUST NOT be trusted (`COM-02`).
- **VAR-14 — Variant SKUs are unique.** Every variant MUST carry its own unique, stable SKU (`PR-03`).
- **VAR-15 — Archived variants persist.** An archived variant MUST remain resolvable for order history (`PR-09`).
- **VAR-16 — Axis changes are migrations.** Adding or removing an axis changes every variant's identity and MUST be treated as a data migration, not an edit.

## Scale

- **VAR-17 — Combinatorial explosion is bounded.** Axis count and value count MUST be bounded. Three axes of ten values is a thousand variants nobody maintains, and the catalog rots into inaccuracy.
- **VAR-18 — Generated variants are reviewed.** Bulk-generated combinations MUST be reviewed for real availability before activation. Generating every combination and hoping is how impossible products reach the storefront.

## Verification

The commerce gate verifies variants carry price, stock, and SKU; unavailable combinations are unselectable; price and availability update on selection; and the server resolves the variant authoritatively.
