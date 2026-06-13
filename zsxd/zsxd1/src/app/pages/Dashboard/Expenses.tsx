import { useState } from "react";
import { Plus, Filter, Wallet, ArrowDownRight, ArrowUpRight, Search } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Mock Data
const expenseData = [
  { name: 'Fixed (Rent, Utilities)', value: 4500 },
  { name: 'Variable (Marketing)', value: 2100 },
  { name: 'Logistics', value: 3400 },
  { name: 'Custom (Events)', value: 1200 },
];

const COLORS = ['#FF6A00', '#00D4FF', '#8A5CFF', '#4ade80'];

const transactions = [
  { id: 1, name: "Luxury Office Rent", category: "Fixed", amount: 2500, date: "Jun 01, 2026", type: "expense" },
  { id: 2, name: "Q3 Marketing Campaign", category: "Variable", amount: 1200, date: "Jun 03, 2026", type: "expense" },
  { id: 3, name: "Premium Packaging", category: "Logistics", amount: 800, date: "Jun 05, 2026", type: "expense" },
  { id: 4, name: "Monthly Income", category: "Income", amount: 15400, date: "Jun 06, 2026", type: "income" },
];

export function Expenses() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expense Tracking</h1>
          <p className="text-gray-400">Manage your monthly income, fixed, and variable expenses.</p>
        </div>
        <button className="liquid-button px-6 py-2.5 rounded-full text-white font-medium flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(255,106,0,0.3)]">
          <Plus className="w-4 h-4" /> Add Expense/Income
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wallet className="w-24 h-24 text-primary" />
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-gray-300">Total Income (June)</p>
            </div>
            <h3 className="text-4xl font-bold text-white relative z-10">$15,400.00</h3>
          </div>

          <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ReceiptIcon className="w-24 h-24 text-red-500" />
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-gray-300">Total Expenses (June)</p>
            </div>
            <h3 className="text-4xl font-bold text-white relative z-10">$11,200.00</h3>
          </div>

          {/* Budget Alerts */}
          <div className="sm:col-span-2 glass-card p-6 rounded-3xl border-l-4 border-l-primary flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                Smart Budget Alert
              </h4>
              <p className="text-sm text-gray-400 mt-1">Logistics expenses are 15% higher than last month. Consider reviewing your shipping contracts.</p>
            </div>
            <button className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-colors whitespace-nowrap border border-white/10">
              Review Analytics
            </button>
          </div>
        </div>

        {/* Expense Breakdown Chart */}
        <div className="glass-card p-6 rounded-3xl flex flex-col h-[300px] lg:h-auto">
          <h3 className="font-semibold text-white mb-4">Expense Distribution</h3>
          <div className="flex-grow w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#10131C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend underneath */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
              {expenseData.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card rounded-3xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 flex-grow sm:flex-grow-0">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search expenses..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-gray-500 w-full sm:w-48"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-gray-300">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {transactions
                .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((t) => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{t.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{t.date}</td>
                  <td className={`px-6 py-4 text-right font-semibold ${t.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Dummy icon for Receipt since we only imported Wallet
function ReceiptIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/>
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
      <path d="M12 17V7"/>
    </svg>
  );
}
