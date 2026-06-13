'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const shipping = total > 500 ? 0 : 29.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-24 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <span className="text-7xl block mb-6">🛒</span>
          <h2 className="text-2xl font-black mb-3">Your Cart is Empty</h2>
          <p className="text-white/40 mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[#FF6A00] uppercase text-xs font-extrabold tracking-[3px] block mb-2">Shopping</span>
            <h1 className="text-3xl sm:text-4xl font-black">Your Cart ({items.length})</h1>
          </div>
          <button
            onClick={clearCart}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 flex gap-4 items-center group hover:bg-white/[0.06] transition-all duration-300">
                {/* Product Image */}
                <Link href={`/product/${item.product.id}`} className="w-20 h-20 sm:w-24 sm:h-24 bg-white/[0.03] rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-4xl">{item.product.emoji}</span>
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.product.id}`}>
                    <h3 className="font-bold text-sm sm:text-base mb-1 truncate hover:text-[#FF6A00] transition-colors">{item.product.name}</h3>
                  </Link>
                  <p className="text-xs text-white/40 mb-2">{item.product.category}</p>
                  <span className="text-lg font-black text-[#00D4FF]">{formatPrice(item.product.price)}</span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 hover:bg-white/[0.1] hover:text-white transition-all text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 hover:bg-white/[0.1] hover:text-white transition-all text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal & Remove */}
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="font-black text-sm text-white mb-1">{formatPrice(item.product.price * item.quantity)}</p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-black mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span className="font-bold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Shipping</span>
                  <span className="font-bold">{shipping === 0 ? <span className="text-emerald-400">FREE</span> : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Tax (8%)</span>
                  <span className="font-bold">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-white/[0.06] pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-black text-[#FF6A00]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 mb-4 text-center">
                  <span className="text-xs font-bold text-emerald-400">🎉 You qualify for free shipping!</span>
                </div>
              )}

              <Link
                href="/checkout"
                className="block w-full py-4 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm text-center shadow-[0_0_25px_rgba(255,106,0,0.3)] hover:shadow-[0_0_40px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Proceed to Checkout 💳
              </Link>

              <Link
                href="/marketplace"
                className="block text-center text-sm text-white/40 hover:text-white/60 mt-4 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
