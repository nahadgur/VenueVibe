import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListVenueWizard from '@/components/ListVenueWizard';

export default function ListVenuePage() {
  return (
    <main className="min-h-screen bg-[#0F2618] selection:bg-[rgba(200,169,110,0.3)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#C8A96E] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Become a host</p>
          <h1 className="text-4xl md:text-6xl font-display font-light text-[#E8DFC9] mb-4 tracking-tight">
            List your <span className="italic text-[#C8A96E]">space</span>
          </h1>
          <p className="text-[#5A7A52] text-[15px] font-light leading-relaxed">
            Join a curated community of hosts earning money by sharing their space.
          </p>
        </div>
        
        <ListVenueWizard />
      </div>
      <Footer />
    </main>
  );
}
