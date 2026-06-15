'use client';

import { use } from 'react';
import { useApp } from '@/lib/store';
import { reviews as allReviews } from '@/data/reviews';
import { formatPrice } from '@/lib/utils';
import { useCart, useWishlist } from '@/lib/store';
import ProductCard from '@/components/ui/ProductCard';
import StarRating from '@/components/ui/StarRating';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { state } = useApp();
  const product = state.products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) {
    return (
      <main className="min-h-screen pt-24 pb-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">😔</span>
          <h2 className="text-2xl font-black mb-2">Product Not Found</h2>
          <p className="text-white/40 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/marketplace" className="px-6 py-3 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm">
            Browse Marketplace
          </Link>
        </div>
      </main>
    );
  }

  const productReviews = allReviews.filter(r => r.productId === product.id);
  const relatedProducts = state.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <main className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </nav>

        {/* Product Main */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Product Gallery */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 flex items-center justify-center min-h-[400px] relative overflow-hidden group">
            {discount > 0 && (
              <span className="absolute top-6 left-6 bg-[#FF6A00] text-black text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(255,106,0,0.3)]">
                -{discount}% OFF
              </span>
            )}
            <span className="text-[120px] sm:text-[150px] transition-transform duration-700 group-hover:scale-110">
              {product.emoji}
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#05060A]/50 to-transparent pointer-events-none" />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] text-xs font-bold uppercase">
                {product.category}
              </span>
              {product.inStock ? (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">In Stock</span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">Out of Stock</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black mb-3">{product.name}</h1>

            <div className="mb-4">
              <StarRating rating={product.rating} size="md" reviewCount={product.reviewCount} />
            </div>

            <p className="text-white/50 leading-relaxed mb-6">{product.description}</p>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-black text-[#00D4FF]">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-white/30 line-through mb-1">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Specs */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-6">
              <h3 className="text-sm font-bold mb-3 text-white/70">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between bg-white/[0.02] rounded-xl px-3 py-2">
                    <span className="text-xs text-white/40">{key}</span>
                    <span className="text-xs font-bold text-white/80">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 py-4 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm shadow-[0_0_25px_rgba(255,106,0,0.3)] hover:shadow-[0_0_40px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Add to Cart 🛒
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 rounded-xl border flex items-center justify-center text-xl transition-all duration-300 ${
                  wishlisted
                    ? 'bg-pink-500/10 border-pink-500/30 text-pink-500'
                    : 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-pink-400 hover:border-pink-500/30'
                }`}
              >
                {wishlisted ? '♥' : '♡'}
              </button>
            </div>

            {/* Seller Info */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-4">
              <span className="text-3xl">{product.seller.avatar}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm">{product.seller.name}</h4>
                  {product.seller.verified && (
                    <span className="px-2 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] text-[10px] font-bold">✓ Verified</span>
                  )}
                </div>
                <p className="text-xs text-white/40">Trusted Seller</p>
              </div>
              <Link href="/seller" className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-xs font-bold text-white/60 hover:text-white hover:border-white/20 transition-all">
                Visit Store
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6">Customer Reviews</h2>
          {productReviews.length > 0 ? (
            <div className="space-y-4">
              {productReviews.map(review => (
                <div key={review.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-lg">{review.avatar}</span>
                    <div>
                      <h4 className="text-sm font-bold">{review.userName}</h4>
                      <span className="text-xs text-white/30">{review.createdAt}</span>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={review.rating} size="sm" showValue={false} />
                    </div>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">{review.comment}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="text-xs text-white/30 hover:text-white/60 transition-colors">👍 Helpful ({review.helpful})</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center">
              <p className="text-white/40 text-sm">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-black mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
