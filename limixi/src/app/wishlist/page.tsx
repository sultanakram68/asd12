'use client';

import { useWishlist } from '@/lib/store';
import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';

export default function WishlistPage() {
  const { items } = useWishlist();
  const wishlistProducts = products.filter(p => items.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-24 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <span className="text-7xl block mb-6">♡</span>
          <h2 className="text-2xl font-black mb-3">Your Wishlist is Empty</h2>
          <p className="text-white/40 mb-8">Start adding products you love to your wishlist.</p>
          <Link
            href="/marketplace"
            className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm shadow-[0_0_25px_rgba(255,106,0,0.3)] hover:shadow-[0_0_40px_rgba(255,106,0,0.5)] transition-all"
          >
            Browse Marketplace
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="text-pink-400 uppercase text-xs font-extrabold tracking-[3px] block mb-2">Your Favorites</span>
          <h1 className="text-3xl sm:text-4xl font-black">Wishlist ({wishlistProducts.length})</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
