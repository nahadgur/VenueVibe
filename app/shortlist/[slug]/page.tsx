'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Share2, Copy, CheckCheck, ArrowRight, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VenueCard from '@/components/VenueCard';
import CompareVenues from '@/components/CompareVenues';
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import type { Venue, Shortlist } from '@/lib/types';

export default function ShortlistPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [shortlist, setShortlist] = useState<Shortlist | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        // Find shortlist by shared slug
        const q = query(
          collection(db, 'shortlists'),
          where('sharedSlug', '==', slug),
          where('isPublic', '==', true)
        );
        const snap = await getDocs(q);

        if (snap.empty) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const shortlistData = { id: snap.docs[0].id, ...snap.docs[0].data() } as Shortlist;
        setShortlist(shortlistData);

        // Fetch each venue
        const venuePromises = shortlistData.venueIds.map(async (venueId) => {
          const venueRef = doc(db, 'venues', venueId);
          const venueSnap = await getDoc(venueRef);
          if (venueSnap.exists()) {
            return {
              id: venueSnap.id,
              ...venueSnap.data(),
              images: venueSnap.data().images || [],
              vibeTags: venueSnap.data().vibeTags || [],
              amenities: venueSnap.data().amenities || [],
              eventTypesSupported: venueSnap.data().eventTypesSupported || [],
              pricingModel: venueSnap.data().pricingModel || 'hourly',
              cancellationPolicy: venueSnap.data().cancellationPolicy || 'flexible',
            } as Venue;
          }
          return null;
        });

        const results = await Promise.all(venuePromises);
        setVenues(results.filter(Boolean) as Venue[]);
      } catch (err) {
        console.error('Error loading shortlist:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {loading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="w-8 h-8 text-[#C4AE8F] animate-spin" />
          </div>
        ) : notFound ? (
          <div className="text-center py-32">
            <Heart className="w-12 h-12 text-[#E0D5C5] mx-auto mb-4" />
            <h1 className="text-2xl font-[Georgia,serif] text-[#2C2418] mb-3">Shortlist not found</h1>
            <p className="text-[14px] text-[#8C7B66] font-light mb-8">This shortlist may have been removed or the link is incorrect.</p>
            <Link href="/venues" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors">
              Browse venues <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-3">Shared shortlist</p>
                <h1 className="text-3xl md:text-4xl font-[Georgia,serif] font-normal text-[#2C2418] tracking-tight">
                  {shortlist?.title || 'Venue'} <span className="italic text-[#8C7B66]">shortlist</span>
                </h1>
                <p className="text-[14px] text-[#8C7B66] font-light mt-2">
                  {venues.length} venue{venues.length !== 1 ? 's' : ''} saved
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E0D5C5] text-[13px] text-[#5C4E3C] font-light hover:border-[#C4AE8F] transition-colors shrink-0"
              >
                {copied ? <><CheckCheck className="w-4 h-4" />Link copied</> : <><Copy className="w-4 h-4" />Copy link</>}
              </button>
            </div>

            {/* Venue grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {venues.map((venue) => (
                <VenueCard key={venue.id} {...venue} priority={false} />
              ))}
            </div>

            {/* Comparison table if 2+ venues */}
            {venues.length >= 2 && (
              <div className="mt-12">
                <h2 className="text-2xl font-[Georgia,serif] font-normal text-[#2C2418] mb-6 tracking-tight">
                  Side-by-side <span className="italic text-[#8C7B66]">comparison</span>
                </h2>
                <CompareVenues venues={venues} />
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 bg-white border border-[#E0D5C5] rounded-xl p-8 text-center">
              <h3 className="text-lg font-[Georgia,serif] text-[#2C2418] mb-3">Want to create your own shortlist?</h3>
              <p className="text-[14px] text-[#8C7B66] font-light mb-6">Browse venues, tap the heart icon, and share your favourites.</p>
              <Link href="/venues" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors">
                Explore venues <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
