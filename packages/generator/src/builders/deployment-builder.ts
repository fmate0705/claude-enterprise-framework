import type { GeneratedFile } from '@cef/core';
import { projectSlug, type GenerationContext } from '../models/index.js';

/**
 * The container port the hosting platform's Traefik routes to. The platform's
 * built-in templates expose port 80 and a site's `container_port` defaults to it,
 * so the generated app listens on 80 to deploy with no per-site configuration.
 */
const PLATFORM_PORT = 80;

/**
 * Stage 8 builder. Emits the deployment bundle for the Klivo Docker hosting platform: a Next.js
 * standalone Dockerfile that listens on the platform port, a `docker-compose.yml` that matches the
 * platform's exact contract, a `.dockerignore`, and a deploy guide.
 *
 * The platform runs a site's `docker-compose.yml` **verbatim** (after a strict security scan) and
 * routes to it through Traefik's file provider — so the compose uses **no Docker labels**, no
 * privileged options, and only the client's own external network `client_<slug>_net`. Traefik
 * addresses the container by name (`hosting_<slug>_web`) on the platform port, so both are derived
 * from the client slug.
 */
export class DeploymentBuilder {
  build(context: GenerationContext): readonly GeneratedFile[] {
    const slug = context.options.deploySlug ?? projectSlug(context.options.projectName);
    const container = `hosting_${slug}_web`;
    const network = `client_${slug}_net`;

    return [
      { path: 'Dockerfile', content: this.dockerfile() },
      { path: 'docker-compose.yml', content: this.compose(slug, container, network) },
      { path: '.dockerignore', content: DOCKERIGNORE },
      {
        path: 'deploy/DEPLOY.md',
        content: this.guide(context.options.projectName, slug, container, network),
      },
    ];
  }

  private dockerfile(): string {
    return `# syntax=docker/dockerfile:1
# Multi-stage build for a Next.js (standalone) app. The runtime listens on port
# ${PLATFORM_PORT} so the hosting platform's Traefik can route to it with no extra config.

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=${PLATFORM_PORT}
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE ${PLATFORM_PORT}
CMD ["node", "server.js"]
`;
  }

  private compose(slug: string, container: string, network: string): string {
    // NOTE: mirrors the platform's own generated template exactly — no Docker
    // labels (Traefik uses the file provider), env_file for the panel-managed
    // .env, capped logs so a chatty site cannot fill the VPS disk, and the
    // client's isolated external network as the only network.
    return `# Deploys to the Klivo Docker hosting platform (Traefik file-provider routing).
# The container name and network embed the client slug "${slug}"; if your platform
# client uses a different slug, regenerate with "cef generate --client-slug <slug>"
# or edit the two names below to match.
services:
  ${container}:
    build: .
    container_name: ${container}
    restart: unless-stopped
    env_file:
      - .env
    expose:
      - '${PLATFORM_PORT}'
    networks:
      - ${network}
    logging:
      driver: json-file
      options:
        max-size: '10m'
        max-file: '3'

networks:
  ${network}:
    external: true
`;
  }

  private guide(projectName: string, slug: string, container: string, network: string): string {
    return `# Deploying ${projectName}

This project is generated to deploy on the **Klivo Docker hosting platform**
(Traefik reverse proxy, one container per site). No CI is required — the platform
builds and runs the repository's \`docker-compose.yml\` on deploy.

## What CEF generated for deployment

| File | Purpose |
| --- | --- |
| \`Dockerfile\` | Multi-stage Next.js **standalone** build; the runtime listens on port ${PLATFORM_PORT}. |
| \`docker-compose.yml\` | The platform-contract compose: container \`${container}\`, network \`${network}\`, \`env_file: .env\`, capped logs, no Docker labels. |
| \`.dockerignore\` | Keeps \`.env\`, \`.git\`, \`node_modules\`, and \`.next\` out of the build context. |

\`next.config.mjs\` sets \`output: 'standalone'\`, which the Dockerfile relies on.

## Deploy steps

1. **Create the client/site in the panel** with the slug **\`${slug}\`** (Clients →
   + New Client → set the domain; template *None* for a repo deploy). The
   container name and network above must match this slug — regenerate with
   \`cef generate --client-slug <your-slug>\` if it differs.
2. **Container port** must be **${PLATFORM_PORT}** (the platform default), matching
   the Dockerfile's \`EXPOSE ${PLATFORM_PORT}\`.
3. **Environment**: set runtime variables under **Sites → site → Environment**.
   At minimum set \`NEXT_PUBLIC_SITE_URL\` to the site's public URL (see
   \`.env.example\`). The panel writes \`.env\`, which the compose loads via
   \`env_file\`. Secrets are never baked into the image.
4. **Point the code at the platform**: set the client's GitHub repo + branch and
   **Deploy now**, or push to the configured branch to auto-deploy (webhook).
5. The platform validates the compose (rejecting privileged mode, the Docker
   socket, or foreign networks), builds the image, starts \`${container}\` on
   \`${network}\`, and Traefik routes the domain to it — issuing a Let's Encrypt
   certificate on first request in production.

## Local check (optional)

\`\`\`bash
docker build -t ${slug} .
docker run --rm -e NEXT_PUBLIC_SITE_URL=http://localhost -p 8080:${PLATFORM_PORT} ${slug}
# open http://localhost:8080
\`\`\`
`;
  }
}

const DOCKERIGNORE = `node_modules
.next
out
.git
.env
.env.*
.cef
npm-debug.log*
Dockerfile
.dockerignore
`;
