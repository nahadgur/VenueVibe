'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building, Plus, Star, MapPin, Users, PoundSterling, Loader2, MoreVertical, Eye, Pencil, Trash2, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/firebase';
import { collection, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';
import type { Venue } from '@/lib/types';

function HostContent() {
  const { user } = useAuth();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchVenues = async () => {
      try {
        const q = query(
          collection(db, 'venues'),
          where('hostId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setVenues(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Venue)));
      } catch (error) {
        console.error('Error fetching host venues:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, [user]);

  const handleDelete = async (venueId: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      await deleteDoc(doc(db, 'venues', venueId));
      setVenues((prev) => prev.filter((v) => v.id !== venueId));
    } catch (error) {
      console.error('Error deleting venue:', error);
      alert('Failed to delete listing.');
    }
  };

  return (
    <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-2">Host dashboard</p>
          <h1 className="text-2xl md:text-3xl font-[Georgia,serif] font-normal text-[#2C2418] tracking-tight">
            Your <span className="italic text-[#8C7B66]">venues</span>
          </h1>
        </div>
        <Link
          href="/list-venue"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add venue</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Active listings', value: venues.length, icon: Building },
          { label: 'Total views', value: '—', icon: Eye },
          { label: 'Inquiries', value: '—', icon: MessageSquare },
          { label: 'Avg rating', value: '—', icon: Star },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#E0D5C5] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-3.5 h-3.5 text-[#A69580]" />
              <span className="text-[12px] text-[#A69580] font-light">{stat.label}</span>
            </div>
            <span className="text-xl font-[Georgia,serif] text-[#2C2418]">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Venue list */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-[#C4AE8F] animate-spin" /></div>
      ) : venues.length > 0 ? (
        <div className="space-y-4">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white border border-[#E0D5C5] rounded-xl overflow-hidden hover:border-[#C4AE8F] transition-colors">
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0">
                  <Image
                    src={venue.imageUrl}
                    alt={venue.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 192px"
                    quality={70}
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-1 truncate">{venue.title}</h3>
                    <div className="flex items-center gap-3 text-[13px] text-[#8C7B66] font-light mb-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{venue.location}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{venue.capacity}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-[Georgia,serif] text-[#2C2418]">£{venue.price}/hr</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-700 border border-green-200">Active</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/venue/${venue.id}`}
                      className="px-4 py-2.5 rounded-lg border border-[#E0D5C5] text-[12px] text-[#5C4E3C] font-light hover:border-[#C4AE8F] transition-colors flex items-center gap-1.5 min-h-[44px]"
                    >
                      <Eye className="w-3 h-3" />View
                    </Link>
                    <div className="relative">
                      <button
                        onClick={() => setMenuOpen(menuOpen === venue.id ? null : venue.id)}
                        className="p-2.5 rounded-lg border border-[#E0D5C5] text-[#A69580] hover:border-[#C4AE8F] hover:text-[#5C4E3C] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuOpen === venue.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-[#E0D5C5] rounded-lg shadow-sm z-20 overflow-hidden">
                          <Link
                            href={`/host/manage/${venue.id}/edit`}
                            onClick={() => setMenuOpen(null)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#5C4E3C] font-light hover:bg-[#F8F4EE] transition-colors text-left"
                          >
                            <Pencil className="w-3.5 h-3.5" />Edit listing
                          </Link>
                          <button
                            onClick={() => { setMenuOpen(null); handleDelete(venue.id); }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-red-600 font-light hover:bg-red-50 transition-colors text-left"
                          >
                            <Trash2 className="w-3.5 h-3.5" />Delete listing
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E0D5C5] rounded-xl p-12 text-center">
          <Building className="w-12 h-12 text-[#E0D5C5] mx-auto mb-4" />
          <h3 className="text-xl font-[Georgia,serif] text-[#2C2418] mb-3">No venues listed yet</h3>
          <p className="text-[14px] text-[#8C7B66] font-light mb-8 max-w-sm mx-auto">
            List your first venue and start receiving inquiries from event planners across the UK.
          </p>
          <Link
            href="/list-venue"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
          >
            <Plus className="w-4 h-4" />List your venue
          </Link>
        </div>
      )}
    </div>
  );
}

export default function HostManagePage() {
  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <AuthGuard>
        <HostContent />
      </AuthGuard>
      <Footer />
    </main>
  );
}
