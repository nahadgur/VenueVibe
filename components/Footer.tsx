import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2C2418] border-t border-[#3D3226] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#F5F0EA] font-[Georgia,serif] text-xl tracking-tight">VenueVibe</span>
            </Link>
            <p className="text-[#A69580] text-[14px] leading-relaxed max-w-xs font-light">Discover and book the most unique and inspiring spaces for your next event, meeting, or production.</p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-[#5C4E3C] flex items-center justify-center text-[#A69580] hover:text-[#F5F0EA] hover:border-[#F5F0EA]/40 transition-all duration-300">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[#F5F0EA] font-[Georgia,serif] font-normal text-lg mb-6">Explore</h3>
            <ul className="space-y-3.5">
              {['Browse Venues', 'Top Destinations', 'Event Types', 'Inspiration Blog', 'Gift Cards'].map((item) => (
                <li key={item}><Link href={`/${item.toLowerCase().replace(/\s/g, '-')}`} className="text-[#A69580] hover:text-[#F5F0EA] text-[14px] font-light transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#F5F0EA] font-[Georgia,serif] font-normal text-lg mb-6">For hosts</h3>
            <ul className="space-y-3.5">
              {['List your Space', 'Host Resources', 'Community Forum', 'Trust & Safety', 'Host FAQ'].map((item) => (
                <li key={item}><Link href={`/${item.toLowerCase().replace(/\s/g, '-')}`} className="text-[#A69580] hover:text-[#F5F0EA] text-[14px] font-light transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#F5F0EA] font-[Georgia,serif] font-normal text-lg mb-6">Contact us</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#5C4E3C] shrink-0 mt-0.5" /><span className="text-[#A69580] text-[14px] font-light leading-relaxed">123 Innovation Drive, Tech City, TC 90210</span></li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#5C4E3C] shrink-0" /><span className="text-[#A69580] text-[14px] font-light">+1 (555) 123-4567</span></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#5C4E3C] shrink-0" /><span className="text-[#A69580] text-[14px] font-light">hello@venuevibe.com</span></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#3D3226] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#5C4E3C] text-[12px] font-light">&copy; {new Date().getFullYear()} VenueVibe Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Terms', 'Privacy', 'Sitemap'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-[#5C4E3C] hover:text-[#A69580] text-[12px] font-light transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
