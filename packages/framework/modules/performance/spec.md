# Performance — Detailed Specification

Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint are
measured against the owned thresholds; the client bundle is measured against the project
budget. The LCP image is eager and prioritized; media has explicit dimensions to prevent
layout shift; below-the-fold work is deferred or lazy-loaded. Fonts self-host with
`display: swap`. Measure under a representative mobile profile and re-measure after every
fix. Performance is a floor. Authoritative source: AS-013 (Performance).
