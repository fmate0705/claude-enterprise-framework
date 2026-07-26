# Deployment — Detailed Specification

Release from an immutable, versioned artifact with secrets configured, health checks in
place, and a rollback path that has been tested — not assumed. Promote in order: preview,
then staging, then production; never straight to production. After promotion, verify health
and key metrics before declaring the release healthy, and record the release in deployment
memory and the changelog. A release whose rollback is unproven is not reversible.
Authoritative source: AS-014 (Deployment).
