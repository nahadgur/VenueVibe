'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageSquare, Calendar, ArrowRight, Clock, Star, MapPin, Loader2, Building, Share2, BarChart3, Tag, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/components/AuthProvider';
import { useSavedVenues } from '@/components/SavedVenuesProvider';
import CompareVenues from '@/components/CompareVenues';
import VenueCard from '@/components/VenueCard';
import { useVenues } from '@/hooks/useVenues';
import { db } from '@/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import type { Inquiry } from '@/lib/types';

function DashboardContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'reviews' | 'saved'>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { savedVenues, toggleSave, isSaved, createShortlist } = useSavedVenues();
  const { venues: allVenues } = useVenues();
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        // Fetch sent inquiries
        const iq = query(
          collection(db, 'inquiries'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const iSnap = await getDocs(iq);
        setInquiries(iSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Inquiry)));

        // Fetch reviews
        const rq = query(
          collection(db, 'reviews'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const rSnap = await getDocs(rq);
        setReviews(rSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const tabs = [
    { id: 'inquiries' as const, label: 'Inquiries', icon: MessageSquare },
    { id: 'reviews' as const, label: 'My reviews', icon: Star },
    { id: 'saved' as const, label: 'Saved venues', icon: Heart },
  ];

  return (
    <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        {user?.photoURL ? (
          <Image src={user.photoURL} alt={user.displayName || ''} width={56} height={56} className="rounded-full border border-[#E0D5C5]" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#EDE5D8] flex items-center justify-center">
            <span className="text-[#8C7B66] font-[Georgia,serif] text-xl">{user?.displayName?.[0] || '?'}</span>
          </div>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-[Georgia,serif] font-normal text-[#2C2418]">Welcome back, {user?.displayName?.split(' ')[0]}</h1>
          <p className="text-[12px] sm:text-[13px] text-[#A69580] font-light">Manage your inquiries, reviews, and saved venues.</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Link href="/venues" className="group bg-white border border-[#E0D5C5] rounded-xl p-5 hover:border-[#C4AE8F] hover:shadow-sm transition-all flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#D4654A]/8 border border-[#D4654A]/15 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-[#D4654A]" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#2C2418]">Book a venue</p>
            <p className="text-[12px] text-[#A69580] font-light">Browse spaces</p>
          </div>
        </Link>
        <Link href="/list-venue" className="group bg-white border border-[#E0D5C5] rounded-xl p-5 hover:border-[#C4AE8F] hover:shadow-sm transition-all flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#EDE5D8] border border-[#E0D5C5] flex items-center justify-center shrink-0">
            <Building className="w-4 h-4 text-[#8C7B66]" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#2C2418]">List a venue</p>
            <p className="text-[12px] text-[#A69580] font-light">Become a host</p>
          </div>
        </Link>
        <Link href="/host/manage" className="group bg-white border border-[#E0D5C5] rounded-xl p-5 hover:border-[#C4AE8F] hover:shadow-sm transition-all flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#EDE5D8] border border-[#E0D5C5] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-[#8C7B66]" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#2C2418]">Manage listings</p>
            <p className="text-[12px] text-[#A69580] font-light">Host dashboard</p>
          </div>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-light shrink-0 transition-all ${
              activeTab === tab.id
                ? 'bg-[#2C2418] text-[#F5F0EA]'
                : 'bg-white text-[#8C7B66] border border-[#E0D5C5] hover:border-[#C4AE8F]'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'inquiries' && (
        loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-[#C4AE8F] animate-spin" /></div>
        ) : inquiries.length > 0 ? (
          <div className="space-y-4">
            {inquiries.map((inq) => {
              const statusConfig = {
                pending: { icon: AlertCircle, label: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
                responded: { icon: MessageSquare, label: 'Responded', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
                confirmed: { icon: CheckCircle, label: 'Confirmed', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
                declined: { icon: XCircle, label: 'Declined', bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200' },
                expired: { icon: Clock, label: 'Expired', bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
              };
              const sc = statusConfig[inq.status] || statusConfig.pending;

              return (
                <div key={inq.id} className="bg-white border border-[#E0D5C5] rounded-xl p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div className="min-w-0">
                      <Link href={`/venue/${inq.venueId}`} className="text-[15px] font-[Georgia,serif] text-[#2C2418] hover:text-[#D4654A] transition-colors">
                        {inq.venueTitle || 'Venue'}
                      </Link>
                      <p className="text-[12px] text-[#C4AE8F] font-light mt-0.5">
                        Sent {new Date(inq.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium ${sc.bg} ${sc.text} border ${sc.border} shrink-0`}>
                      <sc.icon className="w-3 h-3" />{sc.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-[13px] text-[#8C7B66] font-light mb-3">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#A69580]" />{new Date(inq.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    {inq.guestCount && <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#A69580]" />{inq.guestCount} guests</span>}
                    {inq.eventType && <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-[#A69580]" />{inq.eventType}</span>}
                  </div>

                  {inq.message && (
                    <p className="text-[13px] text-[#5C4E3C] font-light leading-relaxed mb-3 line-clamp-2">{inq.message}</p>
                  )}

                  {/* Host response */}
                  {inq.hostResponse && (
                    <div className="mt-3 ml-4 pl-4 border-l-2 border-[#D4654A]/20">
                      <p className="text-[11px] text-[#D4654A] font-medium mb-1">Host response</p>
                      <p className="text-[13px] text-[#5C4E3C] font-light leading-relaxed">{inq.hostResponse}</p>
                      {inq.hostRespondedAt && (
                        <p className="text-[10px] text-[#C4AE8F] font-light mt-1">
                          {new Date(inq.hostRespondedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#E0D5C5] rounded-xl p-8 text-center">
            <MessageSquare className="w-10 h-10 text-[#E0D5C5] mx-auto mb-4" />
            <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-2">No inquiries yet</h3>
            <p className="text-[14px] text-[#8C7B66] font-light mb-6">When you inquire about a venue, it will appear here.</p>
            <Link href="/venues" className="inline-flex items-center gap-2 text-[13px] text-[#D4654A] font-light hover:underline">
              Browse venues <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )
      )}

      {activeTab === 'reviews' && (
        loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-[#C4AE8F] animate-spin" /></div>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-[#E0D5C5] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-[#D4654A] text-[#D4654A]' : 'text-[#E0D5C5]'}`} />
                    ))}
                  </div>
                  {review.eventType && <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#EDE5D8] text-[#8C7B66]">{review.eventType}</span>}
                  <span className="text-[12px] text-[#C4AE8F] font-light ml-auto">{new Date(review.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                {review.title && <h4 className="text-[14px] font-medium text-[#2C2418] mb-1">{review.title}</h4>}
                <p className="text-[14px] text-[#5C4E3C] font-light leading-relaxed">{review.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E0D5C5] rounded-xl p-8 text-center">
            <Star className="w-10 h-10 text-[#E0D5C5] mx-auto mb-4" />
            <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-2">No reviews yet</h3>
            <p className="text-[14px] text-[#8C7B66] font-light">After visiting a venue, leave a review to help other planners.</p>
          </div>
        )
      )}

      {activeTab === 'saved' && (
        savedVenues.length > 0 ? (
          <div className="space-y-6">
            {/* Actions bar */}
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#A69580] font-light">{savedVenues.length} saved venue{savedVenues.length !== 1 ? 's' : ''}</p>
              {savedVenues.length >= 2 && (
                <button onClick={() => setShowCompare(!showCompare)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-light transition-all ${showCompare ? 'bg-[#2C2418] text-[#F5F0EA]' : 'border border-[#E0D5C5] text-[#5C4E3C] hover:border-[#C4AE8F]'}`}>
                  <BarChart3 className="w-3.5 h-3.5" />{showCompare ? 'Hide comparison' : 'Compare venues'}
                </button>
              )}
            </div>

            {/* Compare table */}
            {showCompare && savedVenues.length >= 2 && (
              <CompareVenues venues={allVenues} />
            )}

            {/* Venue cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedVenues.map(sv => {
                const venue = allVenues.find(v => v.id === sv.venueId);
                if (!venue) return null;
                return (
                  <VenueCard
                    key={venue.id}
                    {...venue}
                    isSavedExternal={true}
                    onToggleSave={toggleSave}
                    priority={false}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E0D5C5] rounded-xl p-8 text-center">
            <Heart className="w-10 h-10 text-[#E0D5C5] mx-auto mb-4" />
            <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-2">No saved venues</h3>
            <p className="text-[14px] text-[#8C7B66] font-light mb-6">Tap the heart icon on any venue to save it for later.</p>
            <Link href="/venues" className="inline-flex items-center gap-2 text-[13px] text-[#D4654A] font-light hover:underline">
              Explore venues <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <AuthGuard>
        <DashboardContent />
      </AuthGuard>
      <Footer />
    </main>
  );
}
