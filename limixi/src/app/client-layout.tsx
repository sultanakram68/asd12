'use client';

import { AppProvider } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Footer from '@/components/layout/Footer';
import { Suspense } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-pulse">✦</div>
            <p className="text-white/30 text-sm">Loading LIMIXI...</p>
          </div>
        </div>
      }>
        {children}
      </Suspense>
      <Footer />
      <MobileBottomNav />
    </AppProvider>
  );
}
