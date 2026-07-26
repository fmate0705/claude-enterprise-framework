import type { CapabilityRef } from '../models/index.js';
import { TokenEstimator } from './token-estimator.js';

export interface CompressedCapability {
  readonly id: string;
  /** One-line summary, whitespace-collapsed and length-capped. */
  readonly summary: string;
  /** A reference to where the full detail lives, instead of inlining it. */
  readonly reference: string;
  readonly tokenEstimate: number;
}

/**
 * Deterministic context compression. It reduces verbose framework documentation to summaries,
 * references, and metadata — never by calling a model, always by mechanical text operations:
 * whitespace collapse, sentence truncation, and line de-duplication. The goal is minimal token
 * consumption while keeping the result faithful and reproducible.
 */
export class ClaudeCompressionEngine {
  private static readonly DEFAULT_SUMMARY_CHARS = 160;

  constructor(private readonly tokens: TokenEstimator = new TokenEstimator()) {}

  /** Collapses runs of whitespace to single spaces and trims. */
  normalizeWhitespace(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  /** Keeps whole sentences up to `maxChars`, appending an ellipsis when truncated. */
  summarize(text: string, maxChars = ClaudeCompressionEngine.DEFAULT_SUMMARY_CHARS): string {
    const normalized = this.normalizeWhitespace(text);
    if (normalized.length <= maxChars) {
      return normalized;
    }
    const sentences = normalized.match(/[^.!?]+[.!?]+/g) ?? [normalized];
    let result = '';
    for (const sentence of sentences) {
      const candidate = result.length === 0 ? sentence.trim() : `${result} ${sentence.trim()}`;
      if (candidate.length > maxChars) {
        break;
      }
      result = candidate;
    }
    if (result.length === 0) {
      result = normalized.slice(0, maxChars).trimEnd();
    }
    return `${result.replace(/[.\s]+$/, '')}…`;
  }

  /** Removes consecutive duplicate lines and trailing whitespace on each line. */
  dedupeLines(text: string): string {
    const out: string[] = [];
    for (const raw of text.split('\n')) {
      const line = raw.replace(/\s+$/, '');
      if (out.length === 0 || out[out.length - 1] !== line) {
        out.push(line);
      }
    }
    return out.join('\n');
  }

  /**
   * Compresses a capability into summary + reference + metadata form. The reference points at the
   * detailed spec (loaded on demand) rather than inlining it.
   */
  compressCapability(capability: CapabilityRef): CompressedCapability {
    const summary = this.summarize(capability.summary);
    const reference = `modules/${capability.id}/ (load on demand)`;
    return {
      id: capability.id,
      summary,
      reference,
      tokenEstimate: this.tokens.estimate(summary),
    };
  }

  compressCapabilities(capabilities: readonly CapabilityRef[]): readonly CompressedCapability[] {
    return capabilities.map((capability) => this.compressCapability(capability));
  }

  /**
   * Joins document sections, collapsing blank-line runs to a single blank line and removing
   * consecutive duplicate lines across the whole document.
   */
  compressDocument(sections: readonly string[]): string {
    const joined = sections
      .map((section) => section.trimEnd())
      .filter((section) => section.length > 0)
      .join('\n\n');
    return this.dedupeLines(joined)
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  estimateTokens(text: string): number {
    return this.tokens.estimate(text);
  }
}
