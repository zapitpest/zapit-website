export interface Suburb {
  id: number;
  slug: string;
  name: string;
  region: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  content: string;
  faq_json: FAQ[] | null;
  schema_json: Record<string, unknown> | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  slug: string;
  name: string;
  type: 'pest' | 'commercial';
  parent_slug: string | null;
  meta_title: string;
  meta_description: string;
  h1: string;
  content: string;
  faq_json: FAQ[] | null;
  pricing_json: PricingItem[] | null;
  schema_json: Record<string, unknown> | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  content: string;
  template: string;
  schema_json: Record<string, unknown> | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteImage {
  id: number;
  url: string;
  alt_text: string;
  original_filename: string;
  size_kb: number;
  page_type: string;
  page_id: number | null;
  created_at: string;
}

export interface Region {
  id: number;
  slug: string;
  name: string;
  meta_title: string;
  meta_description: string;
  content: string;
  suburbs: string[];
  is_published: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PricingItem {
  service: string;
  price_from: number;
  price_to: number;
  unit: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
