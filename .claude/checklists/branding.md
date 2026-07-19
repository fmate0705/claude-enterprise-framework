# Branding Checklist — Gate 4

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Execute the brand and asset review within Gate 4. **Owner:** Brand Designer. Governed by `standards/quality/brand-review.md` and `standards/assets/`.

Asset budgets are owned by `images.policy.yaml`; OG dimensions by `metadata.policy.yaml`; favicon sizes by `assets.policy.yaml`.

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-BRD-01 | Visual system recorded | Brand strategy and art direction recorded in `memory/branding.md` before assets | Assets produced without a recorded system | Major | Brand Designer |
| CHK-BRD-02 | Assets follow art direction | Every asset matches the recorded direction (mood, grade, composition) | Any off-direction asset | Major | Brand Designer |
| CHK-BRD-03 | Logo usage correct | Correct variant per background; minimum size and clear space respected | Stretched, recolored, crowded, or wrong-variant logo | Major | Brand Designer |
| CHK-BRD-04 | Real logo (no placeholder) | The real client logo ships | Placeholder or fabricated logo | Critical | Brand Designer |
| CHK-BRD-05 | On-palette via tokens | Asset and UI color from brand tokens | Off-brand or hard-coded colors | Major | UI Designer |
| CHK-BRD-06 | One illustration style | A single illustration style throughout | Mixed illustration styles | Major | UI Designer |
| CHK-BRD-07 | One icon family | One icon set; consistent stroke and size | Mixed icon sets or emoji-as-icons | Major | UI Designer |
| CHK-BRD-08 | Consistent photo grade | Photography consistently graded and lit | Inconsistent grading/lighting | Major | Brand Designer |
| CHK-BRD-09 | Authentic imagery | Real, on-brand imagery; no stock clichés or generic AI look | Stock cliché or generic AI imagery | Major | Brand Designer |
| CHK-BRD-10 | Assets within budget | Every asset within `images.policy.yaml` budgets | Any oversized asset | Critical | Performance Engineer |
| CHK-BRD-11 | Responsive delivery | `srcset`/`sizes` or `next/image`; explicit dimensions; LCP prioritized | Single oversized source or missing dimensions | Critical | Frontend Engineer |
| CHK-BRD-12 | Alt decided on every image | Meaningful alt or explicit `alt=""` | Any image with no alt decision | Critical | Accessibility Specialist |
| CHK-BRD-13 | OG image on-brand & on-spec | OG image present, on-brand, correct dimensions | Missing, off-brand, or off-spec OG image | Major | Brand Designer |
| CHK-BRD-14 | Favicon set complete | Full icon set derived from the mark; legible at 16px; no default favicon | Missing set or framework default favicon | Major | Frontend Engineer |
| CHK-BRD-15 | Licensing documented | Every asset has documented rights; no watermarked assets | Unknown rights or watermarked asset | Critical | Brand Designer |
| CHK-BRD-16 | Asset organization | Assets in canonical folders with descriptive kebab-case names | Unstructured dump or generic filenames | Minor | Frontend Engineer |
| CHK-BRD-17 | No asset anti-patterns | Zero entries from `assets/anti-patterns.md` (AAP-01…110) | Any listed anti-pattern present | Major | Brand Designer |

**Gate pass:** category score ≥ 90, 0 Critical, 0 Major; contributes to Gate 4.
