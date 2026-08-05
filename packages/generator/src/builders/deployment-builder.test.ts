import { describe, expect, it } from 'vitest';
import { legalBlueprint, legalOptions } from '../testing/fixtures.js';
import { GenerationPipeline } from '../pipeline/index.js';
import { DeploymentBuilder } from './deployment-builder.js';

describe('DeploymentBuilder', () => {
  const pipeline = new GenerationPipeline();
  const builder = new DeploymentBuilder();

  function files(slug?: string) {
    const options = slug ? { ...legalOptions(), deploySlug: slug } : legalOptions();
    const context = pipeline.createContext(legalBlueprint(), options);
    return new Map(builder.build(context).map((f) => [f.path, f.content]));
  }

  it('emits the platform deploy bundle', () => {
    const bundle = files();
    expect([...bundle.keys()].sort()).toEqual([
      '.dockerignore',
      'Dockerfile',
      'deploy/DEPLOY.md',
      'docker-compose.yml',
    ]);
  });

  it('builds a Next.js standalone image that listens on port 80', () => {
    const dockerfile = files().get('Dockerfile') ?? '';
    expect(dockerfile).toContain('.next/standalone');
    expect(dockerfile).toContain('CMD ["node", "server.js"]');
    expect(dockerfile).toContain('ENV PORT=80');
    expect(dockerfile).toContain('EXPOSE 80');
  });

  it('matches the platform compose contract (name, network, env_file, no labels)', () => {
    const compose = files('acme-law').get('docker-compose.yml') ?? '';
    expect(compose).toContain('container_name: hosting_acme-law_web');
    expect(compose).toContain('hosting_acme-law_web:'); // service name == container name
    expect(compose).toContain('- client_acme-law_net');
    expect(compose).toMatch(/client_acme-law_net:\s*\n\s*external: true/);
    expect(compose).toMatch(/env_file:\s*\n\s*- \.env/);
    expect(compose).toMatch(/expose:\s*\n\s*- '80'/);
    expect(compose).toContain("max-size: '10m'");
    // Traefik uses the file provider — the site compose must carry NO Docker labels.
    expect(compose).not.toContain('labels:');
    expect(compose).not.toContain('traefik.');
  });

  it('defaults the slug to the project slug when none is given', () => {
    const compose = files().get('docker-compose.yml') ?? '';
    expect(compose).toContain('container_name: hosting_acme-law_web');
  });

  it('keeps secrets out of the build context', () => {
    const ignore = files().get('.dockerignore') ?? '';
    expect(ignore).toContain('.env');
    expect(ignore).toContain('.git');
    expect(ignore).toContain('node_modules');
  });

  it('is deterministic', () => {
    expect([...files('x').entries()]).toEqual([...files('x').entries()]);
  });
});
