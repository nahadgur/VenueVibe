import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaScript from '@/components/SchemaScript';
import { generateFAQSchema } from '@/lib/schema';
import FAQAccordion from '@/components/FAQAccordion';

const PLANNER_FAQS = [
  { question: 'How do I book a venue on VenueVibe?', answer: 'Browse venues by city, event type, or collection. When you find a space you like, click "Send inquiry" on the venue page. Fill in your event date, guest count, and an optional message. The host will respond within 24 hours to confirm availability and pricing.' },
  { question: 'Is it free to send an inquiry?', answer: 'Yes — sending an inquiry is completely free. You are not charged anything until a booking is confirmed by the host and you agree to proceed with payment.' },
  { question: 'How do payments work?', answer: 'All payments are processed securely through Stripe. Once a host confirms your booking, you will receive a payment link. Funds are held by Stripe and released to the host after the event. VenueVibe never stores your card details.' },
  { question: 'What is the cancellation policy?', answer: 'Each venue sets its own cancellation policy, displayed on the listing page. Most venues offer free cancellation up to 48 hours before the event. Cancellations outside this window may be subject to a partial charge. Check the specific venue listing for details.' },
  { question: 'How do I know a venue is legitimate?', answer: 'Venues with the "Verified" badge have been personally inspected by our team. All listings include real user reviews and verified capacity figures. We also require hosts to provide proof of liability insurance for their space.' },
  { question: 'Can I visit a venue before booking?', answer: 'Most hosts are happy to arrange a site visit before you commit. Simply mention it in your inquiry message. We recommend visiting in person for large events (100+ guests) or weddings.' },
  { question: 'What if something goes wrong on the day?', answer: 'Contact us at support@venuevibe.com within 14 days of the event with your booking reference. We mediate between guests and hosts and can arrange partial or full refunds where the venue did not meet the listing description.' },
];

const HOST_FAQS = [
  { question: 'How do I list my venue on VenueVibe?', answer: 'Click "List your Venue" and sign in with Google. Our 3-step wizard takes less than 2 minutes — add your venue details, pricing, and photos. Your listing goes live immediately and appears in search results.' },
  { question: 'How much does it cost to list?', answer: 'Listing your venue is free. VenueVibe charges a service fee on completed bookings only. You are never charged for inquiries, messages, or time your listing is active.' },
  { question: 'How do I receive payments?', answer: 'Payouts are processed via Stripe to your registered bank account, typically within 3–5 business days after the event. You will need to connect a Stripe account during onboarding.' },
  { question: 'Can I set my own pricing and availability?', answer: 'Yes — you have full control over your hourly rate, minimum booking duration, and available dates. You can update pricing at any time from your host dashboard.' },
  { question: 'What happens when I receive an inquiry?', answer: 'You will receive an email notification with the guest\'s details, event date, guest count, and message. You can respond directly through VenueVibe to confirm, decline, or ask questions. We recommend responding within 24 hours.' },
  { question: 'Do I need insurance?', answer: 'Yes — we require all hosts to maintain appropriate public liability insurance for their venue. This protects both you and your guests. You should also ensure your venue complies with local fire safety and licensing regulations.' },
  { question: 'How can I get my venue verified?', answer: 'Verified venues receive a badge that increases trust and booking rates. To apply for verification, email hosts@venuevibe.com with your listing URL. Our team will arrange an inspection at a time that suits you.' },
];

const ALL_FAQS = [...PLANNER_FAQS, ...HOST_FAQS];

export const metadata = {
  title: 'Help Centre — FAQs for Planners & Hosts | VenueVibe',
  description: 'Find answers to common questions about booking venues, listing spaces, payments, cancellations, and more.',
};

export default function HelpPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Help', href: '/help' },
  ];

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <SchemaScript data={generateFAQSchema(ALL_FAQS)} />
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Breadcrumbs items={crumbs} />

        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Support</p>
        <h1 className="text-3xl md:text-5xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">
          Help <span className="italic text-[#8C7B66]">centre</span>
        </h1>
        <p className="text-[#8C7B66] text-[15px] font-light max-w-xl mb-16 leading-relaxed">
          Find answers to common questions about using VenueVibe — whether you&apos;re planning an event or listing a space.
        </p>

        {/* For Planners */}
        <section className="mb-16">
          <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">
            For event <span className="italic text-[#8C7B66]">planners</span>
          </h2>
          <FAQAccordion faqs={PLANNER_FAQS} />
        </section>

        {/* For Hosts */}
        <section className="mb-16">
          <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">
            For venue <span className="italic text-[#8C7B66]">hosts</span>
          </h2>
          <FAQAccordion faqs={HOST_FAQS} />
        </section>

        {/* Still need help */}
        <section className="bg-white border border-[#E0D5C5] rounded-xl p-8 text-center">
          <h3 className="text-lg font-[Georgia,serif] text-[#2C2418] mb-3">Still have questions?</h3>
          <p className="text-[14px] text-[#8C7B66] font-light mb-6">Our team typically responds within a few hours during UK business hours.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors">
            Contact us <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  );
}
