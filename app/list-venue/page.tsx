import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListVenueWizard from '@/components/ListVenueWizard';

export default function ListVenuePage() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-white/20">
      <Navbar />
      <div className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-light text-white mb-6 tracking-tighter uppercase">
            List Your <span className="italic text-white/60">Space</span>
          </h1>
          <p className="text-white/50 text-sm tracking-[0.1em] uppercase leading-relaxed">
            Join a curated community of hosts earning money by sharing their space.
          </p>
        </div>
        
        <ListVenueWizard />
      </div>
      <Footer />
    </main>
  );
}
