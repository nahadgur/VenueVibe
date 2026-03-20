import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedVenues from '@/components/FeaturedVenues';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F2618] selection:bg-[rgba(200,169,110,0.3)] selection:text-[#E8DFC9]">
      <Navbar />
      <Hero />
      <FeaturedVenues />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}
