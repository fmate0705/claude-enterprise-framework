# Cross-Platform Testing

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how the application is validated across operating systems, devices, and runtime environments beyond the browser engine — so that a platform-specific defect is caught before a user finds it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `validation.policy.yaml` (`platforms`).

---

## The platform matrix

- **XPL-01 — The supported platforms are declared.** Operating systems (Windows, macOS, Linux, iOS, Android), device classes, and runtime targets are recorded in `validation.policy.platforms`; validation runs against that declared set (`VLP-14`).
- **XPL-02 — Platform differences are validated, not assumed uniform.** Font rendering, input methods, scroll behavior, safe-area insets, and date/number formatting differ by platform; where they affect the product, they MUST be validated per platform (`XPL-05`).
- **XPL-03 — The server runtime is validated on the deployment target's platform.** Server behavior is validated on the platform it will run on in production, inside the reproducible container, not only on the author's OS (`DKT-01`, `VLP-02`).

## What is validated

- **XPL-04 — Input modalities.** Keyboard, mouse, touch, and pointer/stylus are validated where the platform supports them; keyboard operability is a floor owned by **M-A11Y** (`E-115`).
- **XPL-05 — Locale and formatting.** Date, time, number, and currency formatting are validated across locales where the product is localized; the formatting rules are owned by `localization.policy` (**M-CONTENTOPS** / AS-011) and referenced (`OVR-01`).
- **XPL-06 — Device constraints.** Small screens, low memory, and slow networks are represented in the matrix so the product is validated under real conditions, not only on fast developer hardware (`PRT-06`, `VLP-05`).
- **XPL-07 — Safe areas and notches.** On mobile platforms, layout MUST be validated against safe-area insets so content is not clipped by system UI (`RSP-07`).

## How it runs

- **XPL-08 — Cross-platform validation is automated where possible and scripted where not.** Platform matrices run in automation; where a platform cannot be automated, its manual check is scripted and recorded, never skipped silently (`VLP-33`, `AUT-07`).
- **XPL-09 — Container parity guarantees server-platform reproducibility.** Because the server runs in a reproducible container (`DKT-01`), server-platform validation is deterministic rather than host-dependent (`Principle 14`).
- **XPL-10 — A platform-specific failure blocks for that platform.** A defect on a supported platform blocks release for that platform unless the platform is dropped by a recorded decision (`ME-08`, `XBR-11`).
- **XPL-11 — Failures name the platform and version.** A cross-platform failure MUST identify the OS/device and version so it is reproducible (`VLP-18`).
