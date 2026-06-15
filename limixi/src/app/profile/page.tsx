'use client';

import { useState } from 'react';
import { useAuth, useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

export default function ProfilePage() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('orders');

  // Auto-login for demo
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-24 pb-24 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <span className="text-7xl block mb-6">👤</span>
          <h2 className="text-2xl font-black mb-3">Sign In Required</h2>
          <p className="text-white/40 mb-6">Please sign in to view your profile.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => login({ id: 'user-001', name: 'Alex Morgan', email: 'alex@limixi.com', role: 'customer', avatar: '👤' })}
              className="px-6 py-3 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm"
            >
              Demo Login
            </button>
            <Link href="/auth" className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-bold text-white/60 hover:text-white transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const statusMap: Record<string, 'success' | 'warning' | 'info' | 'error' | 'neutral'> = {
    delivered: 'success', shipped: 'info', processing: 'warning', pending: 'neutral', cancelled: 'error',
  };

  const userOrders = state.orders.filter(o => o.userId === user?.id || o.userId === 'user-001');

  return (
    <main className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6A00]/20 to-[#8A5CFF]/20 border border-white/[0.1] flex items-center justify-center text-4xl">
            {user?.avatar}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-black mb-1">{user?.name}</h1>
            <p className="text-sm text-white/40 mb-2">{user?.email}</p>
            <Badge variant="info">Member since 2025</Badge>
          </div>
          <button onClick={logout} className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all">
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/[0.03] rounded-xl p-1">
          {['orders', 'settings', 'addresses'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-lg text-sm font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-white/[0.08] text-white shadow-sm' : 'text-white/40 hover:text-white/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black mb-4">Order History</h2>
            {userOrders.length > 0 ? userOrders.map(order => (
              <div key={order.id} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="text-sm font-bold">{order.id}</span>
                    <span className="text-xs text-white/30 ml-3">{order.createdAt}</span>
                  </div>
                  <Badge variant={statusMap[order.status]}>{order.status.toUpperCase()}</Badge>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-white/60">{item.productName} × {item.quantity}</span>
                      <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-3">
                  <span className="text-sm text-white/50">{order.paymentMethod}</span>
                  <span className="font-black text-[#FF6A00]">{formatPrice(order.total)}</span>
                </div>
              </div>
            )) : (
              <p className="text-center text-white/40 py-12">No orders yet</p>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-xl font-black mb-6">Account Settings</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2">Full Name</label>
                <input defaultValue={user?.name} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2">Email</label>
                <input defaultValue={user?.email} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2">Phone</label>
                <input defaultValue="+1 555-0101" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" />
              </div>
            </div>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm">Save Changes</button>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black mb-4">Saved Addresses</h2>
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm">🏠 Home</h4>
                <Badge variant="info">Default</Badge>
              </div>
              <p className="text-sm text-white/50">123 Main St, New York, NY 10001</p>
            </div>
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
              <h4 className="font-bold text-sm mb-3">🏢 Office</h4>
              <p className="text-sm text-white/50">456 Business Ave, Suite 200, NYC 10002</p>
            </div>
            <button className="w-full py-4 rounded-xl border-2 border-dashed border-white/[0.08] text-sm font-bold text-white/30 hover:border-[#FF6A00]/30 hover:text-[#FF6A00] transition-all">
              + Add New Address
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
