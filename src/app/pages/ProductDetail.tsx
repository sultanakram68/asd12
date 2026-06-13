import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { Star, ShieldCheck, Truck, Clock, ArrowLeft, Heart, Share2, Info } from "lucide-react";

export function ProductDetail() {
  const { id } = useParams();

  // Mocking the specific product data
  const product = {
    id: id || "1",
    name: "Obsidian Chronograph X",
    brand: "AETERNAL",
    price: "$12,450",
    description: "Forged from a single block of hyper-dense obsidian and engineered with microscopic precision, the Chronograph X represents the zenith of modern horology. Featuring a floating tourbillon and luminescent neon-blue accents, this masterpiece is limited to 500 pieces worldwide.",
    image: "https://images.unsplash.com/photo-1772949400107-f35fd026ab77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc4MTI4NTE0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    stock: 3,
    seller: {
      name: "Aeternal Official",
      rating: 4.9,
      reviews: 128
    },
    specs: [
      { label: "Material", value: "Hyper-dense Obsidian" },
      { label: "Movement", value: "Floating Tourbillon Caliber 9X" },
      { label: "Water Resistance", value: "300m / 30 ATM" },
      { label: "Power Reserve", value: "120 Hours" }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col gap-8 pb-12"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Discover</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden glass-card p-2 group">
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 via-transparent to-transparent"></div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl glass-card overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
                <img src={product.image} className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">{product.brand}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {product.seller.rating} ({product.seller.reviews} reviews)
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{product.name}</h1>
          <p className="text-3xl font-light text-white mb-8">{product.price}</p>
          
          <p className="text-gray-400 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="glass-card p-6 rounded-3xl mb-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">
                  {product.seller.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Sold by</p>
                  <p className="font-medium text-white">{product.seller.name} <ShieldCheck className="w-4 h-4 text-secondary inline" /></p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Stock Status</p>
                <p className="font-medium text-red-400">Only {product.stock} left</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <button className="liquid-button w-full sm:w-auto flex-1 py-4 px-8 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all">
              Purchase Now
            </button>
            <div className="flex gap-4 w-full sm:w-auto">
              <button className="glass-card p-4 rounded-full text-white hover:text-primary transition-colors flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </button>
              <button className="glass-card p-4 rounded-full text-white hover:text-secondary transition-colors flex items-center justify-center">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Specs */}
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" /> Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">{spec.label}</span>
                  <span className="font-medium text-gray-200">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
