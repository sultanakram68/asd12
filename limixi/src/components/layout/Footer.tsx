import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/[0.06] pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-white to-[#FF6A00] bg-clip-text text-transparent">LIMIXI</span>
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              The premier luxury marketplace for premium tech and lifestyle products. Experience the future of shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/marketplace', label: 'Marketplace' },
                { href: '/seller', label: 'Become a Seller' },
                { href: '/auth', label: 'Sign In' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-[#FF6A00] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map(item => (
                <li key={item}>
                  <span className="text-sm text-white/40 hover:text-[#00D4FF] transition-colors duration-300 cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-white/40 mb-3">Get the latest drops and exclusive deals.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00]/50 transition-colors"
              />
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm hover:shadow-[0_0_20px_rgba(255,106,0,0.3)] transition-all">
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-white/30">© 2026 LIMIXI. All rights reserved.</span>
          <span className="text-xs text-white/20">Crafted with Liquid Glass & Neon Premium UI</span>
        </div>
      </div>
    </footer>
  );
}
