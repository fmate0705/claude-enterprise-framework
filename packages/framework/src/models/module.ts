import { z } from 'zod';

/** Schema for a capability module's `module.yaml` descriptor. */
export const moduleSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
    name: z.string(),
    version: z.string(),
    category: z.string(),
    priority: z.number().int().min(0).max(100),
    description: z.string(),
    engines: z.array(z.string()).default([]),
    capabilities: z.array(z.string()).default([]),
    dependsOn: z.array(z.string()).default([]),
    projectTypes: z.array(z.string()).default([]),
    frameworks: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    mcp: z.array(z.string()).default([]),
    tokenEstimate: z.number().int().nonnegative().default(0),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    prompt: z.string().default(''),
    specFile: z.string().optional(),
  })
  .strict();

/** The validated metadata of a capability module. */
export type ModuleMetadata = z.infer<typeof moduleSchema>;

/** A discovered module: its metadata plus the directory it was loaded from (for lazy detail). */
export interface ModuleDescriptor {
  readonly metadata: ModuleMetadata;
  readonly sourceDir: string;
}
