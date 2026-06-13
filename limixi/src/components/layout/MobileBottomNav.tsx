'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/store';
import { cn } from '@/lib/utils';

const tabs = [
  { href: '/', icon: '🏠', label: 'Home' },
  { href: '/marketplace', icon: '🛍️', label: 'Shop' },
  { href: '/cart', icon: '🛒', label: 'Cart', showBadge: true },
  { href: '/wishlist', icon: '♡', label: 'Wishlist' },
  { href: '/profile', icon: '👤', label: 'Profile' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-[#05060A]/85 backdrop-blur-2xl border-t border-white/[0.06]">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map(tab => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 w-14 py-1 rounded-xl transition-all duration-300 relative',
                isActive ? 'text-[#FF6A00]' : 'text-white/40 hover:text-white/70'
              )}
            >
              {isActive && (
                <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#FF6A00] rounded-full shadow-[0_0_10px_#FF6A00]" />
              )}
              <span className="text-lg relative">
                {tab.icon}
                {tab.showBadge && count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#00D4FF] text-black text-[8px] font-extrabold flex items-center justify-center shadow-[0_0_8px_#00D4FF]">
                    {count}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
