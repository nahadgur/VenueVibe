import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-white/20">
      <Navbar />
      <div className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-display font-light text-white mb-6 tracking-tighter uppercase">
          The <span className="italic text-white/60">Process</span>
        </h1>
        <p className="text-white/50 text-sm tracking-[0.1em] uppercase max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about booking the perfect space.
        </p>
      </div>
      <HowItWorks />
      <Footer />
    </main>
  );
}
