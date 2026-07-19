# Art Direction

**Framework:** CEF · **Specification:** AS-012 (Brand & Asset Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix the art direction every asset follows, and the deterministic protocol for generating custom imagery. Every generated asset MUST follow the project's established art direction. Art-direction dimensions and the generation-spec fields are canonical in `brand.policy.yaml`.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Art Direction Dimensions

The project's art direction MUST define and record the following in `memory/branding.md`:

| Dimension | What it fixes |
|---|---|
| Visual mood | The feeling every asset conveys |
| Lighting | Consistent light quality and direction |
| Composition | How subjects are arranged and framed |
| Perspective | Camera/viewpoint conventions |
| Depth | Use of depth of field and layering |
| Negative space | How space frames the subject |
| Consistency | The rules that keep assets a set |
| Color grading | The consistent color treatment |
| Background treatment | How backgrounds are handled |
| Focus | Where the eye is directed |

## Art Direction Rules

- **AD-01 — Direction before assets.** Art direction MUST be defined before assets are produced; assets MUST NOT be created against an undefined direction (`BP-06`).
- **AD-02 — Every asset follows it.** Every generated or selected asset MUST follow the established art direction; off-direction assets MUST NOT be shipped (`BP-07`).
- **AD-03 — Consistent grade and light.** Lighting and color grading MUST be consistent across imagery; mismatched grading MUST NOT be used (`BP-18`).
- **AD-04 — Deliberate composition.** Each asset MUST compose toward a clear focal point with intentional negative space; accidental or cluttered composition MUST NOT be used.
- **AD-05 — Premium visual language.** Assets MUST reflect a premium, restrained visual language; gimmicks and generic effects MUST NOT be used (`BP-08`, Article IV).
- **AD-06 — Consistent perspective and depth.** Perspective and depth conventions MUST be consistent across a set; a jarring mix MUST NOT be used.
- **AD-07 — On-palette.** Asset color MUST align with the brand palette and grade (`color-system.md`).

---

## Image Generation (Higgsfield MCP)

When custom imagery is required, generation routes to the Higgsfield MCP (TE-09). It is Never used before consulting the Brand Strategy and Art Direction.

- **AD-08 — Trigger.** Custom imagery (hero images, product renders, lifestyle imagery, background illustrations, Open Graph images, campaign visuals, marketing graphics) that must be generated MUST use the Higgsfield MCP.
- **AD-09 — System first.** The Higgsfield MCP MUST NOT be invoked before the Brand Strategy (`brand-strategy.md`) and Art Direction are defined and recorded; random generation MUST NOT occur (`BP-26`).
- **AD-10 — Full brief required.** Every generation MUST specify all of the following; a generation missing any field MUST NOT proceed:

| Field | Requirement |
|---|---|
| **Purpose** | What the asset communicates and where it is used |
| **Target audience** | Who it speaks to (`brand-strategy.md`) |
| **Visual style** | The art direction (mood, grade, composition) |
| **Aspect ratio** | The required ratio for its placement |
| **Resolution** | Sufficient for its largest display, within budget |
| **Color palette** | The brand palette (`color-system.md`) |
| **Composition** | Focal point, framing, negative space |
| **Brand alignment** | How it fits the identity |

- **AD-11 — Brand-aligned output.** Generated output MUST be checked against the brand and art direction before use; off-brand output MUST be regenerated, not accepted (`BP-27`).
- **AD-12 — Optimized after generation.** Generated assets MUST be optimized and sized before shipping (`image-optimization.md`); raw oversized output MUST NOT be shipped.
- **AD-13 — No generic AI look.** Generated imagery MUST NOT exhibit generic AI-image tells (uncanny artifacts, generic composition); such output MUST be rejected (Article IV).
- **AD-14 — Licensing recorded.** Generated assets' rights MUST be recorded (`licensing.md`).

## Art Direction Guarantees

- **AD-G1** — A defined art direction every asset follows.
- **AD-G2** — Generation only to a full brief, after the system is defined.
- **AD-G3** — Brand-aligned, premium, optimized output; no generic AI look.
