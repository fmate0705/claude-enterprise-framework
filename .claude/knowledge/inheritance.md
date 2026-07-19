# Module Inheritance

**Framework:** CEF · **Specification:** AS-004 (Knowledge Engine) · **Version:** 0.1.0

**Purpose:** Define how project types compose their knowledge by inheritance. A project type Never lists its modules from scratch; it inherits a base profile and adds, emphasizes, or relaxes. Inheritance produces a deterministic root set that `loading.md` resolves into a closure.

**Inheritance rules:**
- **IN-01 — Every type inherits a base.** No project type is defined without a parent profile.
- **IN-02 — Children extend, not replace.** A child inherits Every module of its parent and Only adds or relaxes.
- **IN-03 — Floors are never removed.** A child Never drops the Accessibility floor where a UI exists, nor the Security or Performance floors.
- **IN-04 — Relaxation is explicit.** Removing a module (for example, SEO on an internal tool) is a recorded relaxation, never a silent omission, and Only where the module has no applicable output.

**Capability bundles** (reusable add-ons that map to modules):
- **Blog** = M-SEO + M-AISEO + M-COPY (+ article/author content model in M-ARCH).
- **CMS** = M-ARCH (data layer) + M-SEC (edit auth) + M-TEST.
- **Auth** = M-SEC + M-ARCH.
- **Payments** = M-SEC (PCI-aware) + M-LEGAL.
- **RBAC** = M-SEC (roles + audit) + M-ARCH.

---

## Base Profiles

**Web Base** — inherited by Every project type that has a UI:
```
M-CONST, M-RULES, M-WORKFLOW, M-KNOW, M-MEMORY,
M-ARCH, M-REACT, M-NEXT, M-TS, M-TEST,
M-DESIGN, M-UI, M-A11Y, M-PERF, M-SEC, M-IMG,
M-DOCKER, M-DEPLOY, M-REVIEW, M-CHECK
```

**API Base** — inherited by headless services (no UI):
```
M-CONST, M-RULES, M-WORKFLOW, M-KNOW, M-MEMORY,
M-ARCH, M-TS, M-SEC, M-PERF, M-TEST,
M-DOCKER, M-DEPLOY, M-REVIEW, M-CHECK
```

## Inheritance Tree

```
Web Base
├── Landing Page          (+ Blog-lite: M-SEO, M-AISEO, M-COPY, M-MOTION; + M-TEMPLATES:landing)
│   ├── Corporate Website (+ M-LEGAL)
│   │   └── Agency Website(+ Blog, + CMS)
│   └── Portfolio         (emphasize M-IMG, M-MOTION)
├── Blog                  (+ M-SEO, M-AISEO, M-COPY)
├── Dashboard             (+ Auth; relax M-SEO, M-AISEO)
│   └── Admin Panel       (+ RBAC; relax M-SEO, M-AISEO)
├── SaaS                  (inherits Dashboard app shell; + M-SEO, M-AISEO, M-COPY, M-LEGAL, Auth, Payments)
├── E-Commerce            (+ M-SEO, M-AISEO, M-COPY, Payments; emphasize M-IMG, M-PERF, M-SEC)
└── Full Stack Application(+ CMS, Auth; emphasize M-TEST, M-SEC)

API Base
└── API                   (+ OpenAPI contract; relax M-DESIGN, M-UI, M-MOTION, M-IMG, M-COPY, M-A11Y, M-SEO)
```

## Resolved Root Sets

Each type's root set is `parent ∪ additions − relaxations`. `loading.md` then resolves the closure and orders by tier.

| Project type | Parent | Adds | Relaxes |
|---|---|---|---|
| Landing Page | Web Base | M-SEO, M-AISEO, M-COPY, M-MOTION, M-TEMPLATES | — |
| Corporate Website | Landing Page | M-LEGAL | — |
| Portfolio | Landing Page | (emphasis: M-IMG, M-MOTION) | — |
| Agency Website | Corporate Website | Blog, CMS | — |
| Blog | Web Base | M-SEO, M-AISEO, M-COPY | — |
| Dashboard | Web Base | Auth | M-SEO, M-AISEO |
| Admin Panel | Dashboard | RBAC | M-SEO, M-AISEO |
| SaaS | Web Base | Dashboard-shell, M-SEO, M-AISEO, M-COPY, M-LEGAL, Auth, Payments | — |
| E-Commerce | Web Base | M-SEO, M-AISEO, M-COPY, Payments (emphasis: M-IMG, M-PERF, M-SEC) | — |
| Full Stack Application | Web Base | CMS, Auth (emphasis: M-TEST, M-SEC) | — |
| API | API Base | OpenAPI contract | M-DESIGN, M-UI, M-MOTION, M-IMG, M-COPY, M-A11Y, M-SEO |

## Worked Example — Agency Website

Per AS-004, an Agency Website inherits a Landing Page and adds Blog, Legal, and CMS:

```
Agency Website
  = Corporate Website (= Landing Page + M-LEGAL)
    + Blog (M-SEO, M-AISEO, M-COPY)
    + CMS  (M-ARCH data layer, M-SEC, M-TEST)

Resolved roots:
  Web Base ∪ { M-SEO, M-AISEO, M-COPY, M-MOTION, M-TEMPLATES,
               M-LEGAL, M-SEC, M-TEST }
```

Because M-A11Y, M-PERF, and M-SEC are floors in Web Base, they are present and Never relaxed (IN-03). The relaxations column is empty — an Agency site has a public UI, so no UI/SEO module is dropped.
