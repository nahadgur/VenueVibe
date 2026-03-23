'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageSquare, Calendar, ArrowRight, Clock, Star, MapPin, Loader2, Building } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

interface Inquiry {
  id: string;
  venueId: string;
  venueTitle?: string;
  date: string;
  guests: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'declined';
}

function DashboardContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'reviews' | 'saved'>('inquiries');
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setReviews(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
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
        <div className="bg-white border border-[#E0D5C5] rounded-xl p-8 text-center">
          <MessageSquare className="w-10 h-10 text-[#E0D5C5] mx-auto mb-4" />
          <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-2">No inquiries yet</h3>
          <p className="text-[14px] text-[#8C7B66] font-light mb-6">When you inquire about a venue, it will appear here.</p>
          <Link href="/venues" className="inline-flex items-center gap-2 text-[13px] text-[#D4654A] font-light hover:underline">
            Browse venues <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
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
        <div className="bg-white border border-[#E0D5C5] rounded-xl p-8 text-center">
          <Heart className="w-10 h-10 text-[#E0D5C5] mx-auto mb-4" />
          <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-2">No saved venues</h3>
          <p className="text-[14px] text-[#8C7B66] font-light mb-6">Tap the heart icon on any venue to save it for later.</p>
          <Link href="/venues" className="inline-flex items-center gap-2 text-[13px] text-[#D4654A] font-light hover:underline">
            Explore venues <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
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
