import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-display font-bold text-xl italic">V</span>
              </div>
              <span className="text-white font-display font-light text-2xl tracking-widest uppercase">VenueVibe</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs font-light">
              Discover and book the most unique and inspiring spaces for your next event, meeting, or production.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-light text-lg mb-8 tracking-widest uppercase">Explore</h3>
            <ul className="space-y-4">
              <li><Link href="/venues" className="text-white/50 hover:text-white text-sm font-light transition-colors">Browse Venues</Link></li>
              <li><Link href="/destinations" className="text-white/50 hover:text-white text-sm font-light transition-colors">Top Destinations</Link></li>
              <li><Link href="/event-types" className="text-white/50 hover:text-white text-sm font-light transition-colors">Event Types</Link></li>
              <li><Link href="/blog" className="text-white/50 hover:text-white text-sm font-light transition-colors">Inspiration Blog</Link></li>
              <li><Link href="/gift-cards" className="text-white/50 hover:text-white text-sm font-light transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Hosts */}
          <div>
            <h3 className="text-white font-display font-light text-lg mb-8 tracking-widest uppercase">For Hosts</h3>
            <ul className="space-y-4">
              <li><Link href="/list-venue" className="text-white/50 hover:text-white text-sm font-light transition-colors">List your Space</Link></li>
              <li><Link href="/host-resources" className="text-white/50 hover:text-white text-sm font-light transition-colors">Host Resources</Link></li>
              <li><Link href="/community" className="text-white/50 hover:text-white text-sm font-light transition-colors">Community Forum</Link></li>
              <li><Link href="/trust-safety" className="text-white/50 hover:text-white text-sm font-light transition-colors">Trust & Safety</Link></li>
              <li><Link href="/host-faq" className="text-white/50 hover:text-white text-sm font-light transition-colors">Host FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-display font-light text-lg mb-8 tracking-widest uppercase">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
                <span className="text-white/50 text-sm font-light leading-relaxed">123 Innovation Drive, Tech City, TC 90210</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-white/30 shrink-0" />
                <span className="text-white/50 text-sm font-light">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-white/30 shrink-0" />
                <span className="text-white/50 text-sm font-light">hello@venuevibe.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-xs tracking-wider uppercase">
            &copy; {new Date().getFullYear()} VenueVibe Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/terms" className="text-white/30 hover:text-white text-xs tracking-wider uppercase transition-colors">Terms</Link>
            <Link href="/privacy" className="text-white/30 hover:text-white text-xs tracking-wider uppercase transition-colors">Privacy</Link>
            <Link href="/sitemap" className="text-white/30 hover:text-white text-xs tracking-wider uppercase transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
