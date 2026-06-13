import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string;
  icon: string;
  trend?: { value: string; positive: boolean };
  color?: 'orange' | 'cyan' | 'purple' | 'green';
}

export default function StatsCard({ label, value, icon, trend, color = 'orange' }: StatsCardProps) {
  const colors = {
    orange: { text: 'text-[#FF6A00]', glow: 'shadow-[0_0_20px_rgba(255,106,0,0.1)]', bg: 'bg-[#FF6A00]/10' },
    cyan: { text: 'text-[#00D4FF]', glow: 'shadow-[0_0_20px_rgba(0,212,255,0.1)]', bg: 'bg-[#00D4FF]/10' },
    purple: { text: 'text-[#8A5CFF]', glow: 'shadow-[0_0_20px_rgba(138,92,255,0.1)]', bg: 'bg-[#8A5CFF]/10' },
    green: { text: 'text-emerald-400', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.1)]', bg: 'bg-emerald-400/10' },
  };

  const c = colors[color];

  return (
    <div className={cn('bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.06]', c.glow)}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</span>
        <span className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-lg', c.bg)}>{icon}</span>
      </div>
      <h3 className={cn('text-2xl font-black mb-1', c.text)}>{value}</h3>
      {trend && (
        <span className={cn('text-xs font-bold', trend.positive ? 'text-emerald-400' : 'text-red-400')}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </span>
      )}
    </div>
  );
}
