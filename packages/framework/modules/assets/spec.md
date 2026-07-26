# Assets — Detailed Specification

Serve AVIF/WebP with a fallback, explicit width and height to prevent layout shift, and
responsive `sizes`. Mark the LCP image high priority and eager; lazy-load everything below
the fold. Content images carry meaningful `alt`; decorative images use empty `alt`. Never
ship an unsized or oversized image, and never use generic stock clichés in place of real,
on-brand imagery. Authoritative source: AS-010 (Images).
