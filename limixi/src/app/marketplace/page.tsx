'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ui/ProductCard';

export default function MarketplacePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [search, category, sortBy, priceRange]);

  return (
    <main className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-[#FF6A00] uppercase text-xs font-extrabold tracking-[3px] block mb-2">Premium Collection</span>
          <h1 className="text-3xl sm:text-4xl font-black">Marketplace</h1>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FF6A00]/50 transition-colors"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none cursor-pointer focus:border-[#FF6A00]/50 transition-colors [&>option]:bg-[#0a0b10] [&>option]:text-white"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                category === 'all'
                  ? 'bg-gradient-to-r from-[#FF6A00] to-[#FF8C00] text-black shadow-[0_0_15px_rgba(255,106,0,0.3)]'
                  : 'bg-white/[0.06] text-white/60 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white'
              }`}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  category === cat.slug
                    ? 'bg-gradient-to-r from-[#FF6A00] to-[#FF8C00] text-black shadow-[0_0_15px_rgba(255,106,0,0.3)]'
                    : 'bg-white/[0.06] text-white/60 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-white/40">
            Showing <span className="text-white font-bold">{filtered.length}</span> products
          </p>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-white/40 text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </main>
  );
}
