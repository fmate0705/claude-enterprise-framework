# Security — Detailed Specification

Assume hostile input from the first line. Validate and sanitize every input at its trust
boundary and re-validate on the server — client validation is a convenience, not a control.
Enforce authorization server-side per action and per object. Parameterize every query;
never inject raw HTML from user or model output. Keep secrets in server-only environment
variables and set strict security headers (CSP and the rest). Security is a floor.
Authoritative source: AS-016 (Security & Compliance).
