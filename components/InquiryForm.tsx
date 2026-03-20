'use client';

import { useState } from 'react';
import { CalendarDays, Users, Send, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

interface InquiryFormProps {
  venueTitle: string;
  venueId: string;
  pricePerHour: number;
}

export default function InquiryForm({ venueTitle, venueId, pricePerHour }: InquiryFormProps) {
  const { user, signInWithGoogle } = useAuth();
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!user || !date) return;
    setSubmitting(true);

    // In production, this would write to Firestore + trigger an email
    await new Promise((r) => setTimeout(r, 1000));

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-2">Inquiry sent</h3>
        <p className="text-[13px] text-[#8C7B66] font-light">The host will respond within 24 hours. Check your email for updates.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E0D5C5] rounded-xl p-6">
      {/* Price */}
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-2xl font-[Georgia,serif] text-[#2C2418]">£{pricePerHour}</span>
        <span className="text-[13px] text-[#A69580] font-light">/ hour</span>
      </div>

      {!user ? (
        <div className="text-center py-4">
          <p className="text-[#8C7B66] text-[13px] font-light mb-4">Sign in to inquire about this space</p>
          <button
            onClick={signInWithGoogle}
            className="w-full py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
          >
            Sign in to continue
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Date */}
          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Event date</label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg pl-10 pr-4 py-3 text-[#2C2418] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Number of guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4AE8F]" />
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="Estimated headcount"
                className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg pl-10 pr-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the host about your event..."
              rows={3}
              className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg p-4 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting || !date}
            className="w-full py-3.5 bg-[#D4654A] text-white text-[13px] font-medium rounded-lg hover:bg-[#C05A42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <><Send className="w-4 h-4" />Send inquiry</>
            )}
          </button>

          <p className="text-[11px] text-[#C4AE8F] font-light text-center">
            No charge until the host confirms your booking
          </p>
        </div>
      )}
    </div>
  );
}
