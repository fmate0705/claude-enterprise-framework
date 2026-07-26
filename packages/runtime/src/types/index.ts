/** Public identifier aliases for the runtime's vocabulary. */
export type EngineId = string;
export type SkillId = string;
export type McpId = string;

/** The terminal states of a boot attempt. */
export type RuntimeStatus = 'ready' | 'failed';
