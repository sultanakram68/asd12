import { Outlet, Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { LayoutDashboard, BarChart3, Receipt, Settings as SettingsIcon } from "lucide-react";

export function SellerDashboard() {
  const location = useLocation();

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
    { name: "Expenses", path: "/dashboard/expenses", icon: Receipt },
    { name: "Settings", path: "/dashboard/settings", icon: SettingsIcon },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 gap-8 sticky top-32 h-[calc(100vh-160px)]">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-1">Seller Hub</h2>
          <p className="text-sm text-gray-400">Manage your empire.</p>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive 
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(255,106,0,0.1)]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto glass-card p-4 rounded-2xl border-l-2 border-l-primary flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shadow-[0_0_8px_#22c55e]"></div>
          <div>
            <p className="text-sm font-semibold text-white">System Status</p>
            <p className="text-xs text-gray-400">All services operational</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <motion.div 
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-grow w-full overflow-hidden"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
