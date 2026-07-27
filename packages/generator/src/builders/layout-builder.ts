import type { GeneratedFile } from '@cef/core';
import { RouteMapper } from '../routing/index.js';
import type { GenerationContext } from '../models/index.js';

/**
 * Stage 2 builder. Generates the shared shell: the root layout with a skip link, primary
 * navigation and footer landmarks, and a container primitive. Navigation is derived from the
 * blueprint's high-priority pages, so the shell reflects the plan rather than a default menu.
 */
export class LayoutBuilder {
  private readonly router = new RouteMapper();

  build(context: GenerationContext): readonly GeneratedFile[] {
    const routes = this.router.map(context.blueprint.pages);
    const navLinks = routes
      .filter((route) => {
        const page = context.blueprint.pages.find((p) => p.id === route.pageId);
        return (
          route.pageId !== 'home' &&
          route.pageId !== 'legal' &&
          !route.isDynamic &&
          (page?.priority === 'critical' || page?.priority === 'high')
        );
      })
      .slice(0, 6);

    const lang = context.blueprint.input.targetLanguage;
    const name = context.options.projectName;

    return [
      { path: 'app/layout.tsx', content: this.rootLayout(name, lang) },
      { path: 'components/ui/container.tsx', content: CONTAINER },
      {
        path: 'components/site/navbar.tsx',
        content: this.navbar(
          name,
          navLinks.map((r) => ({ href: r.path, label: r.name })),
        ),
      },
      { path: 'components/site/footer.tsx', content: this.footer(name) },
    ];
  }

  private rootLayout(name: string, lang: string): string {
    return `import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: ${json(name)}, template: \`%s — ${escapeTemplate(name)}\` },
  description: ${json(`${name} — built with the Claude Enterprise Framework.`)},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang=${json(lang)} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only rounded bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
`;
  }

  private navbar(name: string, links: readonly { href: string; label: string }[]): string {
    const items = links
      .map(
        (link) =>
          `          <li>\n            <Link href=${json(link.href)} className="text-sm text-foreground/80 transition-colors hover:text-foreground">\n              ${escapeJsx(link.label)}\n            </Link>\n          </li>`,
      )
      .join('\n');
    return `import Link from 'next/link';
import { Container } from '@/components/ui/container';

/** Primary site navigation. Landmark \`nav\` with descriptive links. */
export function Navbar() {
  return (
    <header className="border-b border-border">
      <Container>
        <nav aria-label="Primary" className="flex items-center justify-between py-4">
          <Link href="/" className="font-semibold">
            ${escapeJsx(name)}
          </Link>
          <ul className="flex flex-wrap gap-6">
${items}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
`;
  }

  private footer(name: string): string {
    return `import Link from 'next/link';
import { Container } from '@/components/ui/container';

/** Site footer with legal links. Landmark \`footer\`. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border">
      <Container>
        <div className="flex flex-col gap-4 py-8 text-sm text-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} ${escapeJsx(name)}. All rights reserved.</p>
          <nav aria-label="Legal">
            <Link href="/legal" className="hover:text-foreground">
              Legal
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
`;
  }
}

const CONTAINER = `import { cn } from '@/lib/cn';

/** Centers content at the design system's max width with consistent horizontal padding. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('mx-auto w-full max-w-screen-xl px-6', className)}>{children}</div>;
}
`;

function json(value: string): string {
  return JSON.stringify(value);
}

function escapeJsx(value: string): string {
  return value.replace(/[{}<>]/g, (char) => `{'${char}'}`);
}

function escapeTemplate(value: string): string {
  return value.replace(/[`$\\]/g, '\\$&');
}
