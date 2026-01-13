"use client";
import { ShoppingBag, Heart, User, Search, Menu, X, ArrowRight, Star, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store";
import type { Product } from "@/store";
import { toast } from "sonner";
import { CartSidebar } from "@/components/cart-sidebar";

export default function Collections() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const { addItem, getTotalItems } = useCartStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    // Office Wear
    { id: 1, name: "Professional Elegance", category: "office", price: "2,499", colors: ["#1a1a1a", "#2c4a6b", "#4a3c32"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&q=80", rating: 4.8, reviews: 124, description: "A sophisticated kurti perfect for the modern professional. Tailored fit with subtle detailing that exudes confidence.", fabric: "Premium Cotton Blend", care: "Machine wash cold, Do not bleach" },
    { id: 2, name: "Corporate Chic", category: "office", price: "2,799", colors: ["#000000", "#8b4513", "#2f4f4f"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1741847639057-b51a25d42892?fm=jpg&q=60&w=600&h=800&crop=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.9, reviews: 89, description: "Minimalist design meets maximum impact. Perfect for board meetings and client presentations.", fabric: "Pure Cotton", care: "Dry clean recommended" },
    { id: 3, name: "Executive Grace", category: "office", price: "2,999", colors: ["#2c2c2c", "#4a5568", "#1c3d5a"], sizes: ["S", "M", "L", "XL", "XXL"], image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop&q=80", rating: 5.0, reviews: 156, description: "Commanding presence with elegant simplicity. Designed for leaders who mean business.", fabric: "Cotton Silk Blend", care: "Hand wash or dry clean" },
    { id: 4, name: "Boardroom Beauty", category: "office", price: "2,599", colors: ["#1a1a1a", "#556b2f", "#483d8b"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=800&fit=crop&q=80", rating: 4.7, reviews: 98, description: "Structured silhouette with refined details. Makes every workday feel like a power move.", fabric: "Poly Cotton", care: "Machine wash gentle" },

    // School Wear
    { id: 5, name: "Campus Comfort", category: "school", price: "1,299", colors: ["#e0e0e0", "#b0c4de", "#d8bfd8"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&q=80", rating: 4.6, reviews: 203, description: "Designed for all-day comfort during lectures and study sessions. Breathable and easy to maintain.", fabric: "100% Cotton", care: "Machine washable" },
    { id: 6, name: "Study Chic", category: "school", price: "1,199", colors: ["#ffffff", "#add8e6", "#ffb6c1"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop&q=80", rating: 4.5, reviews: 167, description: "Youthful and vibrant, perfect for campus life. Combines style with practicality.", fabric: "Cotton", care: "Machine wash cold" },
    { id: 7, name: "Academic Style", category: "school", price: "1,399", colors: ["#f5f5f5", "#87ceeb", "#dda0dd"], sizes: ["XS", "S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1669201161628-fe3c073c2773?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.7, reviews: 145, description: "Smart casual design for the discerning student. Effortlessly transitions from classroom to cafeteria.", fabric: "Cotton Blend", care: "Machine washable" },
    { id: 8, name: "Lecture Hall Luxe", category: "school", price: "1,499", colors: ["#fafafa", "#b0e0e6", "#f0e68c"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?w=600&h=800&fit=crop&q=80", rating: 4.8, reviews: 189, description: "Elevated everyday wear for the modern student. Comfortable enough for marathon study sessions.", fabric: "Premium Cotton", care: "Gentle machine wash" },

    // Casual/Semi-Formal
    { id: 9, name: "Versatile Elegance", category: "casual", price: "2,299", colors: ["#2c2c2c", "#8b0000", "#191970"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1693988100058-cf25a1b16001?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.9, reviews: 234, description: "The perfect balance between professional and party-ready. Your go-to for any occasion.", fabric: "Cotton Silk", care: "Dry clean recommended" },
    { id: 10, name: "Evening Grace", category: "casual", price: "2,899", colors: ["#1a1a1a", "#800020", "#4b0082"], sizes: ["S", "M", "L", "XL", "XXL"], image: "https://images.unsplash.com/photo-1678536514772-9febabd241fd?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 5.0, reviews: 178, description: "Sophisticated enough for cocktail parties, comfortable enough for office gatherings.", fabric: "Silk Blend", care: "Hand wash or dry clean" },
    { id: 11, name: "Social Butterfly", category: "casual", price: "2,599", colors: ["#000000", "#c71585", "#483d8b"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1678536517469-02b36558b9fb?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rating: 4.8, reviews: 156, description: "Effortlessly chic for brunches, dinners, and everything in between.", fabric: "Cotton Silk Blend", care: "Machine wash gentle" },
    { id: 12, name: "Occasion Ready", category: "casual", price: "3,199", colors: ["#1c1c1c", "#8b4789", "#2f4f4f"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=800&fit=crop&q=80", rating: 4.9, reviews: 201, description: "From office presentations to evening celebrations, this kurti does it all with grace.", fabric: "Premium Silk", care: "Dry clean only" },
  ];

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category === activeCategory);

  if (selectedProduct) {
    return (
      <>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
          .font-serif-elegant { font-family: 'Playfair Display', serif; }
          .font-cursive { font-family: 'Cormorant Garamond', serif; }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .product-card {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}</style>

        <div className="min-h-screen bg-black text-white">
          {/* Floating Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-white text-black shadow-xl flex items-center justify-center"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Side Menu */}
          <div
            className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            onClick={() => setMenuOpen(false)}
          >
            <div
              className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-black border-l border-white/10 transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-12 h-full flex flex-col">
                <div className="mb-16">
                  <a href="/" className="text-5xl font-cursive italic mb-2">Kurtify</a>
                  <p className="text-sm text-white/40 tracking-widest uppercase">Menu</p>
                </div>

                <nav className="flex-1 flex flex-col space-y-8">
                  <a href="/" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                    Home
                  </a>
                  <a href="/collection" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                    Collections
                  </a>
                  <a href="#" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                    New Arrivals
                  </a>
                  <a href="/about" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                    About
                  </a>
                </nav>

                <div className="mt-auto">
                  <div className="flex space-x-4 mb-8">
                    <Search className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                    <Heart className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                    <div className="relative" onClick={() => { setMenuOpen(false); setCartOpen(true); }}>
                      <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                      {getTotalItems() > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-xs font-medium rounded-full flex items-center justify-center">
                          {getTotalItems()}
                        </span>
                      )}
                    </div>
                    <User className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                  </div>
                  <p className="text-xs text-white/30 tracking-widest uppercase">© 2025 Kurtify</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="fixed top-6 left-6 z-50">
            <a href="/" className="text-4xl font-cursive italic tracking-wide">Kurtify</a>
          </div>

          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedProduct(null);
              window.scrollTo(0, 0);
            }}
            className="fixed top-24 left-6 z-50 text-sm uppercase tracking-widest hover:text-gray-400 transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </button>

          {/* Product Detail */}
          <div className="pt-32 pb-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Product Image */}
                <div className="relative aspect-[3/4] bg-gray-900">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
                      {selectedProduct.category === "office" ? "Office Wear" :
                        selectedProduct.category === "school" ? "School Wear" : "Casual"}
                    </p>
                    <h2 className="text-5xl md:text-6xl font-serif-elegant mb-4 tracking-tight">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-white' : 'fill-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-white/60">
                        {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-4xl font-light mb-8">₹ {selectedProduct.price}</p>
                  </div>

                  <div className="border-t border-white/10 pt-8 mb-8">
                    <p className="text-white/80 leading-relaxed mb-6 font-light">
                      {selectedProduct.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div>
                        <p className="text-white/40 uppercase tracking-widest text-xs mb-1">Fabric</p>
                        <p className="font-light">{selectedProduct.fabric}</p>
                      </div>
                      <div>
                        <p className="text-white/40 uppercase tracking-widest text-xs mb-1">Care</p>
                        <p className="font-light">{selectedProduct.care}</p>
                      </div>
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest mb-4 text-white/60">Select Color</p>
                    <div className="flex gap-3">
                      {selectedProduct.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 border-2 transition-all ${selectedColor === color ? 'border-white scale-110' : 'border-white/30'
                            }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest mb-4 text-white/60">Select Size</p>
                    <div className="flex gap-3">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 border font-light transition-all ${selectedSize === size
                            ? 'border-white bg-white text-black'
                            : 'border-white/30 hover:border-white'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest mb-4 text-white/60">Quantity</p>
                    <div className="flex items-center gap-4 w-32">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border border-white/30 hover:border-white transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 border border-white/30 hover:border-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-auto">
                    <button
                      className="flex-1 bg-white text-black py-4 uppercase tracking-widest text-sm font-light hover:bg-white/90 transition-colors"
                      onClick={() => {
                        if (!selectedColor) {
                          toast.error("Please select a color");
                          return;
                        }
                        addItem(selectedProduct as Product, selectedSize, selectedColor, quantity);
                        toast.success(`${selectedProduct.name} added to cart`, {
                          description: `Size: ${selectedSize} • Qty: ${quantity}`,
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                    <button className="w-14 h-14 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-white/10 py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div>
                  <h4 className="text-3xl font-cursive italic mb-4">Kurtify</h4>
                  <p className="text-sm text-white/40 font-light leading-relaxed">
                    Redefining elegance, one kurti at a time.
                  </p>
                </div>
                <div>
                  <h5 className="text-sm uppercase tracking-widest mb-6 text-white/60">Shop</h5>
                  <ul className="space-y-3 text-sm text-white/40 font-light">
                    <li><a href="#" className="hover:text-white transition-colors duration-300">New Arrivals</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Collections</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Sale</a></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm uppercase tracking-widest mb-6 text-white/60">Support</h5>
                  <ul className="space-y-3 text-sm text-white/40 font-light">
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Shipping</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Returns</a></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm uppercase tracking-widest mb-6 text-white/60">Follow</h5>
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">IN</div>
                    <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">FB</div>
                    <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">IG</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 tracking-widest uppercase">
                <p>© 2024 Kurtify. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        .font-serif-elegant { font-family: 'Playfair Display', serif; }
        .font-cursive { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      <div className="min-h-screen bg-black text-white">
        {/* Floating Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`fixed top-6 right-6 z-50 transition-all duration-500 ${scrolled
            ? 'w-14 h-14 rounded-full bg-white text-black shadow-xl'
            : 'w-auto h-auto bg-transparent text-white'
            }`}
        >
          {scrolled ? (
            <div className="flex items-center justify-center">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          ) : (
            <div className="flex items-center space-x-6 px-6">
              <Search className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
              <Heart className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
              <div className="relative" onClick={() => setCartOpen(true)}>
                <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-black text-[10px] font-medium rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <User className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors duration-300 hidden md:block" />
              <Menu className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" onClick={() => setMenuOpen(true)} />
            </div>
          )}
        </button>

        {/* Side Menu */}
        <div
          className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-black border-l border-white/10 transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-12 h-full flex flex-col">
              <div className="mb-16">
                <h2 className="text-5xl font-cursive italic mb-2">Kurtify</h2>
                <p className="text-sm text-white/40 tracking-widest uppercase">Menu</p>
              </div>

              <nav className="flex-1 flex flex-col space-y-8">
                <a href="#" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                  Home
                </a>
                <a href="#" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                  Collections
                </a>
                <a href="#" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                  New Arrivals
                </a>
                <a href="#" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                  About
                </a>
              </nav>

              <div className="mt-auto">
                <div className="flex space-x-4 mb-8">
                  <Search className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                  <Heart className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                  <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                  <User className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
                </div>
                <p className="text-xs text-white/30 tracking-widest uppercase">© 2024 Kurtify</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="fixed top-6 left-6 z-50">
          <h1 className="text-4xl font-cursive italic tracking-wide">Kurtify</h1>
        </div>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black opacity-60 z-10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(30%) contrast(1.1)'
          }}></div>

          <div className="relative z-10 text-center max-w-5xl px-6">
            <div className="flex justify-center mb-6">
            </div>
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-serif-elegant mb-6 tracking-tight leading-none">
              Collections
            </h2>
            <p className="text-xl md:text-2xl font-cursive italic text-white/80 mb-12 tracking-wide">
              Curated elegance for every occasion
            </p>
          </div>

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-20">
            <p className="text-xs tracking-widest uppercase text-white/40">Scroll</p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm tracking-widest uppercase text-white/40 mb-4">Filter</p>
            <div className="flex flex-wrap justify-center gap-12">
              <button
                onClick={() => setActiveCategory("all")}
                className={`text-2xl font-serif-elegant transition-all duration-300 pb-2 border-b-2 ${activeCategory === "all" ? 'border-white' : 'border-transparent hover:border-white/30'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory("office")}
                className={`text-2xl font-serif-elegant transition-all duration-300 pb-2 border-b-2 ${activeCategory === "office" ? 'border-white' : 'border-transparent hover:border-white/30'
                  }`}
              >
                Office Wear
              </button>
              <button
                onClick={() => setActiveCategory("school")}
                className={`text-2xl font-serif-elegant transition-all duration-300 pb-2 border-b-2 ${activeCategory === "school" ? 'border-white' : 'border-transparent hover:border-white/30'
                  }`}
              >
                School Wear
              </button>
              <button
                onClick={() => setActiveCategory("casual")}
                className={`text-2xl font-serif-elegant transition-all duration-300 pb-2 border-b-2 ${activeCategory === "casual" ? 'border-white' : 'border-transparent hover:border-white/30'
                  }`}
              >
                Casual
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedColor(product.colors[0]);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="relative overflow-hidden mb-6 aspect-[3/4] bg-gray-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Heart className="w-5 h-5 text-black" />
                  </button>
                </div>

                <div className="text-center">
                  <h5 className="font-cursive text-2xl mb-2 italic">{product.name}</h5>
                  <p className="text-sm tracking-widest mb-4 text-white/40">₹ {product.price}</p>
                  <button className="border border-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <h4 className="text-3xl font-cursive italic mb-4">Kurtify</h4>
                <p className="text-sm text-white/40 font-light leading-relaxed">
                  Redefining elegance, one kurti at a time.
                </p>
              </div>
              <div>
                <h5 className="text-sm uppercase tracking-widest mb-6 text-white/60">Shop</h5>
                <ul className="space-y-3 text-sm text-white/40 font-light">
                  <li><a href="#" className="hover:text-white transition-colors duration-300">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Collections</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Sale</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm uppercase tracking-widest mb-6 text-white/60">Support</h5>
                <ul className="space-y-3 text-sm text-white/40 font-light">
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Shipping</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Returns</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm uppercase tracking-widest mb-6 text-white/60">Follow</h5>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">IN</div>
                  <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">FB</div>
                  <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">IG</div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 tracking-widest uppercase">
              <p>© 2024 Kurtify. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}