'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-white font-display font-medium text-2xl tracking-tight uppercase">VenueVibe</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/venues" className="text-[11px] uppercase tracking-[0.15em] font-medium text-white/60 hover:text-white transition-colors">
              Browse Venues
            </Link>
            <Link href="/how-it-works" className="text-[11px] uppercase tracking-[0.15em] font-medium text-white/60 hover:text-white transition-colors">
              How it Works
            </Link>
            <Link href="/list-venue" className="text-[11px] uppercase tracking-[0.15em] font-medium text-white/60 hover:text-white transition-colors">
              List your Venue
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-white/60 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <Image 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      width={32} 
                      height={32} 
                      className="rounded-full border border-white/20"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="text-[11px] uppercase tracking-[0.1em] font-medium text-white/80 hidden lg:block">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="text-white/60 hover:text-white transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="px-6 py-2.5 rounded-full border border-white/30 hover:bg-white hover:text-black text-white transition-all text-[11px] uppercase tracking-[0.15em] font-medium"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#050505] border-b border-white/10 shadow-lg"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link href="/venues" className="block px-3 py-4 text-[11px] uppercase tracking-[0.15em] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              Browse Venues
            </Link>
            <Link href="/how-it-works" className="block px-3 py-4 text-[11px] uppercase tracking-[0.15em] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              How it Works
            </Link>
            <Link href="/list-venue" className="block px-3 py-4 text-[11px] uppercase tracking-[0.15em] font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              List your Venue
            </Link>
            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 px-3 py-2">
                    {user.photoURL ? (
                      <Image 
                        src={user.photoURL} 
                        alt={user.displayName || 'User'} 
                        width={40} 
                        height={40} 
                        className="rounded-full border border-white/20"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <span className="text-[11px] uppercase tracking-[0.1em] font-medium text-white">
                      {user.displayName}
                    </span>
                  </div>
                  <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-[11px] uppercase tracking-[0.15em] font-medium text-white"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { signInWithGoogle(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-white/30 hover:bg-white hover:text-black text-white transition-all text-[11px] uppercase tracking-[0.15em] font-medium"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
