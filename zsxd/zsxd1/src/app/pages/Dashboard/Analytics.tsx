import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight } from "lucide-react";

const visitData = [
  { name: 'Mon', visits: 4000, sales: 2400 },
  { name: 'Tue', visits: 3000, sales: 1398 },
  { name: 'Wed', visits: 2000, sales: 9800 },
  { name: 'Thu', visits: 2780, sales: 3908 },
  { name: 'Fri', visits: 1890, sales: 4800 },
  { name: 'Sat', visits: 2390, sales: 3800 },
  { name: 'Sun', visits: 3490, sales: 4300 },
];

export function Analytics() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Deep Dive</h1>
        <p className="text-gray-400">Advanced metrics for your store's performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <div className="glass-card p-6 rounded-3xl h-[400px] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Store Traffic vs Sales</h3>
            <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +12%
            </span>
          </div>
          <div className="flex-grow w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" stroke="#6b7280" axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#10131C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="visits" stroke="#FF6A00" strokeWidth={3} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#00D4FF" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Bar Chart */}
        <div className="glass-card p-6 rounded-3xl h-[400px] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Sales by Category</h3>
          </div>
          <div className="flex-grow w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#10131C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="sales" fill="#8A5CFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
