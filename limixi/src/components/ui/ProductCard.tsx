'use client';

import Link from 'next/link';
import { Product } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useCart, useWishlist } from '@/lib/store';
import GlassCard from './GlassCard';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <GlassCard className="group relative flex flex-col overflow-hidden" glow="cyan">
      {/* Wishlist Button */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-pink-500/50 hover:bg-pink-500/10 hover:shadow-[0_0_15px_rgba(255,46,147,0.2)]"
      >
        <span className={wishlisted ? 'text-pink-500' : 'text-white/50'}>{wishlisted ? '♥' : '♡'}</span>
      </button>

      {/* Sale Badge */}
      {product.originalPrice && (
        <span className="absolute top-4 left-4 z-10 bg-[#FF6A00] text-black text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-[0_0_10px_rgba(255,106,0,0.3)]">
          SALE
        </span>
      )}

      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="h-48 flex items-center justify-center bg-white/[0.02] rounded-xl m-3 mb-0 relative overflow-hidden">
          <span className="text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
            {product.emoji}
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4 pt-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D4FF] mb-1">
          {product.category}
        </span>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-bold text-white mb-1 transition-colors duration-300 group-hover:text-[#FF6A00] line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-white/50 mb-3 line-clamp-2 min-h-[2rem]">
          {product.shortDescription}
        </p>

        <StarRating rating={product.rating} size="sm" reviewCount={product.reviewCount} />

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div>
            <span className="text-lg font-black text-[#00D4FF]">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-xs text-white/30 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] flex items-center justify-center text-black font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,106,0,0.4)] hover:scale-110 active:scale-95"
          >
            +
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
