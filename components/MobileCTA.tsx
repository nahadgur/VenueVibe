'use client';

import { Send } from 'lucide-react';

interface MobileCTAProps {
  price: number;
}

export default function MobileCTA({ price }: MobileCTAProps) {
  const scrollToInquiry = () => {
    const el = document.getElementById('inquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#E0D5C5] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
        <div>
          <span className="text-xl font-[Georgia,serif] text-[#2C2418]">£{price}</span>
          <span className="text-[12px] text-[#A69580] font-light ml-1">/ hour</span>
        </div>
        <button
          onClick={scrollToInquiry}
          className="flex items-center gap-2 px-6 py-3 bg-[#D4654A] text-white text-[13px] font-medium rounded-lg hover:bg-[#C05A42] active:scale-[0.98] transition-all"
        >
          <Send className="w-4 h-4" />
          Send inquiry
        </button>
      </div>
    </div>
  );
}
