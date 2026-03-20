import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#0F2618] selection:bg-[rgba(200,169,110,0.3)]">
      <Navbar />
      <div className="pt-20" />
      <HowItWorks />
      <Footer />
    </main>
  );
}
