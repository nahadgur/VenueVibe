import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedVenues from '@/components/FeaturedVenues';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-white/30 selection:text-white">
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
