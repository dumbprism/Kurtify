"use client";
import { ShoppingBag, Heart, User, Search, Menu, X, ArrowRight, Star, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store";
import type { Product } from "@/store";
import { toast } from "sonner";
import { CartSidebar } from "@/components/cart-sidebar";
import { saleorClient } from "@/lib/saleor/client";
import { GET_COLLECTIONS_QUERY, GET_PRODUCTS_QUERY } from "@/lib/saleor/queries";
import { getProductImageUrl, PRODUCT_IMAGE_HEIGHT, PRODUCT_IMAGE_WIDTH } from "@/lib/saleor/images";
import { getCollectionProductIds, getProductRating } from "@/lib/saleor/product-utils";
import { SALEOR_CHANNEL } from "@/lib/saleor/config";
import { useQuery } from "@tanstack/react-query";

export default function NewArrivals() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const { addItem, getTotalItems } = useCartStore();

  const { data: productData, isLoading } = useQuery({
    queryKey: ['new-arrivals-products'],
    queryFn: async () => saleorClient.request(GET_PRODUCTS_QUERY, {
      first: 100,
      channel: SALEOR_CHANNEL
    }),
  });
  const { data: collectionsData } = useQuery({
    queryKey: ["collections-for-new-arrivals"],
    queryFn: async () => saleorClient.request(GET_COLLECTIONS_QUERY, {
      first: 50,
      channel: SALEOR_CHANNEL,
    }),
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const newArrivalIds = getCollectionProductIds(collectionsData, "new arrivals");
  const products: Product[] = ((productData as any)?.products?.edges || []).map(({ node }: any) => {
    if (!newArrivalIds.has(node.id)) {
      return null;
    }

    const productTypeName = node.productType?.name?.toLowerCase().trim() || "";
    const category = productTypeName === "office wear kurti"
      ? "office"
      : productTypeName === "college wear kurti"
        ? "school"
        : productTypeName === "party wear kurti"
          ? "casual"
          : "casual";

    // Handle Description (Saleor description is often JSON blocks or HTML string)
    let description = "No description available.";
    if (typeof node.description === 'string') {
      description = node.description; // HTML string
    } else if (node.description && typeof node.description === 'object') {
      // Fallback for rich text blocks - simplifying for now to just show a default or extracting if easy. 
      // For now, assuming it might be a JSON block we can't easily parse without a library, so we check if there's a plain text version if available or just use a generic text.
      // Actually, Saleor 'description' field in simple query often returns raw JSON. 
      // Let's try to see if there is 'blocks' or just leave it as valid text if possible. 
      // For robustness, we will try to use plain text if we can, but since we don't have a parser:
      description = "Description in details.";
    }

    // Try to parse JSON description if it looks like one
    try {
      const descObj = JSON.parse(node.description);
      if (descObj.blocks) {
        description = descObj.blocks.map((b: any) => b.data?.text).join(" ");
      }
    } catch (e) {
      // It's likely HTML or plain text
      description = node.description || "No description available.";
      // Strip HTML tags if simple display needed
      description = description.replace(/<[^>]*>?/gm, '');
    }


    const { rating, reviews } = getProductRating(node);

    return {
      id: node.id,
      name: node.name,
      category,
      price: node.pricing?.priceRange?.start?.gross?.amount?.toString() || "0",
      colors: ["#000000", "#ffffff", "#808080"], // Mock colors
      sizes: ["S", "M", "L", "XL"], // Mock sizes
      image: getProductImageUrl(node),
      rating,
      reviews,
      description: description.substring(0, 300) + (description.length > 300 ? "..." : ""), // Truncate if too long
      fabric: "Cotton Blend", // Mock fabric
      care: "Machine wash cold", // Mock care
    };
  }).filter(Boolean) as Product[];

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category === activeCategory);

  if (selectedProduct) {
    return (
      <>
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
                  <p className="text-xs text-white/30 tracking-widest uppercase">© 2024 Kurtify</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="fixed top-6 left-6 z-50">
            <h1 className="text-4xl font-cursive italic tracking-wide">Kurtify</h1>
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
                    width={PRODUCT_IMAGE_WIDTH}
                    height={PRODUCT_IMAGE_HEIGHT}
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
                        {selectedProduct.rating > 0
                          ? `${selectedProduct.rating.toFixed(1)} (${selectedProduct.reviews} reviews)`
                          : "No ratings yet"}
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
                <a href="/" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                  Home
                </a>
                <a href="/collection" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
                  Collections
                </a>
                <a href="/new-arrivals" className="text-4xl font-serif-elegant hover:text-gray-400 transition-colors duration-300 border-b border-white/10 pb-4">
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(30%) contrast(1.1)'
          }}></div>

          <div className="relative z-10 text-center max-w-5xl px-6">
            <div className="flex justify-center mb-6">
            </div>
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-serif-elegant mb-6 tracking-tight leading-none">
              New Arrivals
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
                    width={PRODUCT_IMAGE_WIDTH}
                    height={PRODUCT_IMAGE_HEIGHT}
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
