import { describe, expect, it } from 'vitest';
import { buildCatalog, moduleFiles } from '../testing/fixtures.js';
import { FrameworkValidator } from './framework-validator.js';

describe('FrameworkValidator', () => {
  it('passes a well-formed catalog', async () => {
    const catalog = await buildCatalog({
      ...moduleFiles('a', { engines: ['ea'] }),
      ...moduleFiles('b', { engines: ['eb'], deps: ['a'] }),
    });
    const report = new FrameworkValidator().validate(catalog);
    expect(report.ok).toBe(true);
    expect(report.issues.filter((issue) => issue.severity === 'error')).toHaveLength(0);
  });

  it('reports a broken reference as an error', async () => {
    const catalog = await buildCatalog(moduleFiles('a', { engines: ['ea'], deps: ['missing'] }));
    const report = new FrameworkValidator().validate(catalog);
    expect(report.ok).toBe(false);
    expect(report.issues.some((issue) => issue.message.includes('missing'))).toBe(true);
  });

  it('reports a circular dependency as an error', async () => {
    const catalog = await buildCatalog({
      ...moduleFiles('x', { engines: ['ex'], deps: ['y'] }),
      ...moduleFiles('y', { engines: ['ey'], deps: ['x'] }),
    });
    const report = new FrameworkValidator().validate(catalog);
    expect(report.ok).toBe(false);
    expect(report.issues.some((issue) => issue.severity === 'error')).toBe(true);
  });
});
