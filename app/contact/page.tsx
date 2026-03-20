'use client';

import { useState } from 'react';
import { Mail, MapPin, Clock, Send, Loader2, Check, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { type BreadcrumbItem } from '@/lib/locations';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const crumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ];

  const update = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!formData.email || !formData.message) return;
    setSubmitting(true);
    // In production: write to Firestore or call an API endpoint
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#F5F0EA] selection:bg-[rgba(212,101,74,0.2)]">
      <Navbar />
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Breadcrumbs items={crumbs} />

        <p className="text-[#D4654A] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">Get in touch</p>
        <h1 className="text-3xl md:text-5xl font-[Georgia,serif] font-normal text-[#2C2418] mb-4 tracking-tight">
          Contact <span className="italic text-[#8C7B66]">us</span>
        </h1>
        <p className="text-[#8C7B66] text-[15px] font-light max-w-xl mb-16 leading-relaxed">
          Have a question, suggestion, or partnership inquiry? We&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── Form ── */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white border border-[#E0D5C5] rounded-xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-xl font-[Georgia,serif] text-[#2C2418] mb-3">Message sent</h2>
                <p className="text-[14px] text-[#8C7B66] font-light">Thanks for reaching out. We&apos;ll get back to you within 24 hours during UK business hours.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#E0D5C5] rounded-xl p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Your name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => update('name', e.target.value)}
                        className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg px-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Email address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg px-4 py-3 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg px-4 py-3 text-[#2C2418] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select a topic...</option>
                      <option value="booking">Booking inquiry</option>
                      <option value="hosting">Listing a venue</option>
                      <option value="support">Account support</option>
                      <option value="partnership">Partnership</option>
                      <option value="press">Press inquiry</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A69580] tracking-[0.1em] mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => update('message', e.target.value)}
                      rows={5}
                      className="w-full bg-[#F8F4EE] border border-[#E0D5C5] rounded-lg p-4 text-[#2C2418] placeholder-[#C4AE8F] text-[14px] font-light focus:outline-none focus:border-[#D4654A] transition-colors resize-none"
                      placeholder="How can we help?"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !formData.email || !formData.message}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#D4654A] text-white text-[13px] font-medium rounded-lg hover:bg-[#C05A42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {submitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar info ── */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E0D5C5] rounded-xl p-6">
              <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418] mb-5">Get in touch</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EDE5D8] border border-[#E0D5C5] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#8C7B66]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#2C2418]">Email</p>
                    <p className="text-[13px] text-[#8C7B66] font-light">hello@venuevibe.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EDE5D8] border border-[#E0D5C5] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#8C7B66]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#2C2418]">Location</p>
                    <p className="text-[13px] text-[#8C7B66] font-light">London, United Kingdom</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EDE5D8] border border-[#E0D5C5] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#8C7B66]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#2C2418]">Response time</p>
                    <p className="text-[13px] text-[#8C7B66] font-light">Within 24 hours (Mon–Fri)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E0D5C5] rounded-xl p-6">
              <h3 className="text-[15px] font-[Georgia,serif] text-[#2C2418] mb-3">Quick links</h3>
              <div className="space-y-3">
                {[
                  { label: 'Help centre & FAQs', href: '/help', icon: MessageSquare },
                  { label: 'List your venue', href: '/list-venue', icon: MapPin },
                  { label: 'Browse venues', href: '/venues', icon: Mail },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 text-[13px] text-[#8C7B66] font-light hover:text-[#D4654A] transition-colors"
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
