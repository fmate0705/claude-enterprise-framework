import { z } from 'zod';

/** Schema for `.cef/project.json`. */
export const projectSchema = z
  .object({
    name: z.string(),
    framework: z.string(),
    version: z.string().optional(),
    createdDate: z.string().optional(),
    cefVersion: z.string().optional(),
    packageManager: z.string().optional(),
    language: z.string().optional(),
    buildSystem: z.string().optional(),
    deployment: z.string().optional(),
    database: z.string().optional(),
    features: z.record(z.boolean()).optional(),
  })
  .passthrough();

export type Project = z.infer<typeof projectSchema>;
