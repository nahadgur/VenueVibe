'use client';

import { useState, useEffect } from 'react';
import { Star, User, Loader2, ThumbsUp, ThumbsDown, MessageSquare, Filter, Send } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import type { Review } from '@/lib/types';
import { EVENT_TYPES } from '@/lib/locations';

// ── Star Rating Input ──

function StarInput({ rating, onChange }: { rating: number; onChange: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="p-2 transition-colors">
          <Star className={`w-6 h-6 sm:w-5 sm:h-5 transition-colors ${star <= (hover || rating) ? 'fill-[#D4654A] text-[#D4654A]' : 'text-[#E0D5C5]'}`} />
        </button>
      ))}
    </div>
  );
}

// ── Review Form ──

function ReviewForm({ venueId, onSubmitted }: { venueId: string; onSubmitted: () => void }) {
  const { user, signInWithGoogle } = useAuth();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [wasAsPictured, setWasAsPictured] = useState<boolean | null>(null);
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [improvement, setImprovement] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-6 text-center">
        <p className="text-[#8C7B66] text-[14px] font-light mb-4">Sign in to leave a review</p>
        <button onClick={signInWithGoogle} className="px-6 py-2.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors">Sign in with Google</button>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (rating === 0 || !body.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        venueId, userId: user.uid, userName: user.displayName || 'Anonymous', userPhoto: user.photoURL || '',
        rating, title: title.trim(), body: body.trim(), eventType: eventType.trim(),
        guestCount: Number(guestCount) || null,
        wasAsPictured, wouldRecommend,
        improvementSuggestion: improvement.trim() || null,
        bookingVerified: false,
        createdAt: new Date().toISOString(),
      });
      setRating(0); setTitle(''); setBody(''); setEventType(''); setGuestCount('');
      setWasAsPictured(null); setWouldRecommend(null); setImprovement('');
      onSubmitted();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="bg-white border border-[#E0D5C5] rounded-xl p-6">
      <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-5">Write a review</h3>
      <div className="space-y-5">
        <div>
          <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Rating</label>
          <StarInput rating={rating} onChange={setRating} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Event type</label>
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg px-4 py-2.5 text-[#2C2418] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors appearance-none">
              <option value="">Select event type...</option>
              {EVENT_TYPES.map(et => <option key={et.slug} value={et.name}>{et.name}</option>)}
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Guest count <span className="text-[#C4AE8F]">(optional)</span></label>
            <input type="number" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} placeholder="e.g., 50" className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg px-4 py-2.5 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Review title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Summarise your experience" className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-2 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors text-[14px] font-light" />
        </div>

        <div>
          <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Your review</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="What did you love? Any tips for future guests?" rows={4} className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg p-4 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors resize-none text-[14px] font-light" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F8F4EE] rounded-lg">
          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Was the venue as pictured?</label>
            <div className="flex gap-2">
              <button onClick={() => setWasAsPictured(true)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-[12px] font-light transition-all ${wasAsPictured === true ? 'bg-green-600 text-white border-green-600' : 'text-[#8C7B66] border-[#E0D5C5]'}`}><ThumbsUp className="w-3 h-3" />Yes</button>
              <button onClick={() => setWasAsPictured(false)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-[12px] font-light transition-all ${wasAsPictured === false ? 'bg-red-500 text-white border-red-500' : 'text-[#8C7B66] border-[#E0D5C5]'}`}><ThumbsDown className="w-3 h-3" />No</button>
            </div>
          </div>
          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Would you recommend?</label>
            <div className="flex gap-2">
              <button onClick={() => setWouldRecommend(true)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-[12px] font-light transition-all ${wouldRecommend === true ? 'bg-green-600 text-white border-green-600' : 'text-[#8C7B66] border-[#E0D5C5]'}`}><ThumbsUp className="w-3 h-3" />Yes</button>
              <button onClick={() => setWouldRecommend(false)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-[12px] font-light transition-all ${wouldRecommend === false ? 'bg-red-500 text-white border-red-500' : 'text-[#8C7B66] border-[#E0D5C5]'}`}><ThumbsDown className="w-3 h-3" />No</button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">What could be improved? <span className="text-[#C4AE8F]">(optional)</span></label>
          <input type="text" value={improvement} onChange={(e) => setImprovement(e.target.value)} placeholder="Any suggestions for the host?" className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-2 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors text-[14px] font-light" />
        </div>

        <button onClick={handleSubmit} disabled={submitting || rating === 0 || !body.trim()} className="px-6 py-2.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {submitting ? 'Submitting...' : 'Submit review'}
        </button>
      </div>
    </div>
  );
}

