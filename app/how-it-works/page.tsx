import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar /><div className="pt-20" /><HowItWorks /><Footer />
    </main>
  );
}
