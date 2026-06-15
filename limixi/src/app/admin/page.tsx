'use client';

import { useState } from 'react';
import StatsCard from '@/components/ui/StatsCard';
import Badge from '@/components/ui/Badge';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { state, dispatch } = useApp();
  const pendingSellers = state.pendingSellers;
  const pendingProducts = state.pendingProducts;

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'sellers', label: '🏪 Sellers' },
    { id: 'products', label: '📦 Products' },
    { id: 'users', label: '👥 Users' },
  ];

  const allUsers = [
    { name: 'Alex Morgan', email: 'alex@limixi.com', role: 'Customer', status: 'active', orders: 4 },
    { name: 'Sarah Chen', email: 'sarah@limixi.com', role: 'Customer', status: 'active', orders: 2 },
    { name: 'TechVault Pro', email: 'tech@vault.com', role: 'Seller', status: 'active', orders: 48 },
    { name: 'Galaxy Store', email: 'galaxy@store.com', role: 'Seller', status: 'active', orders: 32 },
    { name: 'AudioPhile Hub', email: 'audio@phile.com', role: 'Seller', status: 'active', orders: 24 },
    { name: 'Mike Johnson', email: 'mike@email.com', role: 'Customer', status: 'suspended', orders: 0 },
  ];

  const roleMap: Record<string, 'info' | 'warning' | 'success'> = { Customer: 'info', Seller: 'warning', Admin: 'success' };
  const statusMapUser: Record<string, 'success' | 'error'> = { active: 'success', suspended: 'error' };

  return (
    <main className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-[#8A5CFF] uppercase text-xs font-extrabold tracking-[3px] block mb-2">Administration</span>
          <h1 className="text-3xl font-black">Admin Dashboard</h1>
          <p className="text-sm text-white/40 mt-1">Platform management & oversight</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/[0.03] rounded-xl p-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-white/[0.08] text-white shadow-sm' : 'text-white/40 hover:text-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard label="Total Users" value="1,240" icon="👥" color="cyan" trend={{ value: '15.2%', positive: true }} />
              <StatsCard label="Platform Revenue" value="$248K" icon="💰" color="orange" trend={{ value: '22.1%', positive: true }} />
              <StatsCard label="Active Sellers" value="42" icon="🏪" color="purple" trend={{ value: '+6 new', positive: true }} />
              <StatsCard label="Pending Reviews" value="7" icon="⏳" color="green" />
            </div>

            {/* Analytics Chart */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
                <h3 className="text-lg font-black mb-6">Users Growth</h3>
                <div className="flex items-end justify-between gap-2 h-40">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => {
                    const heights = [30, 45, 55, 65, 78, 95];
                    return (
                      <div key={month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full rounded-t-lg bg-gradient-to-t from-[#00D4FF] to-[#00D4FF]/50 transition-all duration-500 hover:opacity-80" style={{ height: `${heights[i]}%` }} />
                        <span className="text-[10px] text-white/30 font-semibold">{month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
                <h3 className="text-lg font-black mb-6">Revenue Trend</h3>
                <div className="flex items-end justify-between gap-2 h-40">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => {
                    const heights = [35, 50, 60, 45, 70, 90];
                    return (
                      <div key={month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full rounded-t-lg bg-gradient-to-t from-[#8A5CFF] to-[#8A5CFF]/50 transition-all duration-500 hover:opacity-80" style={{ height: `${heights[i]}%` }} />
                        <span className="text-[10px] text-white/30 font-semibold">{month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sellers */}
        {activeTab === 'sellers' && (
          <div className="space-y-6">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-lg font-black mb-4 text-[#00D4FF]">Pending Seller Applications</h3>
              <div className="space-y-3">
                {pendingSellers.length > 0 ? (
                  pendingSellers.map(seller => (
                    <div key={seller.email} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-[#8A5CFF]/10 flex items-center justify-center text-lg">🏪</span>
                        <div>
                          <h4 className="font-bold text-sm">{seller.name}</h4>
                          <p className="text-xs text-white/40">{seller.email} · Applied {seller.date} · {seller.products}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => dispatch({ type: 'APPROVE_SELLER', email: seller.email })}
                          className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/30 transition-all cursor-pointer"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => dispatch({ type: 'REJECT_SELLER', email: seller.email })}
                          className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/30 transition-all cursor-pointer"
                        >
                          ✗ Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-white/30 text-sm py-6">No pending seller applications.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-lg font-black mb-4 text-[#FF6A00]">Pending Product Approvals</h3>
              <div className="space-y-3">
                {pendingProducts.length > 0 ? (
                  pendingProducts.map(product => (
                    <div key={product.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
                      <div>
                        <h4 className="font-bold text-sm">{product.name}</h4>
                        <p className="text-xs text-white/40">by {product.seller.name} · {formatPrice(product.price)} · {product.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => dispatch({ type: 'APPROVE_PRODUCT', productId: product.id })}
                          className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/30 transition-all cursor-pointer"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => dispatch({ type: 'REJECT_PRODUCT', productId: product.id })}
                          className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/30 transition-all cursor-pointer"
                        >
                          ✗ Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-white/30 text-sm py-6">No pending product approvals.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-lg font-black mb-4">User Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] text-white/40">
                    <th className="text-left py-3 px-2 font-semibold">User</th>
                    <th className="text-left py-3 px-2 font-semibold">Email</th>
                    <th className="text-center py-3 px-2 font-semibold">Role</th>
                    <th className="text-center py-3 px-2 font-semibold">Status</th>
                    <th className="text-right py-3 px-2 font-semibold">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map(user => (
                    <tr key={user.email} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-2 font-bold">{user.name}</td>
                      <td className="py-3 px-2 text-white/50">{user.email}</td>
                      <td className="py-3 px-2 text-center"><Badge variant={roleMap[user.role]}>{user.role}</Badge></td>
                      <td className="py-3 px-2 text-center"><Badge variant={statusMapUser[user.status]}>{user.status}</Badge></td>
                      <td className="py-3 px-2 text-right text-white/50">{user.orders} orders</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
