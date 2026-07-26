/**
 * A deterministic token estimator. It is intentionally simple and dependency-free: roughly four
 * characters per token, which tracks well enough for budgeting context size without pulling in a
 * tokenizer. It never calls a model or the network.
 */
export class TokenEstimator {
  private static readonly CHARS_PER_TOKEN = 4;

  estimate(text: string): number {
    if (text.length === 0) {
      return 0;
    }
    return Math.ceil(text.length / TokenEstimator.CHARS_PER_TOKEN);
  }

  estimateAll(texts: readonly string[]): number {
    return texts.reduce((total, text) => total + this.estimate(text), 0);
  }
}
