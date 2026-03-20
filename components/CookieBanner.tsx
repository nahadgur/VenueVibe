'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

type ConsentState = 'undecided' | 'accepted' | 'rejected' | 'custom';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

export default function CookieBanner() {
  const [state, setState] = useState<ConsentState>('undecided');
  const [showCustom, setShowCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [functional, setFunctional] = useState(false);

  useEffect(() => {
    const existing = getCookie('cookie_consent');
    if (existing) {
      setState(existing as ConsentState);
    }
  }, []);

  const accept = () => {
    setCookie('cookie_consent', 'accepted', 365);
    setState('accepted');
  };

  const reject = () => {
    setCookie('cookie_consent', 'rejected', 365);
    setState('rejected');
  };

  const saveCustom = () => {
    const prefs = { analytics, functional };
    setCookie('cookie_consent', 'custom', 365);
    setCookie('cookie_prefs', JSON.stringify(prefs), 365);
    setState('custom');
  };

  // Don't render if user has already decided
  if (state !== 'undecided') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white border border-[#E0D5C5] rounded-2xl shadow-lg overflow-hidden">
        {!showCustom ? (
          // ── Main banner ──
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418] mb-2">We value your privacy</h3>
                <p className="text-[13px] text-[#8C7B66] font-light leading-relaxed">
                  We use cookies to improve your experience, analyse traffic, and personalise content. You can accept all cookies, reject non-essential ones, or{' '}
                  <button onClick={() => setShowCustom(true)} className="text-[#D4654A] hover:underline">
                    customise your preferences
                  </button>. Read our{' '}
                  <Link href="/cookie-policy" className="text-[#D4654A] hover:underline">cookie policy</Link>.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={accept}
                className="px-5 py-2.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
              >
                Accept all
              </button>
              <button
                onClick={reject}
                className="px-5 py-2.5 bg-transparent text-[#5C4E3C] text-[13px] font-light rounded-lg border border-[#E0D5C5] hover:border-[#C4AE8F] transition-colors"
              >
                Reject non-essential
              </button>
              <button
                onClick={() => setShowCustom(true)}
                className="px-5 py-2.5 text-[#8C7B66] text-[13px] font-light hover:text-[#2C2418] transition-colors"
              >
                Customise
              </button>
            </div>
          </div>
        ) : (
          // ── Custom preferences ──
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418]">Cookie preferences</h3>
              <button onClick={() => setShowCustom(false)} className="p-1 rounded-lg hover:bg-[#EDE5D8] transition-colors">
                <X className="w-4 h-4 text-[#8C7B66]" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Strictly necessary — always on */}
              <div className="flex items-center justify-between py-3 border-b border-[#E0D5C5]">
                <div>
                  <p className="text-[14px] font-medium text-[#2C2418]">Strictly necessary</p>
                  <p className="text-[12px] text-[#A69580] font-light">Required for the site to function. Cannot be disabled.</p>
                </div>
                <div className="w-10 h-6 rounded-full bg-[#2C2418] relative shrink-0 cursor-not-allowed">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between py-3 border-b border-[#E0D5C5]">
                <div>
                  <p className="text-[14px] font-medium text-[#2C2418]">Analytics</p>
                  <p className="text-[12px] text-[#A69580] font-light">Help us understand how visitors use the site.</p>
                </div>
                <button
                  onClick={() => setAnalytics(!analytics)}
                  className={`w-10 h-6 rounded-full relative shrink-0 transition-colors ${analytics ? 'bg-[#D4654A]' : 'bg-[#E0D5C5]'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${analytics ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              {/* Functional */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-[14px] font-medium text-[#2C2418]">Functional</p>
                  <p className="text-[12px] text-[#A69580] font-light">Remember your search preferences and saved venues.</p>
                </div>
                <button
                  onClick={() => setFunctional(!functional)}
                  className={`w-10 h-6 rounded-full relative shrink-0 transition-colors ${functional ? 'bg-[#D4654A]' : 'bg-[#E0D5C5]'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${functional ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            <button
              onClick={saveCustom}
              className="w-full py-2.5 bg-[#2C2418] text-[#F5F0EA] text-[13px] font-medium rounded-lg hover:bg-[#3D3226] transition-colors"
            >
              Save preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
