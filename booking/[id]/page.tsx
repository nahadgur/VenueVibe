'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Calendar, Users, MapPin, Clock, Download, ArrowRight, Loader2, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/components/AuthProvider';

// In production this would fetch from a Firestore 'bookings' collection.
// For now we show a confirmation template that works with query params or mock data.

function ConfirmationContent() {
  const { user } = useAuth();
  const params = useParams();
  const bookingId = params.id as string;
  const [loading, setLoading] = useState(true);

  // Mock booking data — replace with Firestore fetch
  const [booking] = useState({
    id: bookingId,
    venueTitle: 'The Glasshouse Loft',
    venueLocation: 'Downtown Manhattan, NY',
    venueImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
    date: '2026-04-15',
    time: '14:00 – 18:00',
    guests: 80,
    hours: 4,
    pricePerHour: 250,
    totalPrice: 1000,
    hostName: 'Sarah Mitchell',
    hostEmail: 'host@example.com',
    status: 'confirmed' as const,
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    // Simulate fetch
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="pt-36 pb-24 flex justify-center">
        <Loader2 className="w-8 h-8 text-[#C4AE8F] animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      {/* Success header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-[Georgia,serif] font-normal text-[#2C2418] mb-3 tracking-tight">
          Booking <span className="italic text-[#8C7B66]">confirmed</span>
        </h1>
        <p className="text-[#8C7B66] text-[14px] font-light">
          Confirmation sent to {user?.email}
        </p>
      </div>

      {/* Receipt card */}
      <div className="bg-white border border-[#E0D5C5] rounded-xl overflow-hidden mb-8">
        {/* Venue header */}
        <div className="flex gap-4 p-6 border-b border-[#E0D5C5]">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
            <Image
              src={booking.venueImage}
              alt={booking.venueTitle}
              fill
              sizes="80px"
              quality={70}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-[16px] font-[Georgia,serif] text-[#2C2418] mb-1">{booking.venueTitle}</h2>
            <p className="flex items-center gap-1.5 text-[13px] text-[#8C7B66] font-light">
              <MapPin className="w-3 h-3" />{booking.venueLocation}
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-px bg-[#E0D5C5]">
          {[
            { icon: Calendar, label: 'Date', value: new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) },
            { icon: Clock, label: 'Time', value: booking.time },
            { icon: Users, label: 'Guests', value: `${booking.guests} people` },
            { icon: Clock, label: 'Duration', value: `${booking.hours} hours` },
          ].map((item) => (
            <div key={item.label} className="bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-1">
                <item.icon className="w-3.5 h-3.5 text-[#A69580]" />
                <span className="text-[11px] text-[#A69580] tracking-[0.05em]">{item.label}</span>
              </div>
              <span className="text-[14px] text-[#2C2418] font-light">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Price breakdown */}
        <div className="p-6 border-t border-[#E0D5C5]">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-[14px]">
              <span className="text-[#8C7B66] font-light">£{booking.pricePerHour} × {booking.hours} hours</span>
              <span className="text-[#2C2418]">£{booking.pricePerHour * booking.hours}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#8C7B66] font-light">Service fee</span>
              <span className="text-[#2C2418]">£0</span>
            </div>
          </div>
          <div className="flex justify-between pt-4 border-t border-[#E0D5C5]">
            <span className="text-[15px] font-medium text-[#2C2418]">Total</span>
            <span className="text-xl font-[Georgia,serif] text-[#2C2418]">£{booking.totalPrice}</span>
          </div>
        </div>

        {/* Booking reference */}
        <div className="px-6 py-4 bg-[#F8F4EE] border-t border-[#E0D5C5]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#A69580] tracking-[0.05em] block mb-0.5">Booking reference</span>
              <span className="text-[14px] font-medium text-[#2C2418] font-mono">{booking.id.toUpperCase().slice(0, 8)}</span>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-green-50 text-green-700 border border-green-200">Confirmed</span>
          </div>
        </div>
      </div>

      {/* Host info */}
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-6 mb-8">
        <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418] mb-4">Your host</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-[#2C2418]">{booking.hostName}</p>
            <p className="text-[13px] text-[#8C7B66] font-light">Usually responds within 2 hours</p>
          </div>
          <a
            href={`mailto:${booking.hostEmail}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E0D5C5] text-[13px] text-[#5C4E3C] font-light hover:border-[#C4AE8F] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />Message
          </a>
        </div>
      </div>

      {/* What's next */}
      <div className="bg-white border border-[#E0D5C5] rounded-xl p-6 mb-8">
        <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418] mb-4">What happens next</h3>
        <div className="space-y-4">
          {[
            { step: '1', text: 'You\'ll receive a confirmation email with all the details above.' },
            { step: '2', text: 'The host may reach out to discuss any specifics for your event.' },
            { step: '3', text: 'Arrive at the venue at your booking time. The host will be there to greet you.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-7 h-7 rounded-full bg-[#EDE5D8] border border-[#E0D5C5] flex items-center justify-center shrink-0 text-[12px] text-[#8C7B66] font-medium">
                {item.step}
              </div>
              <p className="text-[14px] text-[#5C4E3C] font-light leading-relaxed pt-0.5">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/dashboard"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
        >
          View in dashboard <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/venues"
          className="flex-1 flex items-center justify-center px-6 py-3 border border-[#E0D5C5] text-[#5C4E3C] text-[13px] font-light rounded-lg hover:border-[#C4AE8F] transition-colors"
        >
          Browse more venues
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <AuthGuard>
        <ConfirmationContent />
      </AuthGuard>
      <Footer />
    </main>
  );
}
