/** Shared naming for generated content modules, so the page and content builders stay in sync. */

export function contentFilePath(pageId: string): string {
  return `content/${pageId}.ts`;
}

export function contentImportPath(pageId: string): string {
  return `@/content/${pageId}`;
}

/** The exported const name for a page's content, e.g. "case-studies" → "caseStudiesContent". */
export function contentExportName(pageId: string): string {
  const camel = pageId
    .split(/[^a-zA-Z0-9]+/)
    .filter((part) => part.length > 0)
    .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
  return `${camel}Content`;
}
