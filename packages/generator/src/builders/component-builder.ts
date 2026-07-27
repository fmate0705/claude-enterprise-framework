import type { GeneratedFile } from '@cef/core';
import type { GenerationContext } from '../models/index.js';

export interface ComponentFile {
  readonly id: string;
  readonly file: GeneratedFile;
}

/**
 * Stage 3 builder. Generates a curated set of reusable, typed, accessible primitives that pages
 * compose — Button, Section, Card, Hero, FeatureGrid, CTA, FAQ, Testimonials. It deliberately
 * emits one component per pattern (no near-duplicate files), so the "never generate duplicate
 * components" rule holds by construction. Every component reads design tokens, supports dark mode
 * via the theme's CSS variables, is responsive, and honors reduced motion (set globally in CSS).
 */
export class ComponentBuilder {
  build(_context: GenerationContext): readonly ComponentFile[] {
    return [
      { id: 'button', file: { path: 'components/ui/button.tsx', content: BUTTON } },
      { id: 'section', file: { path: 'components/ui/section.tsx', content: SECTION } },
      { id: 'card', file: { path: 'components/ui/card.tsx', content: CARD } },
      { id: 'hero', file: { path: 'components/sections/hero.tsx', content: HERO } },
      {
        id: 'feature-grid',
        file: { path: 'components/sections/feature-grid.tsx', content: FEATURE_GRID },
      },
      { id: 'cta', file: { path: 'components/sections/cta.tsx', content: CTA } },
      { id: 'faq', file: { path: 'components/sections/faq.tsx', content: FAQ } },
      {
        id: 'testimonials',
        file: { path: 'components/sections/testimonials.tsx', content: TESTIMONIALS },
      },
    ];
  }
}

const BUTTON = `import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/** Button variants and sizes. The single source for actionable styling across the app. */
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:opacity-90',
        secondary: 'bg-surface text-foreground hover:bg-border',
        outline: 'border border-border text-foreground hover:bg-surface',
        ghost: 'text-foreground hover:bg-surface',
      },
      size: { sm: 'h-9 px-3 text-sm', md: 'h-11 px-5', lg: 'h-12 px-6 text-lg' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/** An action button. Use \`ButtonLink\` for navigation. */
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** A link styled as a button, for navigation actions. */
export function ButtonLink({
  href,
  className,
  variant,
  size,
  children,
}: { href: string } & VariantProps<typeof buttonVariants> & {
    className?: string;
    children: React.ReactNode;
  }) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </Link>
  );
}
`;

const SECTION = `import { useId } from 'react';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';

/** A titled content region. Wraps content in a labelled \`section\` for correct document structure. */
export function Section({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const headingId = useId();
  return (
    <section aria-labelledby={title ? headingId : undefined} className={cn('py-16', className)}>
      <Container>
        {title ? (
          <h2 id={headingId} className="text-3xl font-semibold tracking-tight">
            {title}
          </h2>
        ) : null}
        <div className={title ? 'mt-8' : undefined}>{children}</div>
      </Container>
    </section>
  );
}
`;

const CARD = `import { cn } from '@/lib/cn';

/** A surface card. Consistent slots (title, body) across every grid. */
export function Card({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('rounded-lg border border-border bg-surface p-6', className)}>
      {title ? <h3 className="text-lg font-semibold">{title}</h3> : null}
      {children ? <div className={title ? 'mt-2 text-foreground/80' : 'text-foreground/80'}>{children}</div> : null}
    </div>
  );
}
`;

const HERO = `import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

/** The above-the-fold hero. Renders the single page \`h1\` and one primary call to action. */
export function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="py-24">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg text-foreground/80">{subtitle}</p>
          <div className="mt-8">
            <ButtonLink href={ctaHref} size="lg">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
`;

const FEATURE_GRID = `import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';

/** A responsive grid of features. Count is content-driven, never a fixed three-card default. */
export function FeatureGrid({
  title,
  items,
}: {
  title?: string;
  items: readonly { title: string; description: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <Section title={title}>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title}>
            <Card title={item.title}>{item.description}</Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
`;

const CTA = `import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

/** A focused conversion band with exactly one primary action. */
export function CTA({ title, ctaLabel, ctaHref }: { title: string; ctaLabel: string; ctaHref: string }) {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-xl border border-border bg-surface p-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <div className="mt-6">
            <ButtonLink href={ctaHref} size="lg">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
`;

const FAQ = `import { Section } from '@/components/ui/section';

/** An accessible FAQ built on native \`details\`/\`summary\` disclosures. */
export function FAQ({
  title,
  items,
}: {
  title?: string;
  items: readonly { question: string; answer: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <Section title={title ?? 'Frequently asked questions'}>
      <dl className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.question} className="py-4">
            <details>
              <summary className="cursor-pointer font-medium">{item.question}</summary>
              <p className="mt-2 text-foreground/80">{item.answer}</p>
            </details>
          </div>
        ))}
      </dl>
    </Section>
  );
}
`;

const TESTIMONIALS = `import { Section } from '@/components/ui/section';

/**
 * Customer testimonials. Placeholder entries are visibly marked so they are replaced with real,
 * attributed quotes before launch — never shipped as if genuine.
 */
export function Testimonials({
  title,
  items,
}: {
  title?: string;
  items: readonly { quote: string; author: string; role: string; placeholder: boolean }[];
}) {
  if (items.length === 0) return null;
  return (
    <Section title={title ?? 'What clients say'}>
      <ul className="grid gap-6 sm:grid-cols-2">
        {items.map((item, index) => (
          <li key={index} className="rounded-lg border border-border bg-surface p-6">
            {item.placeholder ? (
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-foreground/50">
                Placeholder — replace before launch
              </p>
            ) : null}
            <blockquote className="text-foreground/90">{item.quote}</blockquote>
            <p className="mt-4 text-sm font-medium">
              {item.author}
              <span className="text-foreground/60"> — {item.role}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
`;
