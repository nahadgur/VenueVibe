import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#0F2618] selection:bg-[rgba(200,169,110,0.3)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <p className="text-[#C8A96E] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Simple process</p>
        <h1 className="text-4xl md:text-6xl font-display font-light text-[#E8DFC9] mb-4 tracking-tight">
          How it <span className="italic text-[#C8A96E]">works</span>
        </h1>
        <p className="text-[#5A7A52] text-[15px] font-light max-w-xl mx-auto leading-relaxed">
          Everything you need to know about booking the perfect space.
        </p>
      </div>
      <HowItWorks />
      <Footer />
    </main>
  );
}
