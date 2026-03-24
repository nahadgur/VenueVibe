import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Terms of Service | VenueVibe',
  description: 'Terms and conditions for using VenueVibe, the UK venue marketplace.',
};

export default function TermsPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Breadcrumbs items={crumbs} />

        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Legal</p>
        <h1 className="text-3xl md:text-5xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">
          Terms of <span className="italic text-[#8C7B66]">service</span>
        </h1>
        <p className="text-[#A69580] text-[13px] font-light mb-12">Last updated: January 2026</p>

        <div className="text-[#5C4E3C] text-[15px] font-light leading-[1.85] space-y-8">
          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">1. About VenueVibe</h2>
            <p>VenueVibe is an online marketplace that connects event planners with venue hosts across the United Kingdom. VenueVibe Ltd is registered in England and Wales. These terms govern your use of venuevibe.com and all related services.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">2. Using VenueVibe</h2>
            <p>By accessing VenueVibe you agree to these terms. You must be at least 18 years old to create an account or make a booking inquiry. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">3. For event planners</h2>
            <p>VenueVibe is free for event planners. You pay the venue directly for your booking. VenueVibe does not charge planners any service fee, booking fee, or commission. When you submit an inquiry, your contact details are shared with the venue host so they can respond. VenueVibe does not guarantee venue availability or response times, though we monitor host responsiveness and remove consistently unresponsive listings.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">4. For venue hosts</h2>
            <p>Listing a venue on VenueVibe is free. VenueVibe operates on a commission model: a service fee is charged on confirmed and completed bookings only. The commission rate varies by event category and is disclosed during onboarding. Hosts are responsible for the accuracy of their listing information, including pricing, capacity, amenities, and availability. VenueVibe reserves the right to remove listings that are misleading, unresponsive, or in breach of these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">5. Reviews</h2>
            <p>Users may leave reviews for venues they have interacted with. Reviews must be honest, relevant, and based on genuine experience. VenueVibe reserves the right to remove reviews that contain abusive language, personal attacks, spam, or content that violates applicable law. Venue hosts may respond to reviews publicly.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">6. Intellectual property</h2>
            <p>All content on VenueVibe, including text, design, logos, and software, is owned by VenueVibe Ltd or its licensors. You may not reproduce, distribute, or create derivative works from VenueVibe content without written permission. Venue hosts retain ownership of images and descriptions they upload, and grant VenueVibe a licence to display this content on the platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">7. Limitation of liability</h2>
            <p>VenueVibe is a marketplace platform. We facilitate connections between planners and hosts but are not a party to any booking agreement between them. VenueVibe is not liable for the quality, safety, or suitability of any venue, nor for any loss or damage arising from a booking. Hosts are responsible for maintaining appropriate insurance and compliance with local regulations.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">8. Termination</h2>
            <p>You may close your account at any time by contacting us. VenueVibe may suspend or terminate accounts that violate these terms. On termination, your right to use the platform ceases immediately, though these terms continue to apply to any prior activity.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">9. Changes to these terms</h2>
            <p>We may update these terms from time to time. Material changes will be communicated via email or a prominent notice on the platform. Continued use of VenueVibe after changes take effect constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">10. Contact</h2>
            <p>For questions about these terms, contact us at hello@venuevibe.com or visit our contact page.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
