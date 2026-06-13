import { Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, Heart, User, Bell, Home, BarChart2, DollarSign, Settings, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg-base text-white relative overflow-hidden flex flex-col">
      {/* Ambient Lighting Layers */}
      <div className="ambient-glow bg-primary w-[600px] h-[600px] top-[-200px] left-[-200px]" />
      <div className="ambient-glow bg-secondary w-[500px] h-[500px] top-[20%] right-[-150px]" />
      <div className="ambient-glow bg-accent w-[800px] h-[800px] bottom-[-300px] left-[20%]" />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 lg:px-12 flex justify-center pointer-events-none">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-full px-6 py-3 w-full max-w-7xl flex items-center justify-between pointer-events-auto"
        >
          <div className="flex items-center gap-4 md:gap-8">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 -ml-2 text-gray-300 hover:text-white pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link to="/" className="text-2xl font-bold tracking-tighter text-gradient-primary">
              LIMIXI
            </Link>
            
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
              <Link to="/" className="hover:text-white transition-colors">Discover</Link>
              <Link to="/" className="hover:text-white transition-colors">Trending</Link>
              <Link to="/" className="hover:text-white transition-colors">Categories</Link>
              <Link to="/dashboard" className="hover:text-white transition-colors">Seller Hub</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors focus-within:bg-white/10 focus-within:border-white/20 focus-within:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search luxury..." 
                className="bg-transparent border-none outline-none text-sm w-48 focus:w-64 transition-all duration-300 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
                <Search className="w-5 h-5 md:hidden" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white relative">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#FF6A00]"></span>
              </button>
              <div className="w-[1px] h-6 bg-white/10 mx-1 hidden sm:block"></div>
              <Link to="/dashboard" className="hidden sm:flex p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-28 pb-24 md:pb-12 px-6 lg:px-12 relative z-10 flex flex-col items-center">
        <div className="w-full max-w-7xl flex-grow">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-accent/20 bg-bg-surface/50 backdrop-blur-xl mt-auto shadow-[0_-10px_30px_rgba(138,92,255,0.05)]">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter text-gradient-primary mb-4">LIMIXI</h2>
            <p className="text-sm text-gray-400">The world's most premium luxury marketplace. Elevate your lifestyle.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Marketplace</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trending</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Authenticity Guarantee</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Subscribe</h3>
            <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden p-1">
              <input type="email" placeholder="Email Address" className="bg-transparent outline-none px-3 py-2 text-sm w-full" />
              <button className="bg-primary/20 text-primary hover:bg-primary hover:text-white px-4 rounded-lg text-sm font-medium transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-bg-base/95 backdrop-blur-3xl flex flex-col p-6 pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-12 mt-4">
              <span className="text-2xl font-bold tracking-tighter text-gradient-primary">القائمة</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-300 hover:text-white bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col gap-4 text-lg font-medium">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10">
                <Home className="w-6 h-6" />
                الصفحة الرئيسية
              </Link>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10">
                <User className="w-6 h-6" />
                الملف الشخصي
              </Link>
              <div className="h-px bg-white/10 w-full my-4"></div>
              <Link to="/dashboard/analytics" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10">
                <BarChart2 className="w-6 h-6" />
                التحليلات
              </Link>
              <Link to="/dashboard/expenses" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10">
                <DollarSign className="w-6 h-6" />
                المصروفات
              </Link>
              <Link to="/dashboard/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10">
                <Settings className="w-6 h-6" />
                الإعدادات
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
