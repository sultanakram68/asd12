'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import StatsCard from '@/components/ui/StatsCard';
import Badge from '@/components/ui/Badge';
import { Product } from '@/data/products';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { state, dispatch } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('phones');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const sellerProducts = state.products.filter(p => p.seller.id === 'seller-001');
  const sellerPendingProducts = state.pendingProducts.filter(p => p.seller.id === 'seller-001');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description) return;

    const newProduct: Product = {
      id: `pending-${Date.now()}`,
      name,
      price: Number(price),
      description,
      shortDescription: description.substring(0, 60),
      category,
      rating: 0,
      reviewCount: 0,
      seller: {
        id: 'seller-001',
        name: 'TechVault Pro',
        avatar: '🏪',
        verified: true,
      },
      images: [],
      emoji: category === 'phones' ? '📱' : category === 'watches' ? '⌚' : category === 'audio' ? '🎧' : '🕶️',
      specs: {},
      inStock: true,
      featured: false,
      trending: false,
      tags: [],
      createdAt: new Date().toISOString().split('T')[0],
    };

    dispatch({ type: 'ADD_PENDING_PRODUCT', product: newProduct });

    setName('');
    setCategory('phones');
    setPrice('');
    setDescription('');
    setActiveTab('products');
  };

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'products', label: '📦 Products' },
    { id: 'orders', label: '📋 Orders' },
    { id: 'add', label: '➕ Add Product' },
  ];

  const recentOrders = [
    { id: 'ORD-5001', product: 'iPhone 16 Pro Max', buyer: 'Alex M.', amount: 1199, status: 'delivered' as const, date: 'Jun 10' },
    { id: 'ORD-5002', product: 'AirPods Pro 3', buyer: 'Sarah C.', amount: 279, status: 'shipped' as const, date: 'Jun 11' },
    { id: 'ORD-5003', product: 'MacBook Pro 16"', buyer: 'James L.', amount: 3499, status: 'processing' as const, date: 'Jun 12' },
    { id: 'ORD-5004', product: 'Apple Watch Ultra 3', buyer: 'Emma W.', amount: 799, status: 'pending' as const, date: 'Jun 12' },
    { id: 'ORD-5005', product: 'iPad Pro M4', buyer: 'Michael B.', amount: 1099, status: 'processing' as const, date: 'Jun 12' },
  ];

  const statusMap: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
    delivered: 'success', shipped: 'info', processing: 'warning', pending: 'neutral',
  };

  return (
    <main className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[#FF6A00] uppercase text-xs font-extrabold tracking-[3px] block mb-2">Seller Dashboard</span>
            <h1 className="text-3xl font-black">TechVault Pro</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="success">✓ Verified Seller</Badge>
              <span className="text-xs text-white/30">Member since Mar 2025</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard label="Total Revenue" value="$84,290" icon="💰" color="orange" trend={{ value: '12.5% this month', positive: true }} />
              <StatsCard label="Total Orders" value="342" icon="📦" color="cyan" trend={{ value: '8.3% this month', positive: true }} />
              <StatsCard label="Active Products" value={String(sellerProducts.length + sellerPendingProducts.length)} icon="🏷️" color="purple" />
              <StatsCard label="Avg. Rating" value="4.9 ★" icon="⭐" color="green" trend={{ value: '+0.1', positive: true }} />
            </div>

            {/* Revenue Chart Placeholder */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-lg font-black mb-6">Revenue Overview</h3>
              <div className="flex items-end justify-between gap-2 h-48">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => {
                  const heights = [40, 55, 65, 50, 80, 95];
                  return (
                    <div key={month} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-[#FF6A00] to-[#FF8C00] transition-all duration-500 hover:from-[#FF8C00] hover:to-[#FFa500]"
                        style={{ height: `${heights[i]}%` }}
                      />
                      <span className="text-[10px] text-white/30 font-semibold">{month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-lg font-black mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-white/40">
                      <th className="text-left py-3 px-2 font-semibold">Order ID</th>
                      <th className="text-left py-3 px-2 font-semibold">Product</th>
                      <th className="text-left py-3 px-2 font-semibold">Buyer</th>
                      <th className="text-right py-3 px-2 font-semibold">Amount</th>
                      <th className="text-center py-3 px-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-2 font-bold text-white/70">{order.id}</td>
                        <td className="py-3 px-2 text-white/60">{order.product}</td>
                        <td className="py-3 px-2 text-white/60">{order.buyer}</td>
                        <td className="py-3 px-2 text-right font-bold text-[#00D4FF]">{formatPrice(order.amount)}</td>
                        <td className="py-3 px-2 text-center"><Badge variant={statusMap[order.status]}>{order.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black">Your Products ({sellerProducts.length + sellerPendingProducts.length})</h3>
              <button onClick={() => setActiveTab('add')} className="px-4 py-2 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-xs">+ Add New</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] text-white/40">
                    <th className="text-left py-3 px-2 font-semibold">Product</th>
                    <th className="text-left py-3 px-2 font-semibold">Category</th>
                    <th className="text-right py-3 px-2 font-semibold">Price</th>
                    <th className="text-center py-3 px-2 font-semibold">Rating</th>
                    <th className="text-center py-3 px-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerPendingProducts.map(p => (
                    <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors opacity-60">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{p.emoji}</span>
                          <span className="font-bold">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-white/50 capitalize">{p.category}</td>
                      <td className="py-3 px-2 text-right font-bold text-[#FF6A00]">{formatPrice(p.price)}</td>
                      <td className="py-3 px-2 text-center">—</td>
                      <td className="py-3 px-2 text-center"><Badge variant="warning">Pending Review ⏳</Badge></td>
                    </tr>
                  ))}
                  {sellerProducts.map(p => (
                    <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{p.emoji}</span>
                          <span className="font-bold">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-white/50 capitalize">{p.category}</td>
                      <td className="py-3 px-2 text-right font-bold text-[#00D4FF]">{formatPrice(p.price)}</td>
                      <td className="py-3 px-2 text-center"><span className="text-amber-400">★</span> {p.rating}</td>
                      <td className="py-3 px-2 text-center"><Badge variant={p.inStock ? 'success' : 'error'}>{p.inStock ? 'Active' : 'Inactive'}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-lg font-black mb-4">All Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] text-white/40">
                    <th className="text-left py-3 px-2 font-semibold">Order ID</th>
                    <th className="text-left py-3 px-2 font-semibold">Product</th>
                    <th className="text-left py-3 px-2 font-semibold">Buyer</th>
                    <th className="text-left py-3 px-2 font-semibold">Date</th>
                    <th className="text-right py-3 px-2 font-semibold">Amount</th>
                    <th className="text-center py-3 px-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-2 font-bold text-white/70">{order.id}</td>
                      <td className="py-3 px-2 text-white/60">{order.product}</td>
                      <td className="py-3 px-2 text-white/60">{order.buyer}</td>
                      <td className="py-3 px-2 text-white/40">{order.date}</td>
                      <td className="py-3 px-2 text-right font-bold text-[#00D4FF]">{formatPrice(order.amount)}</td>
                      <td className="py-3 px-2 text-center"><Badge variant={statusMap[order.status]}>{order.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add' && (
          <div className="max-w-2xl">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-lg font-black mb-6 text-[#FF6A00]">Add New Product</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2">Product Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="e.g., iPhone 17 Pro Max" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-2">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors [&>option]:bg-[#0a0b10]">
                      <option value="phones">Smartphones</option>
                      <option value="watches">Smartwatches</option>
                      <option value="audio">Audio</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-2">Price (USD)</label>
                    <input type="number" required value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors" placeholder="999" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2">Description</label>
                  <textarea rows={4} required value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF6A00]/50 transition-colors resize-none" placeholder="Describe your product in detail..." />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C00] text-black font-bold text-sm shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:shadow-[0_0_35px_rgba(255,106,0,0.5)] transition-all">
                  Submit for Review 🚀
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
