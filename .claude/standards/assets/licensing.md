# Licensing

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the rights and licensing of every asset. Every asset MUST have clear rights; unlicensed assets are Never used.

> **Disclaimer.** This engine provides operational guidance on asset rights; it is **not legal advice**. Licensing and IP questions of consequence MUST be confirmed with a qualified professional (see `content/legal-pages.md`).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Licensing Rules

- **LIC-01 — Clear rights per asset.** Every asset MUST have documented rights (source, license, permitted use); an asset with unknown rights MUST NOT be shipped.
- **LIC-02 — Generated assets.** For assets generated via the Higgsfield MCP or similar, the generation source, terms, and permitted commercial use MUST be recorded (`art-direction.md` AD-14).
- **LIC-03 — Third-party assets.** Third-party assets (stock, fonts, icons) MUST be used within their license; out-of-license use MUST NOT occur.
- **LIC-04 — Commercial license.** Assets used commercially MUST hold a commercial license where required; a non-commercial or unlicensed asset MUST NOT be used commercially.
- **LIC-05 — Attribution.** Where a license requires attribution, it MUST be provided correctly and visibly as required; required attribution MUST NOT be omitted.
- **LIC-06 — Client ownership.** Deliverable ownership/handover terms MUST be clear; assets the client is expected to own MUST be delivered with appropriate rights.
- **LIC-07 — No watermarked assets.** Watermarked or comp/preview assets MUST NOT be shipped to production; a licensed, watermark-free version MUST be used.
- **LIC-08 — Logos and trademarks.** Third-party logos/trademarks (e.g., client logos in proof) MUST be used only with permission (`content/trust-signals.md` CTR-04).
- **LIC-09 — Fonts.** Web fonts MUST be licensed for web use and self-hosted/served per their license (`platform` fonts); unlicensed font use MUST NOT occur.
- **LIC-10 — Asset exports.** Exports/handover packages MUST include only assets the recipient is licensed to use; unlicensed assets MUST NOT be included.
- **LIC-11 — Versioning of rights.** When an asset or its license changes, the rights record MUST be updated (`asset-organization.md` AO-05).
- **LIC-12 — Record in memory.** Significant licensing decisions and constraints MUST be recorded in `memory/decisions.md`.

## Licensing Guarantees

- **LIC-G1** — Every asset has documented, sufficient rights.
- **LIC-G2** — No watermarked or out-of-license assets; attribution honored.
- **LIC-G3** — Client ownership and exports respect licensing; recorded in memory.
