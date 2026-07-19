# Asset Anti-Patterns

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Document the asset anti-patterns this engine forbids. Each states the Problem, its Impact, and the Preferred alternative. Any asset matching one MUST be corrected before it passes review. (Required by the AS-012 anti-patterns mandate; not in the module's file list but authored here as its canonical home.)

**Enforcement:** When a listed anti-pattern is detected, the asset MUST NOT pass `review.md`/`validation.md`. The Preferred alternative MUST be applied.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Brand Consistency

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-01 Off-brand assets | Assets ignore the system | Incoherent brand | Follow the art direction |
| AAP-02 Mixed illustration styles | Several styles at once | Incoherent, careless | One consistent style |
| AAP-03 Inconsistent color grading | Imagery graded differently | Jarring, unprofessional | One consistent grade |
| AAP-04 Inconsistent aspect ratios | Random ratios in a set | Untidy layout | Consistent ratios |
| AAP-05 Style drift across surfaces | Web ≠ social ≠ OG | Weak recognition | One system everywhere |
| AAP-06 Generic AI imagery | Uncanny generic AI look | Reads as slop | Brand-aligned, curated |
| AAP-07 Trend-chasing visuals | Trend-driven assets | Dates fast | Timeless direction |
| AAP-08 Decorative-only imagery | Images with no purpose | Noise; slow page | Purposeful imagery |
| AAP-09 Random visual variety | No cohesion | Confusing | Cohesive set |
| AAP-10 Placeholder assets | Framework/default assets shipped | Unfinished | Real, produced assets |
| AAP-11 Fabricated brand assets | Fake logo/imagery | Deceptive; risk | Real client assets |
| AAP-12 Ignoring the system | Assets before direction defined | Chaos | Define system first |

## Art Direction & Image Quality

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-13 Pixelated images | Low-res upscaled | Cheap look | Correct-resolution source |
| AAP-14 Blurry assets | Soft/out-of-focus (unintended) | Unprofessional | Sharp, correct assets |
| AAP-15 Compression artifacts | Over-compressed | Blocky, ugly | Balanced compression |
| AAP-16 Poor cropping | Subject cut awkwardly | Distracting | Intentional crop/safe zones |
| AAP-17 Cluttered composition | No focal point | Confusing | Clear focal composition |
| AAP-18 Inconsistent lighting | Mixed light direction/quality | Jarring | Consistent lighting |
| AAP-19 Inconsistent perspective | Mixed viewpoints | Disorienting | Consistent perspective |
| AAP-20 No negative space | Crammed frames | Stressful | Deliberate negative space |
| AAP-21 Distorted assets | Stretched/squashed | Amateur | Correct aspect ratio |
| AAP-22 Uncanny AI artifacts | Warped hands/text/objects | Reads as fake | Reject; regenerate/curate |
| AAP-23 Busy backgrounds | Background fights content | Illegible | Restrained background |
| AAP-24 Gimmicky effects | Random glass/gradient blobs | Generic, dated | Restrained visual language |

## Photography

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-25 Stock photo clichés | Handshakes, generic offices | Inauthentic | Real, on-brand photos |
| AAP-26 Overused stock | Recognizable stock everywhere | Forgettable | Bespoke or generated |
| AAP-27 Fake customers | Stock people as "customers" | Deceptive | Real or honest generation |
| AAP-28 Irrelevant imagery | Photos unrelated to content | Noise | Relevant imagery |
| AAP-29 Inconsistent photo grade | Photos not graded to brand | Incoherent | Brand grade |
| AAP-30 Posed inauthenticity | Obviously staged | Distrust | Authentic moments |
| AAP-31 Mismatched photo styles | Different photographic styles | Incoherent | One photographic style |
| AAP-32 Low-quality photos | Poor lighting/focus | Cheap | Quality photography |
| AAP-33 Culturally tone-deaf imagery | Inappropriate for audience | Harm; distrust | Culturally appropriate |
| AAP-34 Unpermitted people | People shot without rights | Legal/ethical risk | Permission or generation |

## Illustrations & Icons

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-35 Clip-art | Generic off-brand clip-art | Cheap | On-brand illustration |
| AAP-36 Mixed illustration detail | Inconsistent line/detail | Incoherent | Consistent complexity |
| AAP-37 Off-palette illustration | Wrong colors | Off-brand | Brand palette |
| AAP-38 Decorative-only illustration | No meaning | Noise | Purposeful illustration |
| AAP-39 Mismatched icons | Multiple icon sets | Incoherent | One icon family |
| AAP-40 Inconsistent icon stroke | Varying weights | Untidy | Consistent stroke |
| AAP-41 Filled/outline mix | Inconsistent icon style | Confusing | Consistent style per role |
| AAP-42 Emoji as icons | Emoji stand-ins | Unpolished | Consistent icon set |
| AAP-43 Meaningless icons | Icons unrelated to content | Confusing | Semantic icons |
| AAP-44 Raster icons | Bitmap icons | Blurry at scale | Vector (SVG) icons |

## Logos

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-45 Stretched logo | Distorted logo | Brand damage | Correct proportions |
| AAP-46 Recolored logo | Off-brand logo color | Brand damage | Approved variants |
| AAP-47 Logo on busy background | Illegible logo | Weak identity | Clear space + contrast |
| AAP-48 Logo too small | Below minimum size | Illegible | Respect minimum size |
| AAP-49 No clear space | Elements crowd logo | Cramped | Respect clear space |
| AAP-50 Wrong logo variant | Dark logo on dark bg | Invisible | Correct light/dark variant |
| AAP-51 Rasterized logo scaling | Blurry scaled raster | Cheap | Vector logo |
| AAP-52 Added effects | Shadow/outline on logo | Off-brand | Flat, approved logo |
| AAP-53 Placeholder logo | Default/placeholder logo | Unfinished | Real logo |
| AAP-54 Unlabeled logo link | No accessible name | Inaccessible | `alt="Brand home"` |

## Color & Overlays

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-55 Low-contrast overlays | Text unreadable on image | Illegible; inaccessible | Scrim guaranteeing AA |
| AAP-56 Off-brand colors | Colors outside palette | Incoherent | Brand palette |
| AAP-57 Hard-coded hex | Raw hex in assets/components | Drift | Tokens |
| AAP-58 Rainbow palette | Too many colors | Chaotic | Restrained palette |
| AAP-59 Decorative gradients | Gradients as decoration | Generic, dated | Solid/purposeful |
| AAP-60 Inconsistent theming | Hard-coded per-theme colors | Broken themes | Token theming |
| AAP-61 Color-only meaning | Meaning by color alone | Excludes users | Color + text/icon |
| AAP-62 Harsh pure black/white | `#000`/`#fff` harshness | Uncomfortable | Tuned neutrals |

## Hero & Backgrounds

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-63 Oversized hero | Huge unoptimized hero | Slow LCP | Within budget, optimized |
| AAP-64 Lazy-loaded LCP | Hero lazy-loaded | Slow LCP | Priority-load LCP |
| AAP-65 Hero fights headline | Busy hero over text | Illegible message | Focal, text-safe hero |
| AAP-66 Unsized hero | No dimensions | Layout shift | Reserve space |
| AAP-67 Gradient-blob hero | Decorative blob | Generic | Clean, purposeful hero |
| AAP-68 Heavy background image | Large bg raster | Slow page | CSS/SVG or optimized |
| AAP-69 Distracting animated bg | Motion background noise | Distraction | Subtle/none; reduced-motion |
| AAP-70 Inconsistent section bgs | Different treatment per section | Incoherent | Consistent treatment |

## OG, Social & Favicon

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-71 Missing OG image | No share image | Weak previews | On-brand OG image |
| AAP-72 Wrong OG dimensions | Off-spec OG image | Cropped preview | 1200×630 (metadata.policy) |
| AAP-73 Generic OG image | Off-brand OG | Weak recognition | On-brand template |
| AAP-74 Illegible OG thumbnail | Tiny text in OG | Unreadable small | Legible at thumbnail |
| AAP-75 Badly cropped social | Wrong platform size | Cropped/ugly | Correct per-platform sizing |
| AAP-76 Off-brand social | Inconsistent social assets | Weak brand | On-brand, consistent |
| AAP-77 Placeholder favicon | Default framework favicon | Unfinished | Real brand mark |
| AAP-78 Illegible tiny favicon | Full logo shrunk | Unreadable | Icon mark, legible at 16px |

## Optimization & Performance

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-79 Oversized assets | Larger than needed | Slow, over budget | Right-sized, optimized |
| AAP-80 No modern formats | JPEG/PNG only | Larger payload | AVIF/WebP + fallback |
| AAP-81 Uncompressed images | No compression | Huge files | Compress to target |
| AAP-82 Wrong dimensions | 4000px into 400px slot | Wasted bytes | Export at display size |
| AAP-83 No caching | Uncached images | Repeat downloads | Long cache + hashing |
| AAP-84 Preloading everything | Over-preloaded images | Contention | Preload only LCP |
| AAP-85 No CDN | Origin-served heavy images | Slow globally | CDN/image service |
| AAP-86 Rasterized vector | Bitmap logos/icons | Blurry, heavy | SVG |
| AAP-87 Metadata bloat | EXIF left in | Extra bytes; privacy | Strip metadata |
| AAP-88 Watermarked comps | Preview assets shipped | Unprofessional; illegal | Licensed clean version |
| AAP-89 Animated GIF for video | Heavy GIF | Huge; janky | Video/AVIF sequence |
| AAP-90 Blocking image loads | Render-blocking assets | Slow paint | Lazy/defer non-critical |

## Responsive

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-91 One size for all | Single large source | Wasted mobile bytes | `srcset`/`sizes` |
| AAP-92 No dimensions | Missing width/height | Layout shift | Explicit dimensions |
| AAP-93 Blurry on retina | Low-res on 2× | Soft image | Density variants |
| AAP-94 No art direction | Same crop everywhere | Subject lost on mobile | `<picture>` art direction |
| AAP-95 Overflow images | Image breaks layout | Horizontal scroll | Contained, responsive |
| AAP-96 Fixed-pixel images | Non-fluid sizing | Breaks on small screens | Fluid/responsive |
| AAP-97 Hidden mobile content images | Key image removed on mobile | Lost content | Content parity |
| AAP-98 Ignoring next/image | Manual unoptimized `<img>` | Missed optimization | `next/image`/pipeline |

## SEO, Accessibility, Organization & Licensing

| ID · Name | Problem | Impact | Preferred alternative |
|---|---|---|---|
| AAP-99 Missing alt text | No `alt` | Inaccessible; lost SEO | Meaningful/empty alt |
| AAP-100 Keyword-stuffed alt | Spam alt text | Penalty; poor UX | Natural description |
| AAP-101 Generic filenames | `IMG_0432.jpg` | Lost SEO | Descriptive kebab-case |
| AAP-102 Redundant captions | Caption repeats alt | No value | Complementary caption |
| AAP-103 Uncrawlable images | Script-only images | Undiscoverable | Crawlable markup |
| AAP-104 Decorative with alt | Decorative image with alt text | Noise for AT | Empty `alt=""` |
| AAP-105 Unstructured asset dump | Flat `public/` pile | Unmaintainable | Structured folders |
| AAP-106 Duplicate assets | Many near-identical copies | Bloat; drift | One canonical asset |
| AAP-107 Unversioned assets | No cache versioning | Stale caches | Content-hash versioning |
| AAP-108 Unknown rights | Asset with no license | Legal risk | Documented rights |
| AAP-109 Unlicensed commercial use | Non-commercial asset used commercially | Legal risk | Commercial license |
| AAP-110 Missing attribution | Required credit omitted | License breach | Provide attribution |

## Anti-Pattern Guarantees

- **AAP-G1** — Detection of any listed anti-pattern MUST fail asset review.
- **AAP-G2** — The Preferred alternative is the required fix; a cosmetic fix MUST NOT pass.
- **AAP-G3** — Placeholder, fabrication, generic AI slop, and unlicensed assets are never permitted (Constitution Article IV).
