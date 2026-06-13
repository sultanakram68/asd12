'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    paymentMethod: 'credit',
    cardNumber: '', cardExpiry: '', cardCvc: '',
  });

  const shipping = total > 500 ? 0 : 29.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen pt-24 pb-24 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-3xl font-black mb-3 bg-gradient-to-r from-[#FF6A00] to-[#00D4FF] bg-clip-text text-transparent">Order Confirmed!</h2>
          <p className="text-white/50 mb-2">Order #ORD-2026-{Math.floor(Math.random() * 9000) + 1000}</p>
          <p className="text-white/40 text-sm mb-8">Thank you for your purchase. We&apos;ll send you a confirmation email shortly.</p>
          <Link href="/marketplace" className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm shadow-[0_0_25px_rgba(255,106,0,0.3)] hover:shadow-[0_0_40px_rgba(255,106,0,0.5)] transition-all">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen pt-24 pb-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-black mb-3">No items to checkout</h2>
          <Link href="/marketplace" className="text-[#FF6A00] font-bold text-sm">Browse Marketplace →</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-8">Checkout</h1>

        {/* Steps Indicator */}
        <div className="flex items-center gap-4 mb-10">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step > i + 1 ? 'bg-emerald-500 text-black' : step === i + 1 ? 'bg-[#FF6A00] text-black shadow-[0_0_15px_rgba(255,106,0,0.3)]' : 'bg-white/[0.06] text-white/30'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-semibold ${step === i + 1 ? 'text-white' : 'text-white/30'}`}>{s}</span>
              {i < 2 && <div className={`w-12 sm:w-20 h-px ${step > i + 1 ? 'bg-emerald-500' : 'bg-white/[0.08]'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <h2 className="text-xl font-black mb-6">Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-2">First Name</label>
                    <input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-2">Last Name</label>
                    <input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-2">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-2">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="+1 555-0100" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/50 mb-2">Address</label>
                    <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="123 Main Street" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-2">City</label>
                    <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="New York" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-2">State</label>
                      <input value={form.state} onChange={e => setForm({...form, state: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="NY" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-2">ZIP</label>
                      <input value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="10001" />
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="mt-6 w-full py-4 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:shadow-[0_0_35px_rgba(255,106,0,0.5)] transition-all">
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <h2 className="text-xl font-black mb-6">Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'credit', label: 'Credit / Debit Card', icon: '💳' },
                    { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                    { id: 'crypto', label: 'Cryptocurrency', icon: '₿' },
                  ].map(method => (
                    <label key={method.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      form.paymentMethod === method.id
                        ? 'bg-[#FF6A00]/5 border-[#FF6A00]/30'
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                    }`}>
                      <input type="radio" name="payment" value={method.id} checked={form.paymentMethod === method.id} onChange={e => setForm({...form, paymentMethod: e.target.value})} className="sr-only" />
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.paymentMethod === method.id ? 'border-[#FF6A00]' : 'border-white/20'}`}>
                        {form.paymentMethod === method.id && <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00]" />}
                      </span>
                      <span className="text-xl">{method.icon}</span>
                      <span className="text-sm font-bold">{method.label}</span>
                    </label>
                  ))}
                </div>

                {form.paymentMethod === 'credit' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-2">Card Number</label>
                      <input value={form.cardNumber} onChange={e => setForm({...form, cardNumber: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-2">Expiry</label>
                        <input value={form.cardExpiry} onChange={e => setForm({...form, cardExpiry: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-2">CVC</label>
                        <input value={form.cardCvc} onChange={e => setForm({...form, cardCvc: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-bold text-white/60 hover:text-white transition-all">
                    ← Back
                  </button>
                  <button onClick={() => setStep(3)} className="flex-1 py-4 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:shadow-[0_0_35px_rgba(255,106,0,0.5)] transition-all">
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <h2 className="text-xl font-black mb-6">Review Your Order</h2>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-4 bg-white/[0.02] rounded-xl p-3">
                      <span className="text-3xl">{item.product.emoji}</span>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.product.name}</h4>
                        <span className="text-xs text-white/40">Qty: {item.quantity}</span>
                      </div>
                      <span className="text-sm font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-6 py-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-bold text-white/60 hover:text-white transition-all">
                    ← Back
                  </button>
                  <button onClick={handlePlaceOrder} className="flex-1 py-4 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:shadow-[0_0_35px_rgba(255,106,0,0.5)] transition-all">
                    Place Order 🎉
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-black mb-4">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-white/50">Subtotal ({items.length} items)</span><span className="font-bold">{formatPrice(total)}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Shipping</span><span className="font-bold">{shipping === 0 ? <span className="text-emerald-400">FREE</span> : formatPrice(shipping)}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Tax</span><span className="font-bold">{formatPrice(tax)}</span></div>
                <div className="border-t border-white/[0.06] pt-3 flex justify-between"><span className="font-bold">Total</span><span className="text-xl font-black text-[#FF6A00]">{formatPrice(grandTotal)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
