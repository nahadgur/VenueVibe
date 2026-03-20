'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
  faqs: { question: string; answer: string }[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`bg-white border rounded-xl overflow-hidden transition-colors duration-300 ${
              isOpen ? 'border-[#C4AE8F]' : 'border-[#E0D5C5]'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left group"
            >
              <span className="text-[15px] font-[Georgia,serif] font-normal text-[#2C2418] pr-4 leading-snug">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#A69580] shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5 pt-0">
                <p className="text-[14px] text-[#5C4E3C] font-light leading-[1.8]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
