import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Cookie Policy | VenueVibe',
  description: 'How VenueVibe uses cookies and similar technologies on our platform.',
};

export default function CookiePolicyPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ];

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Breadcrumbs items={crumbs} />

        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Legal</p>
        <h1 className="text-3xl md:text-5xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">
          Cookie <span className="italic text-[#8C7B66]">policy</span>
        </h1>
        <p className="text-[#A69580] text-[13px] font-light mb-12">Last updated: January 2026</p>

        <div className="text-[#5C4E3C] text-[15px] font-light leading-[1.85] space-y-8">
          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">What are cookies</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you use the platform. Some cookies are essential for the site to function; others help us improve your experience.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Cookies we use</h2>

            <div className="space-y-6 mt-4">
              <div className="bg-white border border-[#E0D5C5] rounded-xl p-5">
                <h3 className="text-[15px] font-medium text-[#2C2418] mb-2">Strictly necessary cookies</h3>
                <p className="text-[14px] text-[#8C7B66] font-light leading-relaxed mb-3">These are required for VenueVibe to function. They handle authentication, session management, and your cookie consent preferences. They cannot be disabled.</p>
                <div className="text-[13px] text-[#A69580] font-light space-y-1">
                  <p><span className="text-[#5C4E3C]">cookie_consent</span> — Stores your cookie preferences. Expires after 1 year.</p>
                  <p><span className="text-[#5C4E3C]">Firebase Auth</span> — Manages your login session. Expires on sign-out.</p>
                </div>
              </div>

              <div className="bg-white border border-[#E0D5C5] rounded-xl p-5">
                <h3 className="text-[15px] font-medium text-[#2C2418] mb-2">Analytics cookies</h3>
                <p className="text-[14px] text-[#8C7B66] font-light leading-relaxed mb-3">These help us understand how visitors use VenueVibe so we can improve the platform. They collect anonymised data about page views, session duration, and feature usage. You can opt out via the cookie banner.</p>
                <div className="text-[13px] text-[#A69580] font-light space-y-1">
                  <p><span className="text-[#5C4E3C]">Google Analytics (GA4)</span> — Collects anonymised usage data. Expires after 2 years.</p>
                </div>
              </div>

              <div className="bg-white border border-[#E0D5C5] rounded-xl p-5">
                <h3 className="text-[15px] font-medium text-[#2C2418] mb-2">Functional cookies</h3>
                <p className="text-[14px] text-[#8C7B66] font-light leading-relaxed mb-3">These remember your preferences, such as search filters and saved venues, to provide a more personalised experience. You can opt out via the cookie banner.</p>
                <div className="text-[13px] text-[#A69580] font-light space-y-1">
                  <p><span className="text-[#5C4E3C]">cookie_prefs</span> — Stores your custom cookie settings. Expires after 1 year.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Managing your cookies</h2>
            <p>When you first visit VenueVibe, a cookie banner gives you the option to accept all cookies, reject non-essential cookies, or customise your preferences. You can change your preferences at any time by clearing your browser cookies and revisiting the site, which will trigger the banner again. Most web browsers also allow you to manage cookies through their settings. Blocking all cookies may affect your ability to use certain features of VenueVibe, such as sign-in and saved venues.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Third-party cookies</h2>
            <p>VenueVibe does not serve advertising cookies or allow third-party advertisers to place cookies on our platform. The only third-party cookies used are from Google (Firebase for authentication and GA4 for analytics). These are governed by Google's own privacy policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Changes to this policy</h2>
            <p>We may update this cookie policy if we introduce new cookies or change how we use existing ones. The "last updated" date above reflects the most recent revision.</p>
          </section>

          <section>
            <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3">Contact</h2>
            <p>For questions about our use of cookies, contact us at hello@venuevibe.com.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