// ── Single Review Card ──

function ReviewCard({ review, isHost, onResponseSent }: { review: Review; isHost: boolean; onResponseSent: () => void }) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      const now = new Date().toISOString();
      await updateDoc(doc(db, 'reviews', review.id), {
        hostResponse: replyText.trim(),
        hostRespondedAt: now,
      });
      setReplying(false);
      setReplyText('');
      onResponseSent();
    } catch (err) {
      console.error('Error saving host response:', err);
      alert('Failed to save response.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white border border-[#E0D5C5] rounded-xl p-6">
      <div className="flex items-start gap-4 mb-4">
        {review.userPhoto ? (
          <Image src={review.userPhoto} alt={review.userName} width={40} height={40} className="rounded-full border border-[#E0D5C5]" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#EDE5D8] flex items-center justify-center shrink-0"><User className="w-5 h-5 text-[#8C7B66]" /></div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-1">
            <span className="text-[14px] font-medium text-[#2C2418]">{review.userName}</span>
            <span className="text-[12px] text-[#C4AE8F] font-light shrink-0">
              {new Date(review.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-[#D4654A] text-[#D4654A]' : 'text-[#E0D5C5]'}`} />
              ))}
            </div>
            {review.eventType && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-light bg-[#EDE5D8] text-[#8C7B66]">{review.eventType}</span>
            )}
            {review.guestCount && (
              <span className="text-[11px] text-[#A69580] font-light">{review.guestCount} guests</span>
            )}
            {review.bookingVerified && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-700 border border-green-200">Verified booking</span>
            )}
          </div>

          {review.title && <h4 className="text-[14px] font-medium text-[#2C2418] mb-2">{review.title}</h4>}
          <p className="text-[14px] text-[#5C4E3C] font-light leading-relaxed">{review.body}</p>

          {(review.wasAsPictured !== undefined || review.wouldRecommend !== undefined) && (
            <div className="flex gap-3 mt-3">
              {review.wasAsPictured !== undefined && (
                <span className={`inline-flex items-center gap-1 text-[11px] font-light ${review.wasAsPictured ? 'text-green-600' : 'text-red-500'}`}>
                  {review.wasAsPictured ? <ThumbsUp className="w-3 h-3" /> : <ThumbsDown className="w-3 h-3" />}
                  {review.wasAsPictured ? 'As pictured' : 'Not as pictured'}
                </span>
              )}
              {review.wouldRecommend !== undefined && (
                <span className={`inline-flex items-center gap-1 text-[11px] font-light ${review.wouldRecommend ? 'text-green-600' : 'text-red-500'}`}>
                  {review.wouldRecommend ? <ThumbsUp className="w-3 h-3" /> : <ThumbsDown className="w-3 h-3" />}
                  {review.wouldRecommend ? 'Recommends' : 'Does not recommend'}
                </span>
              )}
            </div>
          )}

          {/* Existing host response */}
          {review.hostResponse && (
            <div className="mt-4 ml-4 pl-4 border-l-2 border-[#D4654A]/20">
              <p className="text-[11px] text-[#D4654A] font-medium mb-1 flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />Host response
              </p>
              <p className="text-[13px] text-[#5C4E3C] font-light leading-relaxed">{review.hostResponse}</p>
              {review.hostRespondedAt && (
                <p className="text-[10px] text-[#C4AE8F] font-light mt-1">
                  {new Date(review.hostRespondedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              )}
            </div>
          )}

          {/* Host reply button — only if host, no existing response */}
          {isHost && !review.hostResponse && !replying && (
            <button
              onClick={() => setReplying(true)}
              className="mt-4 flex items-center gap-1.5 text-[12px] text-[#D4654A] font-light hover:underline"
            >
              <MessageSquare className="w-3 h-3" />Reply to this review
            </button>
          )}

          {/* Reply form */}
          {replying && (
            <div className="mt-4 space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Thank the reviewer, address feedback, or add helpful context for future guests..."
                rows={3}
                autoFocus
                className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg p-4 text-[#2C2418] placeholder-[#C4AE8F] text-[13px] font-light focus:outline-none focus:border-[#D4654A] transition-colors resize-none"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendReply}
                  disabled={sending || !replyText.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#D4654A] text-white text-[12px] font-medium rounded-lg hover:bg-[#C05A42] transition-colors disabled:opacity-50"
                >
                  {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                  {sending ? 'Sending...' : 'Post response'}
                </button>
                <button
                  onClick={() => { setReplying(false); setReplyText(''); }}
                  className="px-3 py-2 text-[12px] text-[#8C7B66] font-light hover:text-[#2C2418] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Reviews Section ──

export default function Reviews({ venueId, hostId }: { venueId: string; hostId?: string }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filterEventType, setFilterEventType] = useState<string>('');

  const isHost = !!(user && hostId && user.uid === hostId);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, 'reviews'), where('venueId', '==', venueId), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setReviews(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Review[]);
      } catch (error) { console.error('Error fetching reviews:', error); }
      finally { setLoading(false); }
    };
    fetchReviews();
  }, [venueId, refreshKey]);

  const avgRating = reviews.length > 0 ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10 : 0;
  const asPicturedPct = reviews.filter(r => r.wasAsPictured !== undefined).length > 0
    ? Math.round((reviews.filter(r => r.wasAsPictured === true).length / reviews.filter(r => r.wasAsPictured !== undefined).length) * 100) : null;
  const recommendPct = reviews.filter(r => r.wouldRecommend !== undefined).length > 0
    ? Math.round((reviews.filter(r => r.wouldRecommend === true).length / reviews.filter(r => r.wouldRecommend !== undefined).length) * 100) : null;

  const eventTypes = [...new Set(reviews.map(r => r.eventType).filter(Boolean))] as string[];
  const filteredReviews = filterEventType ? reviews.filter(r => r.eventType === filterEventType) : reviews;

  return (
    <section className="mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] tracking-tight">Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-4 mt-1 flex-wrap">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#D4654A] text-[#D4654A]" />
                <span className="text-[14px] text-[#2C2418] font-light">{avgRating}</span>
                <span className="text-[13px] text-[#A69580] font-light">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
              </div>
              {asPicturedPct !== null && (
                <span className="text-[12px] text-[#8C7B66] font-light">{asPicturedPct}% say as pictured</span>
              )}
              {recommendPct !== null && (
                <span className="text-[12px] text-[#8C7B66] font-light">{recommendPct}% recommend</span>
              )}
            </div>
          )}
        </div>

        {eventTypes.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-3.5 h-3.5 text-[#A69580] shrink-0" />
            <button onClick={() => setFilterEventType('')} className={`px-3 py-1.5 rounded-lg text-[11px] font-light shrink-0 transition-all ${!filterEventType ? 'bg-[#2C2418] text-[#F5F0EA]' : 'text-[#8C7B66] border border-[#E0D5C5]'}`}>All</button>
            {eventTypes.map(et => (
              <button key={et} onClick={() => setFilterEventType(et)} className={`px-3 py-1.5 rounded-lg text-[11px] font-light shrink-0 transition-all ${filterEventType === et ? 'bg-[#2C2418] text-[#F5F0EA]' : 'text-[#8C7B66] border border-[#E0D5C5]'}`}>{et}</button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-[#C4AE8F] animate-spin" /></div>
      ) : (
        <div className="space-y-6">
          <ReviewForm venueId={venueId} onSubmitted={() => setRefreshKey(k => k + 1)} />
          {filteredReviews.length > 0 ? (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} isHost={isHost} onResponseSent={() => setRefreshKey(k => k + 1)} />
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <p className="text-center py-8 text-[#8C7B66] text-[14px] font-light">No reviews for this event type yet.</p>
          ) : (
            <div className="text-center py-10 border border-[#E0D5C5] border-dashed rounded-xl">
              <p className="text-[#8C7B66] text-[14px] font-light">No reviews yet. Be the first to share your experience.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
