export type BlogListItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

export const BLOG_LIST_POSTS: readonly BlogListItem[] = [
  {
    slug: 'how-to-prepare-your-home-for-a-pest-control-visit',
    title: 'How to Prepare Your Home for a Pest Control Visit?',
    date: '2026-01-19',
    excerpt:
      'Simple steps to clear access, secure pets, and get the most from your scheduled treatment—so technicians can work efficiently and safely.',
    image: '/images/blog/blog-pest-control-visit.jpg',
  },
  {
    slug: 'what-happens-during-a-professional-pest-inspection',
    title: 'What Happens During a Professional Pest Inspection?',
    date: '2026-01-13',
    excerpt:
      'From roof voids to subfloors, learn how we document activity, risk areas, and clear next steps before any treatment plan begins.',
    image: '/images/blog/blog-pest-inspection.jpg',
  },
  {
    slug: 'pest-control-checklist-for-new-homeowners-in-melbourne',
    title: 'Pest Control Checklist for New Homeowners in Melbourne',
    date: '2025-12-17',
    excerpt:
      'Moving in? A practical checklist to reduce pest entry, catch early signs, and time your first professional visit after settlement.',
    image: '/images/blog/blog-pest-control-checklist.jpg',
  },
  {
    slug: 'how-often-should-you-schedule-pest-control-services',
    title: 'How Often Should You Schedule Pest Control Services?',
    date: '2025-12-10',
    excerpt:
      'Typical treatment intervals for general pests, how seasons change activity, and when to bring visits forward in problem suburbs.',
    image: '/images/blog/schedule-pest-control.svg',
  },
  {
    slug: 'how-much-does-pest-control-in-melbourne-cost',
    title: 'How Much Does Pest Control in Melbourne Cost?',
    date: '2025-11-28',
    excerpt:
      'What moves the price, how property type matters, and why transparent quotes beat advertised “from” prices in fine print.',
    image: '/images/blog/pest-control-cost-melbourne.svg',
  },
  {
    slug: 'melbournes-top-5-most-common-household-pests',
    title: "Melbourne's Top 5 Most Common Household Pests",
    date: '2025-11-28',
    excerpt:
      'The usual suspects in kitchens, wall voids, and roof spaces—and the early warning signs before numbers spike in warmer months.',
    image: '/images/blog/common-household-pests-melbourne.svg',
  },
  {
    slug: 'signs-you-have-a-termite-infestation-in-your-melbourne-home',
    title: "Signs You Have a Termite Infestation in Your Melbourne Home",
    date: '2025-11-21',
    excerpt:
      'Mudding, soft timber, and quiet clicking may mean termites. What to look for, what not to disturb, and when to book an inspection.',
    image: '/images/blog/termite-signs-melbourne.svg',
  },
] as const;
