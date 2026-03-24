'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building, Plus, Star, MapPin, Users, PoundSterling, Loader2, MoreVertical, Eye, Pencil, Trash2, MessageSquare, Calendar, Tag, Send, Clock, CheckCircle, XCircle, AlertCircle, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/firebase';
import { collection, getDocs, query, where, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import type { Venue } from '@/lib/types';
import type { Inquiry } from '@/lib/types';

function HostContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'venues' | 'inquiries'>('venues');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [sendingResponse, setSendingResponse] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        // Fetch venues
        const vq = query(
          collection(db, 'venues'),
          where('hostId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const vSnap = await getDocs(vq);
        setVenues(vSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Venue)));

        // Fetch inquiries for this host
        const iq = query(
          collection(db, 'inquiries'),
          where('hostId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const iSnap = await getDocs(iq);
        setInquiries(iSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Inquiry)));
      } catch (error) {
        console.error('Error fetching host data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const handleRespond = async (inquiryId: string) => {
    if (!responseText.trim()) return;
    setSendingResponse(true);
    try {
      const now = new Date().toISOString();
      await updateDoc(doc(db, 'inquiries', inquiryId), {
        status: 'responded',
        hostResponse: responseText.trim(),
        hostRespondedAt: now,
        updatedAt: now,
      });

      // Update local state
      setInquiries(prev => prev.map(inq =>
        inq.id === inquiryId
          ? { ...inq, status: 'responded' as const, hostResponse: responseText.trim(), hostRespondedAt: now }
          : inq
      ));

      // Calculate and update average response time on the venue
      const inquiry = inquiries.find(i => i.id === inquiryId);
      if (inquiry) {
        const responseMinutes = Math.round(
          (new Date(now).getTime() - new Date(inquiry.createdAt).getTime()) / 60000
        );
        // Get all responded inquiries for this venue to calculate average
        const venueInquiries = inquiries.filter(i => i.venueId === inquiry.venueId && (i.hostRespondedAt || i.id === inquiryId));
        const allResponseTimes = venueInquiries.map(i => {
          if (i.id === inquiryId) return responseMinutes;
          if (i.hostRespondedAt) return Math.round((new Date(i.hostRespondedAt).getTime() - new Date(i.createdAt).getTime()) / 60000);
          return null;
        }).filter(Boolean) as number[];

        if (allResponseTimes.length > 0) {
          const avgResponseMinutes = Math.round(allResponseTimes.reduce((a, b) => a + b, 0) / allResponseTimes.length);
          const responseRate = Math.round((venueInquiries.length / inquiries.filter(i => i.venueId === inquiry.venueId).length) * 100);
          try {
            await updateDoc(doc(db, 'venues', inquiry.venueId), {
              avgResponseMinutes,
              responseRate,
            });
          } catch (e) {
            console.error('Could not update venue response stats:', e);
          }
        }
      }

      setRespondingTo(null);
      setResponseText('');
    } catch (error) {
      console.error('Error responding to inquiry:', error);
      alert('Failed to send response.');
    } finally {
      setSendingResponse(false);
    }
  };

  const handleDecline = async (inquiryId: string) => {
    if (!confirm('Decline this inquiry?')) return;
    try {
      await updateDoc(doc(db, 'inquiries', inquiryId), {
        status: 'declined',
        updatedAt: new Date().toISOString(),
      });
      setInquiries(prev => prev.map(inq =>
        inq.id === inquiryId ? { ...inq, status: 'declined' as const } : inq
      ));
    } catch (error) {
      console.error('Error declining inquiry:', error);
    }
  };

  const pendingCount = inquiries.filter(i => i.status === 'pending').length;

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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active listings', value: venues.length, icon: Building },
          { label: 'Inquiries', value: inquiries.length, icon: MessageSquare },
          { label: 'Pending', value: pendingCount, icon: AlertCircle },
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

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab('venues')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-light transition-all ${activeTab === 'venues' ? 'bg-[#2C2418] text-[#F5F0EA]' : 'bg-white text-[#8C7B66] border border-[#E0D5C5] hover:border-[#C4AE8F]'}`}
        >
          <Building className="w-3.5 h-3.5" />Venues
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-light transition-all ${activeTab === 'inquiries' ? 'bg-[#2C2418] text-[#F5F0EA]' : 'bg-white text-[#8C7B66] border border-[#E0D5C5] hover:border-[#C4AE8F]'}`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Inquiries
          {pendingCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#D4654A] text-white text-[10px] font-medium flex items-center justify-center">{pendingCount}</span>
          )}
        </button>
      </div>

      {/* ── Venues tab ── */}
      {activeTab === 'venues' && (
        loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-[#C4AE8F] animate-spin" /></div>
        ) : venues.length > 0 ? (
          <div className="space-y-4">
            {venues.map((venue) => (
              <div key={venue.id} className="bg-white border border-[#E0D5C5] rounded-xl hover:border-[#C4AE8F] transition-colors">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0 overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none">
                    <Image src={venue.imageUrl} alt={venue.title} fill sizes="(max-width: 640px) 100vw, 192px" quality={70} className="object-cover" referrerPolicy="no-referrer" />
                  </div>
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
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/venue/${venue.id}`} className="px-4 py-2.5 rounded-lg border border-[#E0D5C5] text-[12px] text-[#5C4E3C] font-light hover:border-[#C4AE8F] transition-colors flex items-center gap-1.5 min-h-[44px]">
                        <Eye className="w-3 h-3" />View
                      </Link>
                      <div className="relative">
                        <button onClick={() => setMenuOpen(menuOpen === venue.id ? null : venue.id)} className="p-2.5 rounded-lg border border-[#E0D5C5] text-[#A69580] hover:border-[#C4AE8F] hover:text-[#5C4E3C] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {menuOpen === venue.id && (
                          <>
                            <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(null)} />
                            <div className="absolute right-0 bottom-full mb-1 w-40 bg-white border border-[#E0D5C5] rounded-lg shadow-lg z-30 overflow-hidden">
                              <Link href={`/host/manage/${venue.id}/edit`} onClick={() => setMenuOpen(null)} className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#5C4E3C] font-light hover:bg-[#F8F4EE] transition-colors text-left">
                                <Pencil className="w-3.5 h-3.5" />Edit listing
                              </Link>
                              <button onClick={() => { setMenuOpen(null); handleDelete(venue.id); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-red-600 font-light hover:bg-red-50 transition-colors text-left">
                                <Trash2 className="w-3.5 h-3.5" />Delete listing
                              </button>
                            </div>
                          </>
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
            <Link href="/list-venue" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors">
              <Plus className="w-4 h-4" />List your venue
            </Link>
          </div>
        )
      )}

      {/* ── Inquiries tab ── */}
      {activeTab === 'inquiries' && (
        loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-[#C4AE8F] animate-spin" /></div>
        ) : inquiries.length > 0 ? (
          <div className="space-y-4">
            {inquiries.map((inq) => {
              const statusConfig: Record<string, { icon: typeof AlertCircle; label: string; bg: string; text: string; border: string }> = {
                pending: { icon: AlertCircle, label: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
                responded: { icon: MessageSquare, label: 'Responded', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
                confirmed: { icon: CheckCircle, label: 'Confirmed', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
                declined: { icon: XCircle, label: 'Declined', bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200' },
                expired: { icon: Clock, label: 'Expired', bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
              };
              const sc = statusConfig[inq.status] || statusConfig.pending;
              const isResponding = respondingTo === inq.id;

              return (
                <div key={inq.id} className={`bg-white border rounded-xl p-5 sm:p-6 transition-colors ${inq.status === 'pending' ? 'border-amber-200' : 'border-[#E0D5C5]'}`}>
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Link href={`/venue/${inq.venueId}`} className="text-[15px] font-[Georgia,serif] text-[#2C2418] hover:text-[#D4654A] transition-colors truncate">
                          {inq.venueTitle || 'Venue'}
                        </Link>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${sc.bg} ${sc.text} border ${sc.border} shrink-0`}>
                          <sc.icon className="w-3 h-3" />{sc.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-[#A69580] font-light">
                        <span>From {inq.userName}</span>
                        <span className="text-[#D4CEC4]">·</span>
                        <span>{new Date(inq.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="text-[#D4CEC4]">·</span>
                        <span>{inq.userEmail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="flex flex-wrap gap-4 text-[13px] text-[#8C7B66] font-light mb-3">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#A69580]" />{new Date(inq.eventDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    {inq.guestCount && <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#A69580]" />{inq.guestCount} guests</span>}
                    {inq.eventType && <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-[#A69580]" />{inq.eventType}</span>}
                  </div>

                  {/* Message */}
                  {inq.message && (
                    <div className="bg-[#F8F4EE] rounded-lg p-4 mb-4">
                      <p className="text-[13px] text-[#5C4E3C] font-light leading-relaxed">{inq.message}</p>
                    </div>
                  )}

                  {/* Existing host response */}
                  {inq.hostResponse && (
                    <div className="ml-4 pl-4 border-l-2 border-[#D4654A]/20 mb-4">
                      <p className="text-[11px] text-[#D4654A] font-medium mb-1">Your response</p>
                      <p className="text-[13px] text-[#5C4E3C] font-light leading-relaxed">{inq.hostResponse}</p>
                      {inq.hostRespondedAt && (
                        <p className="text-[10px] text-[#C4AE8F] font-light mt-1">
                          {new Date(inq.hostRespondedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions for pending inquiries */}
                  {inq.status === 'pending' && !isResponding && (
                    <div className="flex items-center gap-2 pt-3 border-t border-[#E0D5C5]">
                      <button
                        onClick={() => { setRespondingTo(inq.id); setResponseText(''); }}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-[#2C2418] text-[#F5F0EA] text-[12px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
                      >
                        <Send className="w-3 h-3" />Respond
                      </button>
                      <button
                        onClick={() => handleDecline(inq.id)}
                        className="flex items-center gap-1.5 px-4 py-2.5 border border-[#E0D5C5] text-[12px] text-[#8C7B66] font-light rounded-lg hover:border-red-300 hover:text-red-500 transition-colors"
                      >
                        <XCircle className="w-3 h-3" />Decline
                      </button>
                    </div>
                  )}

                  {/* Response form */}
                  {isResponding && (
                    <div className="pt-3 border-t border-[#E0D5C5] space-y-3">
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Write your response to the planner..."
                        rows={3}
                        autoFocus
                        className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg p-4 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors resize-none"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRespond(inq.id)}
                          disabled={sendingResponse || !responseText.trim()}
                          className="flex items-center gap-1.5 px-5 py-2.5 bg-[#D4654A] text-white text-[12px] font-medium rounded-lg hover:bg-[#C05A42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {sendingResponse ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                          {sendingResponse ? 'Sending...' : 'Send response'}
                        </button>
                        <button
                          onClick={() => setRespondingTo(null)}
                          className="px-4 py-2.5 text-[12px] text-[#8C7B66] font-light hover:text-[#2C2418] transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#E0D5C5] rounded-xl p-12 text-center">
            <MessageSquare className="w-12 h-12 text-[#E0D5C5] mx-auto mb-4" />
            <h3 className="text-xl font-[Georgia,serif] text-[#2C2418] mb-3">No inquiries yet</h3>
            <p className="text-[14px] text-[#8C7B66] font-light mb-4 max-w-sm mx-auto">
              When event planners inquire about your venues, they will appear here.
            </p>
          </div>
        )
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
