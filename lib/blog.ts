// ============================================================
// Blog Data Layer
// ============================================================
// Data-driven blog posts — no MDX files needed.
// Each post is a data object with body content as a string.
// This makes it easy to batch-generate posts via Claude API
// and drop them into this array.
// ============================================================

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** ISO date string */
  publishedAt: string;
  /** Author name */
  author: string;
  /** Reading time in minutes */
  readingTime: number;
  /** Category for filtering */
  category: 'guides' | 'inspiration' | 'tips' | 'industry';
  /** Hero image URL */
  imageUrl: string;
  /** Related city slugs for internal linking */
  citySlugs: string[];
  /** Related intent page slugs for cross-linking */
  intentSlugs: string[];
  /** Body content — paragraphs separated by \n\n, supports **bold** and [links](url) */
  body: string;
  /** Keywords for SEO */
  keywords: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'hidden-gem-venues-west-london',
    title: 'Top 10 Hidden Gem Venues in West London',
    description: 'Discover secret spaces and under-the-radar venues across West London — from converted chapels in Notting Hill to riverside studios in Hammersmith.',
    publishedAt: '2025-11-15',
    author: 'VenueVibe Editorial',
    readingTime: 8,
    category: 'inspiration',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    citySlugs: ['london', 'notting-hill', 'kensington', 'richmond'],
    intentSlugs: ['wedding-venues-london', 'private-dining-rooms-london'],
    body: `West London is home to some of the city's most talked-about venues — but the real magic lies in the spaces that don't shout about themselves. These are the converted coach houses, hidden garden rooms, and underground vaults that locals know about but rarely share.\n\nWe've spent months visiting and vetting spaces across Notting Hill, Hammersmith, Chiswick, Shepherd's Bush, and Kensington to bring you our definitive list of under-the-radar venues that deliver on atmosphere without the premium-postcode price tag.\n\n**1. The Walled Garden, Notting Hill** — Tucked behind a terraced street, this 40-capacity garden room feels like stepping into a Merchant Ivory film. Original Victorian tiles, a working fireplace, and a courtyard that's genuinely magical after dark. Best for: intimate dinners, small wedding receptions.\n\n**2. Riverside Studios, Hammersmith** — A former BBC studio complex on the Thames, now offering flexible event spaces from 20 to 200 capacity. The river terrace alone makes it worth the visit. Best for: product launches, screenings, corporate away-days.\n\n**3. The Chapel, Shepherd's Bush** — A deconsecrated chapel with original stained glass, exposed beams, and extraordinary acoustics. One of West London's best-kept secrets for live music events and immersive dining. Best for: weddings, music events, experiential dining.\n\n**4. Leighton House Museum, Kensington** — The former home of Victorian artist Frederic Leighton, featuring the stunning Arab Hall with gilded mosaics. Available for evening hire, this is arguably the most beautiful room in West London. Best for: corporate entertaining, intimate celebrations.\n\n**5. The Orangery, Chiswick** — Part of a restored Georgian estate, this light-flooded glass conservatory sits within three acres of private gardens. The combination of period architecture and natural surroundings makes it feel like an escape from the city. Best for: garden parties, wedding ceremonies, workshops.\n\nEach of these venues is available to book through VenueVibe with verified availability, transparent pricing, and real reviews from previous guests.\n\n**Planning your event in West London?** Browse our full collection of venues in Notting Hill, Kensington, and Richmond — or use our search to filter by capacity, price, and event type.`,
    keywords: ['hidden gem venues west london', 'secret venues london', 'unique venues notting hill', 'best venues west london'],
  },
  {
    slug: 'plan-corporate-retreat-cotswolds',
    title: 'How to Plan a Corporate Retreat in the Cotswolds',
    description: 'A practical guide to organising a memorable corporate retreat in the Cotswolds — from venue selection and transport logistics to team-building activities.',
    publishedAt: '2025-10-28',
    author: 'VenueVibe Editorial',
    readingTime: 10,
    category: 'guides',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop',
    citySlugs: ['bristol', 'london'],
    intentSlugs: ['corporate-event-venues-london', 'conference-venues-manchester'],
    body: `The Cotswolds has become the UK's most sought-after destination for corporate retreats — and for good reason. Rolling countryside, honey-stone villages, and a growing collection of venues purpose-built for team getaways make it the perfect escape from the London grind.\n\nBut a great retreat doesn't happen by accident. Here's our step-by-step guide to planning one that your team will actually remember.\n\n**Step 1: Define your objectives** — Before you look at a single venue, get clear on what you want the retreat to achieve. Is it strategic planning? Team bonding? Creative ideation? The objective shapes every other decision — from venue layout to the agenda structure.\n\n**Step 2: Choose the right venue** — The Cotswolds offers three main venue types for retreats: country house hotels (premium, all-inclusive), converted barns and farmsteads (character, self-catering), and purpose-built retreat centres (built for teamwork, competitive pricing). Budget £150–£300 per person per night for accommodation and meeting space.\n\n**Step 3: Sort transport early** — The Cotswolds isn't the easiest place to reach without a car. Book a group coach from London (2 hours) or arrange a meeting point at Kemble, Moreton-in-Marsh, or Cheltenham Spa stations. Some venues offer shuttle services — always ask.\n\n**Step 4: Build in downtime** — The biggest mistake in retreat planning is overscheduling. Leave at least 30% of the time unstructured. Walks, pub visits, and casual conversations often produce better ideas than formal brainstorming sessions.\n\n**Step 5: Plan one memorable activity** — Give the team something to talk about. Options in the Cotswolds include: gin distillery experiences, clay pigeon shooting, foraging walks, or private cooking classes at a local farm. Budget £40–£80 per person.\n\nThe best retreats feel like a genuine break from routine — not a meeting in a different postcode. Choose a venue that your team wouldn't visit on their own, build in time for real conversations, and resist the temptation to fill every hour with activities.`,
    keywords: ['corporate retreat cotswolds', 'team retreat cotswolds', 'corporate away day cotswolds', 'planning corporate retreat uk'],
  },
  {
    slug: 'ultimate-guide-venue-hire-london',
    title: 'The Ultimate Guide to Venue Hire in London (2025)',
    description: 'Everything you need to know about hiring a venue in London — pricing, contracts, hidden costs, and how to negotiate the best deal.',
    publishedAt: '2025-09-12',
    author: 'VenueVibe Editorial',
    readingTime: 12,
    category: 'guides',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    citySlugs: ['london', 'shoreditch', 'kensington', 'mayfair'],
    intentSlugs: ['corporate-event-venues-london', 'cheap-meeting-rooms-london', 'wedding-venues-london'],
    body: `Hiring a venue in London can feel like navigating a maze — pricing structures vary wildly, contracts contain terms you've never seen before, and the gap between what a space looks like online and what you actually get can be significant.\n\nThis guide covers everything we've learned from helping thousands of people find and book venues across the city.\n\n**Understanding pricing models** — London venues typically charge in one of three ways: hourly rate (most common for meeting rooms and studios, £50–£500/hr), day rate (full-day exclusive use, £1,000–£15,000), or minimum spend (you commit to spending a minimum on food and drink, common for restaurants and bars, £500–£5,000+). Some venues combine these — for example, a room hire fee plus a minimum spend on catering.\n\n**The hidden costs to watch for** — Corkage fees (£15–£30 per bottle if you bring your own), AV equipment charges (can add £500–£2,000 to your bill), overtime rates (often 150% of the standard hourly rate), and cleaning fees (£200–£500, sometimes waived if you hit the minimum spend). Always ask for a fully itemised quote before signing anything.\n\n**How to negotiate** — Most venues have flexibility on price, especially for off-peak dates (Monday–Thursday, January–March). Ask about: reduced rates for repeat bookings, waived room hire if you hit a food and drink minimum, and complimentary extras like welcome drinks or extended access.\n\n**The contract essentials** — Check the cancellation policy (how far in advance can you cancel for a full refund?), the deposit structure (typically 25–50% upfront), liability insurance requirements, and noise restrictions. For weddings and large events, check the venue's licence hours — running over can result in fines.\n\nThe single best thing you can do is visit the space in person before booking. Photos don't convey noise levels, natural light quality, or the general atmosphere of a venue. Most hosts on VenueVibe are happy to arrange viewings at short notice.`,
    keywords: ['venue hire london', 'how to hire a venue london', 'venue hire guide london', 'london venue costs'],
  },
  {
    slug: 'best-photo-shoot-locations-london',
    title: '15 Best Photo Shoot Locations in London for 2025',
    description: 'From natural-light studios in Hackney to grand architectural backdrops in South Kensington, the best photography spaces in London.',
    publishedAt: '2025-08-20',
    author: 'VenueVibe Editorial',
    readingTime: 7,
    category: 'inspiration',
    imageUrl: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=800&auto=format&fit=crop',
    citySlugs: ['london', 'shoreditch', 'hackney'],
    intentSlugs: ['corporate-event-venues-london'],
    body: `London's photography scene is booming, and the demand for bookable studio and location spaces has never been higher. Whether you're shooting editorial fashion, product catalogues, or brand content, the right space makes the difference between good and exceptional work.\n\nWe've surveyed working photographers across London to compile this list of the 15 best photo shoot locations currently available to book. The selection spans purpose-built studios, daylight-flooded lofts, and architectural spaces with character you can't fake.\n\n**Natural light studios** — The gold standard for editorial and portrait work. East London leads the pack, with Hackney Wick and Bethnal Green offering converted warehouse studios with north-facing windows and 4-metre ceilings. Expect to pay £40–£80/hour.\n\n**Coloured infinity coves** — Essential for product and fashion work. Several studios in Bermondsey and Peckham now offer multiple cove colours in a single booking. Rates start at £60/hour including basic lighting.\n\n**Period interiors** — For lifestyle and brand shoots, period properties offer instant production value. Georgian townhouses in Islington, Art Deco apartments in Marylebone, and Victorian warehouses in Wapping are all available for shoot hire through VenueVibe.\n\nEvery space in our photography collection includes verified dimensions, natural light direction, power socket locations, and real photographer reviews.`,
    keywords: ['photo shoot locations london', 'photography studio london', 'best studios london photographers'],
  },
];

// ── Helpers ──

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getRecentBlogPosts(count: number = 6): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}
