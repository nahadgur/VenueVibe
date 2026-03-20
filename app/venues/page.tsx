import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VenueSearch from '@/components/VenueSearch';

export default function VenuesPage() {
  return (
    <main className="min-h-screen bg-[#0F2618] selection:bg-[rgba(200,169,110,0.3)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-[#C8A96E] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Browse</p>
        <h1 className="text-4xl md:text-6xl font-display font-light text-[#E8DFC9] mb-4 tracking-tight">
          Curated <span className="italic text-[#C8A96E]">spaces</span>
        </h1>
        <p className="text-[#5A7A52] text-[15px] font-light max-w-xl mb-14 leading-relaxed">
          Discover our full collection of unique spaces for your next event.
        </p>
        <VenueSearch />
      </div>
      <Footer />
    </main>
  );
}
