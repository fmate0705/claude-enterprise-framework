import { z } from 'zod';

/** Schema for `.cef/runtime.json` — the RuntimeConfiguration model. */
export const runtimeConfigurationSchema = z
  .object({
    frameworkVersion: z.number().int(),
    enabledModules: z.array(z.string()),
    plugins: z.record(z.object({ enabled: z.boolean() }).passthrough()).optional(),
    executionOrder: z.array(z.string()).optional(),
    validationPipeline: z.array(z.string()).optional(),
  })
  .passthrough();

export type RuntimeConfiguration = z.infer<typeof runtimeConfigurationSchema>;

/** Schema for the optional `.cef/context.json` — freeform but must be an object. */
export const projectContextSchema = z.record(z.unknown());

export type ProjectContext = z.infer<typeof projectContextSchema>;
