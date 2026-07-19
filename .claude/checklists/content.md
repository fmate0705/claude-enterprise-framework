# Content Checklist — Gate 6

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Execute the content gate. **Owner:** Technical Writer. Governed by `standards/quality/content-review.md`, `standards/quality/legal-review.md`, and `standards/content/`.

Readability limits are owned by `content.policy.yaml`.

---

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CNT-01 | No placeholder content | Zero lorem ipsum / "your text here" / TODO in copy | Any placeholder text found | Critical | Technical Writer |
| CHK-CNT-02 | No fabricated facts | Every statistic, testimonial, review, logo, and case is real and verifiable | Any fabricated or unverifiable claim | Critical | Product Strategist |
| CHK-CNT-03 | Grammar and spelling | Zero grammar/spelling errors | Any error found | Major | Technical Writer |
| CHK-CNT-04 | Brand voice | Copy matches the recorded voice in `memory/branding.md` | Off-voice copy | Major | Brand Designer |
| CHK-CNT-05 | Tone appropriate and consistent | Context-appropriate tone; consistent within a surface | Tone swings or wrong-context tone | Major | Technical Writer |
| CHK-CNT-06 | Terminology consistency | One term per concept; consistent product names | Multiple names for one concept | Major | Technical Writer |
| CHK-CNT-07 | Readability limits met | Reading grade ≤ target; sentences ≤30 words; paragraphs ≤4 sentences | Any limit exceeded | Minor | Technical Writer |
| CHK-CNT-08 | Headings correct | Exactly one `h1`; sequential, descriptive headings | Multiple h1 or skipped levels | Major | Technical Writer |
| CHK-CNT-09 | Required page sections present | Each page type has its required sections (`content.policy.yaml`) | Any required section missing | Major | Product Strategist |
| CHK-CNT-10 | CTAs verb-led and clear | Every CTA is verb-led and value-clear; one primary per view | Weak/generic or competing CTAs | Major | Technical Writer |
| CHK-CNT-11 | Legal pages present | All required legal pages exist and are reachable | Any required legal page missing | Critical | Product Strategist |
| CHK-CNT-12 | Legal disclaimer present | Generated legal content carries the mandatory review disclaimer | Disclaimer missing | Critical | Product Strategist |
| CHK-CNT-13 | Hungarian legal set (if applicable) | ÁSZF, Adatkezelési Tájékoztató, Impresszum, Cookie Tájékoztató present | Any required Hungarian page missing | Critical | Product Strategist |
| CHK-CNT-14 | Localization correct | Meaning/tone preserved; locale formats correct; human-reviewed | Literal/unreviewed translation or wrong formats | Major | Technical Writer |
| CHK-CNT-15 | Links descriptive and working | Descriptive anchors; all links resolve | "Click here" or broken links | Major | Technical Writer |
| CHK-CNT-16 | No content anti-patterns | Zero entries from `content/anti-patterns.md` (CNAP-01…110) | Any listed anti-pattern present | Major | Technical Writer |

**Gate pass:** category score ≥ 90, 0 Critical, 0 Major.
