import { z } from 'zod';

/** Schema for `.cef/manifest.yaml`. Unknown keys are preserved (`passthrough`). */
export const manifestSchema = z
  .object({
    frameworkVersion: z.number().int(),
    project: z.object({
      name: z.string(),
      type: z.string(),
      created: z.string().optional(),
      cefVersion: z.string().optional(),
    }),
    engines: z.array(z.string()).min(1),
    skills: z.array(z.string()).default([]),
    mcp: z.array(z.string()).default([]),
    metadata: z.record(z.unknown()).optional(),
    docker: z.object({ enabled: z.boolean(), port: z.number().int() }).optional(),
    features: z.record(z.boolean()).optional(),
    deployment: z.object({ target: z.string() }).optional(),
    languages: z
      .object({
        primary: z.string(),
        additional: z.array(z.string()).default([]),
        country: z.string().optional(),
      })
      .optional(),
    generatedFiles: z.array(z.string()).optional(),
  })
  .passthrough();

/** The strongly-typed manifest model exposed by the Runtime. */
export type Manifest = z.infer<typeof manifestSchema>;
