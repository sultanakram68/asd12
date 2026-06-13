import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import topImage from "../../imports/image.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const featuredProducts = [
  {
    id: "1",
    name: "Obsidian Chronograph X",
    brand: "AETERNAL",
    price: "$12,450",
    image: "https://images.unsplash.com/photo-1772949400107-f35fd026ab77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc4MTI4NTE0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 342
  },
  {
    id: "2",
    name: "Quantum Desk Array",
    brand: "NEURA",
    price: "$4,200",
    image: "https://images.unsplash.com/photo-1514168757508-07ffe9ae125b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdGVjaCUyMHNldHVwJTIwZGFya3xlbnwxfHx8fDE3ODEyODUxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 891
  },
  {
    id: "3",
    name: "Aero Stealth Runners",
    brand: "VECTRA",
    price: "$890",
    image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzbmVha2VyJTIwZGFya3xlbnwxfHx8fDE3ODEyODUxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 564
  },
  {
    id: "4",
    name: "Nocturne Essence",
    brand: "LUMIERE",
    price: "$350",
    image: "https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbGVlayUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MXx8fHwxNzgxMjg1MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 1205
  }
];

export function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col gap-24"
    >
      {/* Uploaded Top Banner Image */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 mt-4 md:mt-12 relative z-20">
        <ImageWithFallback 
          src={topImage} 
          alt="Top Layout Banner" 
          className="w-full h-auto rounded-[2rem] shadow-[0_10px_40px_rgba(138,92,255,0.15)] border border-accent/20 object-cover block" 
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center mt-4">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6">
            <Zap className="w-3 h-3" />
            <span>The New Standard of Luxury</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight">
            Curated Excellence.<br/>
            <span className="text-gradient-primary">Zero Compromise.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-light">
            Discover a world-class marketplace engineered for those who demand the absolute pinnacle of design, quality, and futuristic aesthetics.
          </p>
          
          <div className="flex items-center gap-4">
            <button className="liquid-button px-8 py-4 rounded-full text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
              Explore Collection <ArrowRight className="w-5 h-5" />
            </button>
            <button className="glass-card px-8 py-4 rounded-full text-white font-semibold flex items-center gap-2 text-sm sm:text-base hover:bg-white/10">
              Become a Seller
            </button>
          </div>
        </motion.div>

        {/* Hero Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/20 rounded-full pointer-events-none animate-float shadow-[inset_0_0_50px_rgba(138,92,255,0.05)]" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/30 rounded-full pointer-events-none animate-float shadow-[inset_0_0_30px_rgba(138,92,255,0.1)]" style={{ animationDelay: '-2s' }}></div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
        {[
          { icon: ShieldCheck, title: "Authenticated", desc: "Every item verified by experts" },
          { icon: Star, title: "Premium Quality", desc: "Top 1% of global creators" },
          { icon: Zap, title: "Instant Access", desc: "Next-day white-glove delivery" }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl flex flex-col items-center text-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-white">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Trending Products */}
      <section className="flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Trending Now</h2>
            <p className="text-gray-400">The most sought-after items this week.</p>
          </div>
          <Link to="/" className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, i) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-3xl overflow-hidden group cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-surface to-transparent z-10 opacity-60"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 z-20 glass-panel rounded-full p-2 text-white hover:text-primary transition-colors">
                    <Star className="w-4 h-4" />
                  </div>
                  {/* Seller Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                    Verified
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow relative z-20 -mt-12">
                  <span className="text-xs text-primary font-medium tracking-wider uppercase mb-1">{product.brand}</span>
                  <h3 className="text-lg font-semibold text-white mb-2 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xl font-bold text-white">{product.price}</span>
                    <span className="text-xs text-gray-500">{product.likes} likes</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="relative rounded-[2.5rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-surface to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1770070553064-3980a912f96b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaWZlc3R5bGUlMjByaWNoJTIwZGFya3xlbnwxfHx8fDE3ODEyODUxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Luxury Lifestyle" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 p-12 md:p-24 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">Elevate Your<br/>Collection.</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md">Join the exclusive club of collectors and visionaries. Unparalleled access to global luxury.</p>
          <button className="glass-panel hover:bg-white/10 transition-colors px-8 py-3 rounded-full text-white font-medium">
            Discover Exclusive
          </button>
        </div>
      </section>
    </motion.div>
  );
}
