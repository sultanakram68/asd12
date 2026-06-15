'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart, useApp } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/seller', label: 'Sellers' },
  { href: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const { state, dispatch } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-500',
      scrolled
        ? 'bg-white/70 backdrop-blur-xl border-b border-[#007AFF]/10 shadow-sm'
        : 'bg-transparent border-b border-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#007AFF]">
              LIMIXI
            </span>
            <span className="w-2 h-2 rounded-full bg-[#007AFF] shadow-[0_0_10px_rgba(0,122,255,0.5)] group-hover:scale-150 transition-transform" />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300',
                    pathname === link.href
                      ? 'text-[#007AFF] bg-[#007AFF]/10'
                      : 'text-gray-600 hover:text-[#007AFF] hover:bg-[#007AFF]/5'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:flex w-10 h-10 rounded-full bg-white/50 border border-[#007AFF]/20 items-center justify-center text-gray-600 hover:text-[#007AFF] hover:border-[#007AFF]/50 hover:bg-white shadow-sm transition-all duration-300"
            >
              ♡
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative w-10 h-10 rounded-full bg-white/50 border border-[#007AFF]/20 flex items-center justify-center text-gray-600 hover:text-[#007AFF] hover:border-[#007AFF]/50 hover:bg-white shadow-sm transition-all duration-300"
            >
              🛒
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#007AFF] text-white text-[10px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                  {count}
                </span>
              )}
            </Link>

            {/* Auth */}
            <Link
              href={state.isAuthenticated ? '/profile' : '/auth'}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/20 text-sm font-semibold text-[#007AFF] hover:bg-[#007AFF] hover:text-white transition-all duration-300"
            >
              <span>👤</span>
              <span>{state.isAuthenticated ? state.user?.name : 'Sign In'}</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => dispatch({ type: 'SET_MOBILE_MENU', open: !state.mobileMenuOpen })}
              className="md:hidden w-10 h-10 rounded-full bg-white/50 border border-[#007AFF]/20 flex items-center justify-center text-gray-700 hover:bg-white"
            >
              {state.mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {state.mobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-2xl border-t border-[#007AFF]/10 animate-slideDown shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => dispatch({ type: 'SET_MOBILE_MENU', open: false })}
                className={cn(
                  'block px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                  pathname === link.href
                    ? 'bg-[#007AFF]/10 text-[#007AFF]'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
