'use client';

import { useState, useEffect } from 'react';
import { Star, User, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import Image from 'next/image';

// ── Types ──

interface Review {
  id: string;
  venueId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  title: string;
  body: string;
  eventType: string;
  createdAt: string;
}

// ── Star Rating Input ──

function StarInput({ rating, onChange }: { rating: number; onChange: (r: number) => void }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="p-0.5 transition-colors"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              star <= (hover || rating)
                ? 'fill-[#D4654A] text-[#D4654A]'
                : 'text-[#E0D5C5]'
            }`}
          />
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
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-6 text-center">
        <p className="text-[#8C7B66] text-[14px] font-light mb-4">Sign in to leave a review</p>
        <button
          onClick={signInWithGoogle}
          className="px-6 py-2.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (rating === 0 || !body.trim()) return;
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'reviews'), {
        venueId,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userPhoto: user.photoURL || '',
        rating,
        title: title.trim(),
        body: body.trim(),
        eventType: eventType.trim(),
        createdAt: new Date().toISOString(),
      });

      setRating(0);
      setTitle('');
      setBody('');
      setEventType('');
      onSubmitted();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#E0D5C5] rounded-xl p-6">
      <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-5">Write a review</h3>

      <div className="space-y-5">
        <div>
          <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Rating</label>
          <StarInput rating={rating} onChange={setRating} />
        </div>

        <div>
          <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">What was the event?</label>
          <input
            type="text"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            placeholder="e.g., Wedding reception, Team offsite"
            className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-2 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors text-[14px] font-light"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Review title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarise your experience"
            className="w-full bg-transparent border-b border-[#E0D5C5] px-0 py-2 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors text-[14px] font-light"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Your review</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What did you love about this venue? Any tips for future guests?"
            rows={4}
            className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg p-4 text-[#2C2418] placeholder-[#C4AE8F] focus:outline-none focus:border-[#D4654A] transition-colors resize-none text-[14px] font-light"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting || rating === 0 || !body.trim()}
          className="px-6 py-2.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {submitting ? 'Submitting...' : 'Submit review'}
        </button>
      </div>
    </div>
  );
}

// ── Review List ──

function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 border border-[#E0D5C5] border-dashed rounded-xl">
        <p className="text-[#8C7B66] text-[14px] font-light">No reviews yet. Be the first to share your experience.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white border border-[#E0D5C5] rounded-xl p-6">
          <div className="flex items-start gap-4 mb-4">
            {review.userPhoto ? (
              <Image
                src={review.userPhoto}
                alt={review.userName}
                width={40}
                height={40}
                className="rounded-full border border-[#E0D5C5]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#EDE5D8] flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-[#8C7B66]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4 mb-1">
                <span className="text-[14px] font-medium text-[#2C2418]">{review.userName}</span>
                <span className="text-[12px] text-[#C4AE8F] font-light shrink-0">
                  {new Date(review.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-[#D4654A] text-[#D4654A]' : 'text-[#E0D5C5]'}`}
                    />
                  ))}
                </div>
                {review.eventType && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-light bg-[#EDE5D8] text-[#8C7B66]">
                    {review.eventType}
                  </span>
                )}
              </div>
              {review.title && (
                <h4 className="text-[14px] font-medium text-[#2C2418] mb-2">{review.title}</h4>
              )}
              <p className="text-[14px] text-[#5C4E3C] font-light leading-relaxed">{review.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Combined Reviews Section ──

export default function Reviews({ venueId }: { venueId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('venueId', '==', venueId),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[];
        setReviews(fetched);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [venueId, refreshKey]);

  const avgRating = reviews.length > 0
    ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-[Georgia,serif] font-normal text-[#2C2418] tracking-tight">
            Reviews
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 fill-[#D4654A] text-[#D4654A]" />
              <span className="text-[14px] text-[#2C2418] font-light">{avgRating}</span>
              <span className="text-[13px] text-[#A69580] font-light">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-[#C4AE8F] animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          <ReviewForm venueId={venueId} onSubmitted={() => setRefreshKey((k) => k + 1)} />
          <ReviewList reviews={reviews} />
        </div>
      )}
    </section>
  );
}
