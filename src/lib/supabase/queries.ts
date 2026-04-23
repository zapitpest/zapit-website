import { createServerClient } from './server';
import type { Suburb, Service, BlogPost, Page, Region } from '@/types';

export async function getAllSuburbs(): Promise<Suburb[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('suburbs')
    .select('*')
    .eq('is_published', true)
    .order('name');
  if (error) throw new Error(`Failed to fetch suburbs: ${error.message}`);
  return data ?? [];
}

export async function getSuburbBySlug(slug: string): Promise<Suburb | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('suburbs')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error) return null;
  return data;
}

export async function getAllServices(type?: 'pest' | 'commercial'): Promise<Service[]> {
  const supabase = await createServerClient();
  let query = supabase
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('name');
  if (type) query = query.eq('type', type);
  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch services: ${error.message}`);
  return data ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error) return null;
  return data;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch blog posts: ${error.message}`);
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error) return null;
  return data;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error) return null;
  return data;
}

export async function getAllRegions(): Promise<Region[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('regions')
    .select('*')
    .eq('is_published', true)
    .order('name');
  if (error) throw new Error(`Failed to fetch regions: ${error.message}`);
  return data ?? [];
}

export async function getRegionBySlug(slug: string): Promise<Region | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('regions')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error) return null;
  return data;
}
