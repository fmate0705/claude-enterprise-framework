# Image Optimization

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix how images are compressed, formatted, and sized. Oversized assets are Never shipped. Formats, size budgets, and compression targets are canonical in `images.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Approved Formats

| Format | Use |
|---|---|
| AVIF | Primary for photographic content (best compression) |
| WebP | Broad-support modern format |
| JPEG | Fallback for photos where needed |
| PNG | Fallback for transparency where needed |
| SVG | Vector: logos, icons, simple illustrations |

## Optimization Rules

- **IMO-01 — Modern formats first.** Photographic images MUST be served as AVIF/WebP with a JPEG/PNG fallback; unoptimized JPEG/PNG as the only format MUST NOT be shipped.
- **IMO-02 — Vector for vector.** Logos, icons, and flat illustrations MUST be SVG where possible; rasterized vector MUST NOT be used at scale.
- **IMO-03 — Size budgets.** Images MUST be within the size budgets in `images.policy.yaml` (hero ≤ 200KB, content ≤ 150KB, thumbnail ≤ 50KB as targets); oversized assets MUST NOT be shipped (`BP-32`).
- **IMO-04 — Compression target.** Images MUST be compressed to the target quality (≈ 80) balancing size and fidelity; visibly artifacted or needlessly huge images MUST NOT be shipped.
- **IMO-05 — Correct dimensions.** Images MUST be exported at the dimensions they are displayed at (with density variants), not larger; scaling a huge image down in the browser MUST NOT be used (`responsive-images.md` RSI-09).
- **IMO-06 — Explicit dimensions.** Every image MUST carry width/height to prevent CLS (`responsive-images.md` RSI-04).
- **IMO-07 — Strip metadata.** Unnecessary EXIF/metadata SHOULD be stripped from shipped images to reduce size and avoid leaking data.
- **IMO-08 — Caching.** Images MUST be served with long-lived cache headers and content-hashed filenames; uncached, unversioned images MUST NOT be relied upon.
- **IMO-09 — Preloading.** The LCP image SHOULD be preloaded/prioritized; non-critical images MUST NOT be preloaded.
- **IMO-10 — CDN.** Images SHOULD be served via a CDN/image service for edge delivery and on-the-fly resizing where available.
- **IMO-11 — Never oversized.** No asset MUST ship larger than needed for its largest display; oversized assets are a defect.

## Image Optimization Guarantees

- **IMO-G1** — AVIF/WebP with fallback; SVG for vector.
- **IMO-G2** — Within size budgets and compression target; correct, explicit dimensions.
- **IMO-G3** — Cached, CDN-delivered, LCP-preloaded; never oversized.
