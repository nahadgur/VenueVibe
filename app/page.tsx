import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedVenues from '@/components/FeaturedVenues';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import SchemaScript from '@/components/SchemaScript';
import { generateWebsiteSchema } from '@/lib/schema';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)] selection:text-[#2C2418]">
      <SchemaScript data={generateWebsiteSchema()} />
      <Navbar /><Hero /><FeaturedVenues /><HowItWorks /><Testimonials /><CallToAction /><Footer />
    </main>
  );
}
