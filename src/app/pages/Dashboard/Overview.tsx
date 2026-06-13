import { TrendingUp, DollarSign, Users, Package } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 8780 },
  { name: 'May', value: 5890 },
  { name: 'Jun', value: 12390 },
];

export function DashboardOverview() {
  const stats = [
    { label: "Total Revenue", value: "$124,500.00", icon: DollarSign, trend: "+14.5%" },
    { label: "Active Orders", value: "42", icon: Package, trend: "+5.2%" },
    { label: "Total Customers", value: "891", icon: Users, trend: "+2.4%" },
    { label: "Store Conversion", value: "3.24%", icon: TrendingUp, trend: "+1.2%" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-gray-400">Your store performance at a glance.</p>
        </div>
        <button className="glass-panel px-4 py-2 rounded-full text-sm text-white hover:text-primary transition-colors border border-white/10">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="glass-card p-6 rounded-3xl h-[400px] flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Revenue Overview</h3>
          <select className="bg-transparent border-none text-sm text-gray-400 outline-none">
            <option className="bg-bg-surface">Last 6 Months</option>
            <option className="bg-bg-surface">Last Year</option>
          </select>
        </div>
        <div className="flex-grow w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF6A00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" axisLine={false} tickLine={false} />
              <YAxis stroke="#6b7280" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#10131C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#FF6A00' }}
              />
              <Area type="monotone" dataKey="value" stroke="#FF6A00" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
