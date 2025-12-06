"use client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { ShoppingBag, Heart, User, Search, ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1612722432474-b971cdcea546?w=1920&h=1080&fit=crop"
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "School Wear", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop" },
    { name: "Office Wear", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop" },
    { name: "Party Wear", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop" }
  ];

  const featured = [
    { name: "Floral Elegance", price: "1,299", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&h=400&fit=crop" },
    { name: "Midnight Grace", price: "2,499", image: "https://images.unsplash.com/photo-1583391733981-4bfd7d2b2825?w=300&h=400&fit=crop" },
    { name: "Cotton Dreams", price: "899", image: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?w=300&h=400&fit=crop" },
    { name: "Silk Enchantment", price: "3,199", image: "https://images.unsplash.com/photo-1610030469985-3e93eb2e6a6e?w=300&h=400&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        
        .font-serif-elegant {
          font-family: 'Playfair Display', serif;
        }
        
        .font-cursive {
          font-family: 'Cormorant Garamond', serif;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* Floating Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`fixed top-6 right-6 z-50 transition-all duration-500 ${
          scrolled 
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
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors duration-300" />
            <User className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors duration-300 hidden md:block" />
            <Menu className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors duration-300" onClick={() => setMenuOpen(true)} />
          </div>
        )}
      </button>

      {/* Side Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div 
          className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-black border-l border-white/10 transition-transform duration-500 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
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

      {/* Logo - Fixed Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <h1 className="text-4xl font-cursive italic tracking-wide">
          Kurtify
        </h1>
      </div>

      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black via-gray-900/50 to-black opacity-60 z-10"></div>
        
        {/* Carousel Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url("${image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(30%) contrast(1.1)'
            }}
          ></div>
        ))}
        
        <div className="relative z-10 text-center max-w-5xl px-6 opacity-0 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            {/* <Sparkles className="w-8 h-8 text-white/60" /> */}
          </div>
          <h2 className="text-7xl md:text-8xl lg:text-9xl font-serif-elegant mb-6 tracking-tight leading-none">
            Kurtify
          </h2>
          <p className="text-xl md:text-2xl font-cursive italic text-white/80 mb-12 tracking-wide">
            Where tradition meets contemporary grace
          </p>
          <button className="group relative px-12 py-4 border border-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-sm font-light overflow-hidden">
            <span className="relative z-10 flex items-center justify-center">
              Explore Collection
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-20">
          {/* <div className="w-px h-16 bg-white/30 mx-auto mb-2"></div> */}
          <p className="text-xs tracking-widest uppercase text-white/40">Scroll</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-sm tracking-widest uppercase text-white/40 mb-4">Collections</p>
          <h3 className="text-5xl md:text-6xl font-serif-elegant tracking-tight">For Every Moment</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="relative h-[600px] overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 z-10"></div>
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end p-8 z-20">
                <div className={`transition-all duration-500 ${hoveredCategory === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'}`}>
                  <div className="w-12 h-px bg-white mb-4"></div>
                  <h4 className="text-3xl font-serif-elegant tracking-tight">{category.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <p className="text-sm tracking-widest uppercase text-black/40 mb-4">Curated</p>
            <h3 className="text-5xl md:text-6xl font-serif-elegant tracking-tight mb-4">Featured Designs</h3>
            <p className="font-cursive italic text-xl text-black/60">Handpicked for the discerning soul</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((product, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-6 aspect-[3/4] bg-gray-100">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-center">
                  <h5 className="font-cursive text-2xl mb-2 italic">{product.name}</h5>
                  <p className="text-sm tracking-widest mb-4 text-black/40">₹ {product.price}</p>
                  <button className="border border-black px-6 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center border border-white/20 p-16">
          <h3 className="text-4xl font-serif-elegant mb-6">Stay Connected</h3>
          <p className="font-cursive italic text-xl text-white/60 mb-8">
            Receive exclusive access to new collections
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent border border-white/30 px-6 py-4 focus:outline-none focus:border-white transition-colors text-center sm:text-left"
            />
            <button className="bg-white text-black px-8 py-4 hover:bg-white/90 transition-all duration-300 uppercase tracking-widest text-sm font-light">
              Subscribe
            </button>
          </div>
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
                <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">
                  IN
                </div>
                <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">
                  FB
                </div>
                <div className="w-10 h-10 border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300 text-xs">
                  IG
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 tracking-widest uppercase">
            <p>© 202 Kurtify. All Rights Reserved.</p>
            {healthCheck.data && (
              <p className="mt-4 md:mt-0">System Connected</p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}