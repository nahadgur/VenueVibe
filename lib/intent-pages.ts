// ============================================================
// Programmatic Intent Pages
// ============================================================
// These generate SEO landing pages for specific search intents:
//   /christmas-party-venues-london
//   /cheap-meeting-rooms-harrow
//   /outdoor-wedding-venues-manchester
//
// Each combines: [modifier] + [venue type] + [location]
// The page renders a curated description, FAQ, and links into
// the main /venues/[city]/[eventType] structure.
// ============================================================

export interface IntentPage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  /** Body copy — 2-3 paragraphs of genuinely useful content */
  body: string;
  /** Links into the hub & spoke structure */
  citySlug: string;
  eventTypeSlug?: string;
  /** Related intent pages for cross-linking */
  relatedSlugs: string[];
  /** FAQs for schema + on-page content */
  faqs: { question: string; answer: string }[];
  /** Keyword tags for internal use */
  keywords: string[];
}

// ── Modifier × Type × Location combinations ──

export const INTENT_PAGES: IntentPage[] = [
  // ─── London ───
  {
    slug: 'christmas-party-venues-london',
    title: 'Christmas Party Venues in London | VenueVibe',
    h1: 'Christmas party venues in London',
    description: 'Find the perfect Christmas party venue in London. From glittering rooftop bars to cosy private dining rooms, browse curated festive spaces.',
    body: `London transforms during the festive season, and finding the right Christmas party venue can make or break your end-of-year celebration. Whether you're planning an intimate team dinner for 12 or a company-wide bash for 500, the city offers an extraordinary range of spaces — from fairy-lit warehouse conversions in Shoreditch to grand Georgian townhouses in Mayfair.\n\nThe key to booking a great Christmas venue in London is timing. The best spaces get snapped up by July, so early planning gives you the widest choice and strongest negotiating position on price. Consider what matters most to your group: central transport links, in-house catering, or a wow-factor space that does the decorating for you.\n\nOur curated collection includes venues with dedicated Christmas packages, flexible minimum spends, and hosts who understand the logistics of festive events. Every space is personally verified by our team.`,
    citySlug: 'london',
    eventTypeSlug: 'corporate-events',
    relatedSlugs: ['corporate-event-venues-london', 'private-dining-rooms-london', 'rooftop-venues-london'],
    faqs: [
      { question: 'When should I book a Christmas party venue in London?', answer: 'Ideally by September. Premium venues in central London often sell out their December dates by mid-summer. Booking early also gives you access to early-bird pricing and the best date choices.' },
      { question: 'How much does a Christmas party venue cost in London?', answer: 'Expect to pay £50–£150 per head for a fully catered Christmas party in central London. Dry hire spaces start from around £2,000 for an evening, with Mayfair and City venues at the higher end.' },
      { question: 'What size venues are available for Christmas parties?', answer: 'VenueVibe lists Christmas-suitable venues from intimate dining rooms for 10 guests to warehouse spaces for 1,000+. The most popular range is 50–200 capacity.' },
    ],
    keywords: ['christmas party venues london', 'xmas party venue london', 'festive venue hire london', 'office christmas party london'],
  },
  {
    slug: 'corporate-event-venues-london',
    title: 'Corporate Event Venues in London | VenueVibe',
    h1: 'Corporate event venues in London',
    description: 'Discover premium corporate event venues across London. Conference halls, boardrooms, and creative spaces for impactful business gatherings.',
    body: `London's corporate event scene spans everything from FTSE 100 boardrooms in Canary Wharf to creative studios in Hackney Wick. The right venue signals professionalism to clients while keeping your team energised — and the wrong one does the opposite.\n\nThe most in-demand corporate venues combine flexible layouts with strong AV infrastructure. Look for spaces that offer breakout rooms alongside a main event area, reliable high-speed WiFi, and on-site technical support. For client-facing events, first impressions matter: natural light, architectural character, and a central postcode all contribute to the perceived value of your event.\n\nOur London corporate collection ranges from £200/hour for boutique meeting rooms to £5,000+ for full-day exclusive-use venues. Every listing includes verified capacity figures, AV specs, and real reviews from previous corporate clients.`,
    citySlug: 'london',
    eventTypeSlug: 'corporate-events',
    relatedSlugs: ['cheap-meeting-rooms-london', 'christmas-party-venues-london', 'conference-venues-london'],
    faqs: [
      { question: 'What types of corporate event venues are available in London?', answer: 'London offers boardrooms, conference centres, creative studios, hotel ballrooms, museum event spaces, and rooftop venues. The best choice depends on your event format, guest count, and the impression you want to make.' },
      { question: 'How far in advance should I book a corporate venue in London?', answer: 'For large events (100+ guests), book 3–6 months ahead. Smaller meetings and workshops can often be booked 2–4 weeks out, though popular venues in the City and West End fill quickly.' },
      { question: 'Do corporate venues in London include AV equipment?', answer: 'Most dedicated corporate venues include basic AV (projector, screen, microphone). Higher-end spaces offer full production support. Always confirm specifics before booking — our listings detail exactly what\'s included.' },
    ],
    keywords: ['corporate event venues london', 'corporate venue hire london', 'business event space london'],
  },
  {
    slug: 'cheap-meeting-rooms-london',
    title: 'Affordable Meeting Rooms in London | VenueVibe',
    h1: 'Affordable meeting rooms in London',
    description: 'Find cheap meeting rooms across London from £25/hour. Professional spaces for workshops, interviews, and team meetings without the premium price.',
    body: `Not every meeting needs a Mayfair address. London has a growing network of affordable, professional meeting rooms that deliver everything you need — reliable WiFi, a projector, comfortable seating, and decent coffee — without the eye-watering day rates of traditional venues.\n\nThe best value meeting rooms in London tend to be in co-working hubs, community spaces, and converted buildings slightly outside Zone 1. Areas like Bermondsey, Stratford, Hackney, and Battersea offer excellent transport links with significantly lower hourly rates than equivalent spaces in Mayfair or the City.\n\nOur collection starts from £25/hour for basic meeting rooms and goes up to £100/hour for premium spaces with catering. Every listing is verified and reviewed by real users, so you know exactly what you're getting before you book.`,
    citySlug: 'london',
    eventTypeSlug: 'workshops',
    relatedSlugs: ['corporate-event-venues-london', 'cheap-meeting-rooms-harrow', 'workshop-venues-london'],
    faqs: [
      { question: 'What is the cheapest meeting room in London?', answer: 'Meeting rooms in London start from around £25/hour in areas like Stratford, Bermondsey, and Hackney. Community centres and co-working spaces often offer the best rates, especially for off-peak bookings.' },
      { question: 'Can I book a meeting room in London by the hour?', answer: 'Yes — most meeting rooms on VenueVibe offer hourly bookings with a typical minimum of 2 hours. Some also offer half-day and full-day rates which work out cheaper per hour.' },
    ],
    keywords: ['cheap meeting rooms london', 'affordable meeting room london', 'budget meeting space london'],
  },
  {
    slug: 'private-dining-rooms-london',
    title: 'Private Dining Rooms in London | VenueVibe',
    h1: 'Private dining rooms in London',
    description: 'Book exclusive private dining rooms across London. Intimate chef\'s tables, wine cellars, and elegant spaces for special occasions.',
    body: `A private dining room turns a meal into an event. Whether it's a milestone birthday, a client dinner, or a proposal with a view, London's private dining scene offers something for every occasion and budget.\n\nThe best private dining rooms in London combine exceptional food with architectural character — think candlelit wine cellars in Covent Garden, panoramic river-view rooms in Southbank, and chef's tables where you watch your meal being prepared. Capacity typically ranges from 8 to 40 guests, making these spaces ideal for occasions where intimacy matters.\n\nWhen comparing private dining options, look beyond the menu price. Some venues charge a room hire fee on top of the minimum spend, while others bundle everything in. Our listings break down the full cost structure so there are no surprises.`,
    citySlug: 'london',
    eventTypeSlug: 'private-dining',
    relatedSlugs: ['christmas-party-venues-london', 'wedding-venues-london', 'corporate-event-venues-london'],
    faqs: [
      { question: 'How much does a private dining room cost in London?', answer: 'Private dining rooms in London typically require a minimum spend of £500–£3,000 depending on location and capacity. Per-head costs range from £60 for a set menu to £200+ for fine dining with wine pairings.' },
      { question: 'What is the best private dining room in London?', answer: 'It depends on the occasion. For romance, riverside rooms at Butler\'s Wharf are hard to beat. For business, the City has elegant spaces with discrete service. VenueVibe curates the best across all categories.' },
    ],
    keywords: ['private dining rooms london', 'private dining london', 'private dining hire london'],
  },
  {
    slug: 'rooftop-venues-london',
    title: 'Rooftop Venues in London | VenueVibe',
    h1: 'Rooftop venues in London',
    description: 'Discover stunning rooftop venues across London. Sky-high event spaces with panoramic views for parties, launches, and celebrations.',
    body: `There's something about being above the London skyline that makes any event feel special. Rooftop venues offer a combination of natural light, dramatic views, and open-air atmosphere that ground-floor spaces simply can't match.\n\nLondon's rooftop scene has exploded in recent years, with options ranging from converted warehouse rooftops in Peckham to sleek hotel terraces overlooking the Thames. The best rooftop venues offer both covered and open-air areas, so your event isn't entirely at the mercy of British weather.\n\nPeak season for rooftop events runs from May to September, and the most popular spaces book out months in advance for summer dates. For winter events, look for enclosed rooftop spaces with heating — the views are arguably even more spectacular when the city lights up after dark.`,
    citySlug: 'london',
    relatedSlugs: ['christmas-party-venues-london', 'wedding-venues-london', 'corporate-event-venues-london'],
    faqs: [
      { question: 'Are rooftop venues in London weather-dependent?', answer: 'Many rooftop venues offer retractable roofs, marquee options, or enclosed glass structures. Always check the wet weather policy before booking — the best venues have a solid Plan B built in.' },
      { question: 'When is the best time to book a rooftop venue in London?', answer: 'Summer (June–August) is peak season with the longest daylight. However, winter rooftop events with heating and city views are increasingly popular. Book summer dates at least 4 months ahead.' },
    ],
    keywords: ['rooftop venues london', 'rooftop event space london', 'rooftop party venue london'],
  },
  {
    slug: 'wedding-venues-london',
    title: 'Wedding Venues in London | VenueVibe',
    h1: 'Wedding venues in London',
    description: 'Find your dream wedding venue in London. From grand historic halls to intimate garden spaces, curated for your special day.',
    body: `Planning a London wedding means choosing between some of the most extraordinary venues in the world. The city offers everything from Orangeries in royal parks to industrial-chic warehouse conversions, Georgian townhouses with private gardens, and riverfront spaces with skyline views.\n\nThe most important factors when choosing a London wedding venue are: licensed for ceremonies (saves the cost and logistics of a separate church or registry office), capacity for both the ceremony and reception, and whether they allow external caterers or require you to use their in-house team.\n\nBudget-wise, London wedding venues range from £3,000 for a weekday booking at a community space to £25,000+ for exclusive use of a landmark venue on a Saturday in peak season. Our listings include transparent pricing, real couple reviews, and details on exactly what's included.`,
    citySlug: 'london',
    eventTypeSlug: 'weddings',
    relatedSlugs: ['private-dining-rooms-london', 'rooftop-venues-london', 'outdoor-wedding-venues-london'],
    faqs: [
      { question: 'How much does a wedding venue cost in London?', answer: 'London wedding venue hire ranges from £3,000 to £25,000+ depending on the day, season, and prestige. Weekday and winter weddings offer significant savings — often 30–50% less than a summer Saturday.' },
      { question: 'How far in advance should I book a London wedding venue?', answer: 'For Saturday weddings at popular venues, 12–18 months is standard. Weekday and Sunday weddings can sometimes be booked 6–9 months out. The sooner you book, the more date flexibility you have.' },
    ],
    keywords: ['wedding venues london', 'london wedding venue hire', 'unique wedding venues london'],
  },

  // ─── Harrow ───
  {
    slug: 'cheap-meeting-rooms-harrow',
    title: 'Affordable Meeting Rooms in Harrow | VenueVibe',
    h1: 'Affordable meeting rooms in Harrow',
    description: 'Book budget-friendly meeting rooms in Harrow from £20/hour. Professional spaces with good transport links, just 20 minutes from central London.',
    body: `Harrow offers genuinely affordable professional meeting spaces that are a fraction of the cost of central London equivalents — and with surprisingly good transport links. The Metropolitan line puts you 20 minutes from Baker Street, making Harrow an increasingly popular choice for businesses that don't need a WC1 postcode.\n\nThe best meeting rooms in Harrow are found in modern business centres along Station Road, community hubs like the Harrow Arts Centre, and the growing number of co-working spaces near Harrow-on-the-Hill. Many offer free parking — a major advantage over Zone 1 venues.\n\nRates typically start at £20/hour for a basic boardroom setup and go up to £60/hour for premium spaces with full catering support. Most venues offer discounted half-day and full-day rates.`,
    citySlug: 'harrow',
    eventTypeSlug: 'workshops',
    relatedSlugs: ['cheap-meeting-rooms-london', 'corporate-event-venues-london', 'workshop-venues-harrow'],
    faqs: [
      { question: 'How much do meeting rooms cost in Harrow?', answer: 'Meeting rooms in Harrow start from around £20/hour — roughly 30–50% cheaper than central London equivalents. Full-day rates of £150–£300 are common, and many include WiFi, projector, and refreshments.' },
      { question: 'Is Harrow well-connected for business meetings?', answer: 'Yes — Harrow-on-the-Hill station is on the Metropolitan line, reaching Baker Street in 20 minutes and the City in 35. Several venues also offer free parking, which is rare for London-area meeting rooms.' },
    ],
    keywords: ['cheap meeting rooms harrow', 'meeting room hire harrow', 'affordable meeting space harrow'],
  },

  // ─── Manchester ───
  {
    slug: 'conference-venues-manchester',
    title: 'Conference Venues in Manchester | VenueVibe',
    h1: 'Conference venues in Manchester',
    description: 'Book conference venues in Manchester for 50 to 2,000+ delegates. Modern facilities, excellent rail links, and competitive pricing.',
    body: `Manchester has quietly become one of the UK's top conference destinations, offering a combination of world-class facilities, excellent rail connectivity, and prices that significantly undercut London equivalents. The city's conference venues range from the 800-capacity Manchester Central (a stunning converted railway station) to intimate innovation hubs in the Northern Quarter.\n\nThe key advantage of Manchester for conferences is value. A full-day delegate package that costs £80–£120 in London typically runs £45–£75 in Manchester, with comparable quality. The city also benefits from two major rail stations, making it accessible from across the UK without requiring flights.\n\nFor tech and creative industry conferences, the Northern Quarter and Ancoats offer venues with genuine character — exposed brick, industrial fittings, and the kind of atmosphere that makes attendees actually want to stay for the networking.`,
    citySlug: 'manchester',
    eventTypeSlug: 'conferences',
    relatedSlugs: ['corporate-event-venues-london', 'conference-venues-birmingham'],
    faqs: [
      { question: 'What is the largest conference venue in Manchester?', answer: 'Manchester Central can host up to 10,000 delegates and is one of the UK\'s premier conference facilities. For mid-size events (200–800), venues like Victoria Warehouse and The Lowry offer excellent alternatives.' },
      { question: 'How much does a conference venue cost in Manchester?', answer: 'Day delegate rates in Manchester typically range from £45–£75 per person including room hire, AV, refreshments, and lunch. This is roughly 30–40% cheaper than equivalent London venues.' },
    ],
    keywords: ['conference venues manchester', 'conference centre manchester', 'conference hire manchester'],
  },

  // ─── Birmingham ───
  {
    slug: 'conference-venues-birmingham',
    title: 'Conference Venues in Birmingham | VenueVibe',
    h1: 'Conference venues in Birmingham',
    description: 'Find conference venues in Birmingham for events of all sizes. Central UK location with HS2 connectivity and competitive delegate rates.',
    body: `Birmingham's central UK location makes it the most accessible city for national conferences — no attendee has to travel more than 2–3 hours by train. With HS2 further improving connectivity, the city is investing heavily in its conference infrastructure.\n\nThe ICC Birmingham and NEC are the headline venues, but the city also offers a growing number of boutique conference spaces in the Jewellery Quarter and Digbeth. These smaller venues — typically 50–300 capacity — offer a more creative atmosphere for workshops, away-days, and innovation events.\n\nBirmingham delegate rates are among the most competitive for a major UK city, typically running 25–35% below London equivalents with comparable quality facilities.`,
    citySlug: 'birmingham',
    eventTypeSlug: 'conferences',
    relatedSlugs: ['conference-venues-manchester', 'corporate-event-venues-london'],
    faqs: [
      { question: 'Why choose Birmingham for a conference?', answer: 'Birmingham is the UK\'s most geographically central major city, reachable within 2 hours by train from most UK cities. Delegate rates are 25–35% below London, and the venue selection ranges from the 10,000-capacity NEC to boutique Digbeth spaces.' },
    ],
    keywords: ['conference venues birmingham', 'conference centre birmingham', 'birmingham conference hire'],
  },
];

// ── Lookup helpers ──

export function getIntentPageBySlug(slug: string): IntentPage | undefined {
  return INTENT_PAGES.find((p) => p.slug === slug);
}

export function getAllIntentSlugs(): string[] {
  return INTENT_PAGES.map((p) => p.slug);
}

export function getRelatedIntentPages(slugs: string[]): IntentPage[] {
  return slugs
    .map((s) => getIntentPageBySlug(s))
    .filter((p): p is IntentPage => p !== undefined);
}
