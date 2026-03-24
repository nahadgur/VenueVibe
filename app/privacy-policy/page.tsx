import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Privacy Policy | VenueVibe',
  description: 'How VenueVibe collects, uses, and protects your personal data.',
};

export default function PrivacyPolicyPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ];

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Breadcrumbs items={crumbs} />

        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Legal</p>
        <h1 className="text-3xl md:text-5xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">
          Privacy <span className="italic text-[#8C7B66]">policy</span>
        </h1>
        <p className="text-[#A69580] text-[13px] font-light mb-12">Last updated: January 2026</p>

        <div className="text-[#5C4E3C] text-[15px] font-light leading-[1.85] space-y-8">
          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Who we are</h2>
            <p>VenueVibe Ltd operates the venue marketplace at venuevibe.com. We are the data controller for personal data collected through our platform. For privacy-related inquiries, contact us at hello@venuevibe.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">What data we collect</h2>
            <p>When you create an account via Google Sign-In, we receive your name, email address, and profile photo from Google. When you submit an inquiry or list a venue, we collect the information you provide in those forms, including event details, venue descriptions, pricing, and images. We also collect usage data through cookies and analytics tools, including pages visited, time on site, and device information.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">How we use your data</h2>
            <p>We use your personal data to operate the marketplace: connecting planners with hosts, displaying venue listings, processing inquiries, and enabling reviews. We use analytics data to improve the platform and understand how people use VenueVibe. We do not sell your personal data to third parties. We do not use your data for automated decision-making or profiling.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Who we share data with</h2>
            <p>When you send an inquiry, your name and email are shared with the venue host so they can respond. We use Firebase (Google Cloud) for authentication and data storage. We use Vercel for hosting. We may use analytics providers to understand platform usage. We do not share your data with advertisers or data brokers.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Legal basis for processing</h2>
            <p>We process your data under the following legal bases: contract performance (to operate your account and facilitate bookings), legitimate interests (to improve the platform and prevent fraud), and consent (for analytics cookies, which you can control via our cookie banner).</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Data retention</h2>
            <p>We retain your account data for as long as your account is active. Inquiry data is retained for 24 months after the event date. Reviews are retained indefinitely as part of the public venue record. You can request deletion of your data at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Your rights</h2>
            <p>Under UK GDPR, you have the right to access your personal data, correct inaccuracies, request deletion, restrict processing, data portability, and object to processing. To exercise any of these rights, email hello@venuevibe.com. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">International transfers</h2>
            <p>Your data may be processed in the United States through our use of Google Cloud (Firebase) and Vercel. These transfers are protected by Standard Contractual Clauses and the providers' compliance certifications.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Children</h2>
            <p>VenueVibe is not intended for users under 18. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Changes to this policy</h2>
            <p>We may update this policy from time to time. Material changes will be communicated via email or a notice on the platform. The "last updated" date above reflects the most recent revision.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Complaints</h2>
            <p>If you are not satisfied with how we handle your data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
