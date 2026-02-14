"use client";
import { ShoppingBag, Heart, User, Search, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`fixed top-6 right-6 z-50 transition-all duration-500 ${scrolled
            ? "w-14 h-14 rounded-full bg-white text-black shadow-xl"
            : "w-auto h-auto bg-transparent text-white"
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

        <div
          className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-500 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-black border-l border-white/10 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-12 h-full flex flex-col">
              <div className="mb-16">
                <h2 className="text-5xl font-cursive italic mb-2">Kurtify</h2>
                <p className="text-sm text-white/40 tracking-widest uppercase">Menu</p>
              </div>

              <nav className="flex-1 flex flex-col space-y-8">
                <a href="/" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                  Home
                </a>
                <a href="/collection" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                  Collections
                </a>
                <a href="/new-arrivals" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                  New Arrivals
                </a>
                <a href="/about" className="text-4xl font-serif-elegant text-white border-b border-white/40 pb-4">
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

        <div className="fixed top-6 left-6 z-50">
          <h1 className="text-4xl font-cursive italic tracking-wide">Kurtify</h1>
        </div>

        <section className="relative h-[75vh] min-h-[560px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1920&h=1200&fit=crop")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(35%) contrast(1.1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black z-10" />

          <div className="relative z-20 text-center max-w-4xl px-6 opacity-0 animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-sm tracking-widest uppercase text-white/70 mb-4">Our Story</p>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif-elegant tracking-tight mb-6">About Kurtify</h2>
            <p className="text-xl md:text-2xl font-cursive italic text-white/85">
              Crafted for everyday elegance, rooted in tradition.
            </p>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm tracking-widest uppercase text-white/40 mb-4">Who We Are</p>
              <h3 className="text-5xl md:text-6xl font-serif-elegant tracking-tight mb-8">
                Modern Kurtis
                <br />
                For Every Moment
              </h3>
              <p className="text-white/75 font-light leading-relaxed mb-6">
                Kurtify designs kurtis that move naturally through your day, from office routines to
                celebrations and campus life. Each piece is built for comfort, confidence, and timeless style.
              </p>
              <p className="text-white/75 font-light leading-relaxed">
                Our collections are shaped around real use cases: office wear, college wear, and party wear,
                so choosing the right fit for the occasion feels simple and intuitive.
              </p>
            </div>

            <div className="space-y-8">
              <div className="border border-white/20 p-8">
                <p className="text-xs tracking-widest uppercase text-white/50 mb-3">Design Focus</p>
                <p className="font-cursive italic text-2xl">Minimal silhouettes with refined detailing</p>
              </div>
              <div className="border border-white/20 p-8">
                <p className="text-xs tracking-widest uppercase text-white/50 mb-3">Fabric Approach</p>
                <p className="font-cursive italic text-2xl">Soft, breathable blends for all-day wear</p>
              </div>
              <div className="border border-white/20 p-8">
                <p className="text-xs tracking-widest uppercase text-white/50 mb-3">Style Intent</p>
                <p className="font-cursive italic text-2xl">Traditional roots with contemporary ease</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto border border-white/20 p-12 md:p-16 text-center">
            <p className="text-sm tracking-widest uppercase text-white/50 mb-6">Explore</p>
            <h4 className="text-4xl md:text-5xl font-serif-elegant mb-6">Discover The Collection</h4>
            <p className="text-white/70 font-light mb-10 max-w-2xl mx-auto">
              Browse pieces by occasion and product type to find your perfect kurti.
            </p>
            <a
              href="/collection"
              className="inline-flex items-center gap-3 border border-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

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
                  <li><a href="/collection" className="hover:text-white transition-colors duration-300">Collections</a></li>
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
