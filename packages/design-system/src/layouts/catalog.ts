import type { LayoutDescriptor, LayoutSection } from './types.js';

let counter = 0;
const section = (componentId: string, role: string, optional = false): LayoutSection => {
  counter += 1;
  return { id: `s${counter}`, componentId, role, optional };
};

/** The reusable page layouts, each a sequence of approved component sections. */
export const LAYOUT_CATALOG: readonly LayoutDescriptor[] = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Marketing narrative from hero to conversion.',
    sections: [
      section('navbar', 'navigation'),
      section('hero', 'above-the-fold'),
      section('logos', 'social-proof', true),
      section('features', 'value'),
      section('testimonials', 'social-proof', true),
      section('pricing', 'offer', true),
      section('faq', 'objections', true),
      section('cta', 'conversion'),
      section('footer', 'navigation'),
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Trust-forward company site.',
    sections: [
      section('navbar', 'navigation'),
      section('hero', 'above-the-fold'),
      section('features', 'services'),
      section('stats', 'credibility', true),
      section('team', 'people', true),
      section('cta', 'contact'),
      section('footer', 'navigation'),
    ],
  },
  {
    id: 'saas',
    name: 'SaaS',
    description: 'Product-led marketing site.',
    sections: [
      section('navbar', 'navigation'),
      section('hero', 'above-the-fold'),
      section('features', 'product'),
      section('testimonials', 'social-proof', true),
      section('pricing', 'offer'),
      section('faq', 'objections', true),
      section('cta', 'conversion'),
      section('footer', 'navigation'),
    ],
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Information-dense application view.',
    sections: [
      section('admin', 'shell'),
      section('dashboard-widget', 'metrics'),
      section('chart', 'trends', true),
      section('table', 'records'),
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Work showcase.',
    sections: [
      section('navbar', 'navigation'),
      section('hero', 'intro'),
      section('gallery', 'work'),
      section('cta', 'contact'),
      section('footer', 'navigation'),
    ],
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Reference docs with persistent navigation.',
    sections: [
      section('navbar', 'navigation'),
      section('admin', 'sidebar-shell'),
      section('faq', 'answers', true),
      section('footer', 'navigation'),
    ],
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Article listing and reading.',
    sections: [
      section('navbar', 'navigation'),
      section('hero', 'featured', true),
      section('blog-card', 'listing'),
      section('cta', 'subscribe', true),
      section('footer', 'navigation'),
    ],
  },
  {
    id: 'commerce',
    name: 'Commerce',
    description: 'Storefront and checkout.',
    sections: [
      section('navbar', 'navigation'),
      section('hero', 'promotion', true),
      section('commerce', 'catalog'),
      section('testimonials', 'social-proof', true),
      section('footer', 'navigation'),
    ],
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Back-office management.',
    sections: [
      section('admin', 'shell'),
      section('table', 'data'),
      section('dashboard-widget', 'summary', true),
    ],
  },
  {
    id: 'authentication',
    name: 'Authentication',
    description: 'Sign-in and account flows.',
    sections: [section('auth', 'credentials'), section('footer', 'legal', true)],
  },
];
