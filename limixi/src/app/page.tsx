'use client';

import Link from 'next/link';
import { products, getFeaturedProducts, getTrendingProducts } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ui/ProductCard';

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);
  const trending = getTrendingProducts().slice(0, 8);
  const topSellers = [
    { name: 'Apple Store', avatar: '📱', rating: 4.9, products: 48, verified: true },
    { name: 'Samsung Hub', avatar: '🌌', rating: 4.8, products: 32, verified: true },
    { name: 'AudioPhile Hub', avatar: '🎵', rating: 4.7, products: 24, verified: true },
    { name: 'LuxTech', avatar: '✨', rating: 4.9, products: 18, verified: true },
  ];

  return (
    <main className="min-h-screen">
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#007AFF]/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-[#47A1FF]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Text */}
          <div className="z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20 text-[#007AFF] text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-ping" />
              Welcome to the Liquid Glass Era
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-6 text-gray-900 tracking-tight">
              Discover{' '}
              <span className="text-[#007AFF]">
                Premium Tech
              </span>
              <br />
              Redefined
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-xl mb-8 mx-auto lg:mx-0 leading-relaxed font-medium">
              LIMIXI curates the world&apos;s most exclusive tech and luxury products. 
              Experience unparalleled quality with our verified seller network.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/marketplace"
                className="px-8 py-4 rounded-2xl bg-[#007AFF] text-white font-bold text-sm shadow-[0_8px_20px_rgba(0,122,255,0.3)] hover:shadow-[0_10px_25px_rgba(0,122,255,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                Explore Marketplace
              </Link>
              <Link
                href="/seller"
                className="px-8 py-4 rounded-2xl glass-blue text-[#007AFF] font-bold text-sm hover:bg-white/60 hover:-translate-y-1 transition-all duration-300"
              >
                Become a Seller 🏪
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex gap-10 mt-12 justify-center lg:justify-start">
              {[
                { value: '20K+', label: 'Products' },
                { value: '500+', label: 'Sellers' },
                { value: '98%', label: 'Satisfaction' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual - 3D Glass Card */}
          <div className="flex justify-center lg:justify-end z-10">
            <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] glass-blue p-6 transform perspective-[1000px] rotate-y-[-6deg] rotate-x-[6deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 overflow-hidden group shadow-2xl shadow-blue-500/10">
              {/* Window dots */}
              <div className="absolute top-4 left-4 flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF3B30] shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#FFCC00] shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#34C759] shadow-sm" />
              </div>

              <div className="h-full flex flex-col justify-between mt-6">
                <div className="inline-flex self-start px-3 py-1.5 rounded-lg bg-[#007AFF]/10 border border-[#007AFF]/20 text-[#007AFF] text-xs font-bold">
                  LIMIXI PREMIUM AI
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,122,255,0.2)] animate-float">
                    <span className="text-[#007AFF] text-4xl"></span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-3 bg-gray-200 rounded-full w-3/5" />
                  <div className="h-3 bg-gray-200 rounded-full w-4/5" />
                  <div className="h-3 bg-gray-200 rounded-full w-2/5" />
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SEARCH BAR ═══════════ */}
      <section className="px-4 -mt-8 relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="glass-blue rounded-2xl p-3 flex items-center gap-3 shadow-[0_10px_40px_rgba(0,122,255,0.1)]">
            <span className="text-gray-400 pl-4 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search for premium products..."
              className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none text-sm font-medium"
            />
            <Link
              href="/marketplace"
              className="px-8 py-3 rounded-xl bg-[#007AFF] text-white font-bold text-sm hover:bg-[#0062cc] transition-all shrink-0 shadow-md shadow-blue-500/20"
            >
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORIES ═══════════ */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#007AFF] uppercase text-xs font-extrabold tracking-[3px] block mb-2">Browse Categories</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/marketplace?category=${cat.slug}`}>
              <div className="glass-blue p-6 text-center group hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer border border-transparent hover:border-[#007AFF]/20">
                <span className="text-4xl block mb-4 transition-transform duration-500 group-hover:scale-110">
                  {cat.icon}
                </span>
                <h3 className="font-bold text-sm mb-1 text-gray-900">{cat.name}</h3>
                <p className="text-xs text-gray-500">{cat.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════ FEATURED PRODUCTS ═══════════ */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[#007AFF] uppercase text-xs font-extrabold tracking-[3px] block mb-2">Curated Selection</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Featured Products</h2>
          </div>
          <Link href="/marketplace" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#007AFF] hover:underline transition-all">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ═══════════ PROMO BANNERS ═══════════ */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <div className="relative glass-blue border border-[#007AFF]/20 rounded-3xl p-8 overflow-hidden group shadow-lg shadow-blue-500/5 hover:-translate-y-1 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#007AFF]/10 rounded-full blur-[40px] group-hover:w-48 group-hover:h-48 transition-all duration-700" />
            <span className="text-5xl block mb-4">🎧</span>
            <h3 className="text-xl font-black mb-2 text-gray-900">Audio Excellence</h3>
            <p className="text-sm text-gray-600 mb-6">Up to 40% off premium headphones</p>
            <Link href="/marketplace?category=audio" className="inline-flex px-6 py-3 rounded-xl bg-[#007AFF] text-white font-bold text-sm hover:shadow-[0_4px_15px_rgba(0,122,255,0.4)] transition-all">
              Shop Now
            </Link>
          </div>

          {/* Banner 2 */}
          <div className="relative glass-blue border border-[#007AFF]/20 rounded-3xl p-8 overflow-hidden group shadow-lg shadow-blue-500/5 hover:-translate-y-1 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#007AFF]/10 rounded-full blur-[40px] group-hover:w-48 group-hover:h-48 transition-all duration-700" />
            <span className="text-5xl block mb-4">⌚</span>
            <h3 className="text-xl font-black mb-2 text-gray-900">Luxury Timepieces</h3>
            <p className="text-sm text-gray-600 mb-6">New arrivals from top brands</p>
            <Link href="/marketplace?category=watches" className="inline-flex px-6 py-3 rounded-xl bg-white text-[#007AFF] border border-[#007AFF]/20 font-bold text-sm hover:shadow-md transition-all">
              Discover
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ TRENDING PRODUCTS ═══════════ */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[#007AFF] uppercase text-xs font-extrabold tracking-[3px] block mb-2">What&apos;s Hot</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Trending Now</h2>
          </div>
          <Link href="/marketplace" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#007AFF] hover:underline transition-all">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ═══════════ SELLER HIGHLIGHTS ═══════════ */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#007AFF] uppercase text-xs font-extrabold tracking-[3px] block mb-2">Trusted Network</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Top Sellers</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {topSellers.map(seller => (
            <div key={seller.name} className="glass-blue p-6 text-center group hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500">
              <span className="text-4xl block mb-4">{seller.avatar}</span>
              <h4 className="font-bold text-sm mb-1 flex items-center justify-center gap-1 text-gray-900">
                {seller.name}
                {seller.verified && <span className="text-[#007AFF] text-xs">✓</span>}
              </h4>
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-[#FFCC00] text-sm">★</span>
                <span className="text-xs font-bold text-gray-600">{seller.rating}</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">{seller.products} products</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ WHY LIMIXI ═══════════ */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="glass-blue rounded-[2.5rem] p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-500/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#007AFF]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <span className="text-[#007AFF] uppercase text-xs font-extrabold tracking-[3px] block mb-2">Why Choose Us</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">The LIMIXI Advantage</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-10">
              {[
                { icon: '🔒', title: 'Secure Payments', desc: 'End-to-end encrypted transactions with Apple Pay & Google Pay support.' },
                { icon: '⚡', title: 'Express Delivery', desc: 'Lightning-fast shipping with real-time tracking and quality inspection.' },
                { icon: '🛡️', title: 'Verified Sellers', desc: 'Every seller is vetted and verified for authenticity and reliability.' },
              ].map(f => (
                <div key={f.title} className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{f.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
