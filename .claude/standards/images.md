# Images Standard

**Purpose:** Define how CEF handles imagery — formats, sizing, optimization, responsive delivery, and accessibility of visual content.

**Description:** Images are usually the heaviest asset on a page, so CEF treats them as a performance and accessibility concern. This standard will prescribe modern formats (AVIF/WebP with fallbacks), responsive `srcset`/sizes, correct dimensions to prevent layout shift, lazy loading below the fold, meaningful `alt` text, and art-direction rules. It coordinates with the performance, SEO, and accessibility standards to ensure images enhance rather than degrade a page.

## Scope

- Format selection and fallbacks (AVIF, WebP, JPEG/PNG, SVG).
- Responsive delivery: `srcset`, `sizes`, and the Next.js image pipeline.
- Preventing CLS with explicit dimensions.
- Lazy loading and priority hints.
- Alt text, decorative images, and accessibility.

## Status

**Superseded by the Brand & Asset Intelligence Engine (AS-012).** The canonical image and visual-asset standard now lives in [`assets/`](assets/) — see `image-optimization.md`, `responsive-images.md`, and `image-seo.md` for image handling.

## TODO

- [ ] Define format and fallback policy.
- [ ] Codify responsive image delivery.
- [ ] Specify dimension/CLS rules.
- [ ] Document alt-text conventions.
