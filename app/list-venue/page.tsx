import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListVenueWizard from '@/components/ListVenueWizard';

export default function ListVenuePage() {
  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Become a host</p>
          <h1 className="text-4xl md:text-6xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">List your <span className="italic text-[#8C7B66]">space</span></h1>
          <p className="text-[#8C7B66] text-[15px] font-light leading-relaxed">Join a curated community of hosts earning money by sharing their space.</p>
        </div>
        <ListVenueWizard />
      </div>
      <Footer />
    </main>
  );
}
