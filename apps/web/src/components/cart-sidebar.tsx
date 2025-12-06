"use client";

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store";

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
    const { items, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCartStore();

    // Format price with commas
    const formatPrice = (price: number) => {
        return price.toLocaleString("en-IN");
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-white/10 z-50 transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="w-5 h-5 text-white" />
                            <h2 className="text-xl font-serif-elegant text-white">Your Cart</h2>
                            <span className="text-sm text-white/60">({getTotalItems()} items)</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
                                <h3 className="text-xl font-serif-elegant mb-2 text-white">Your cart is empty</h3>
                                <p className="text-white/40 text-sm">
                                    Add some beautiful kurtis to your cart
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 pb-6 border-b border-white/10 last:border-0"
                                    >
                                        {/* Product Image */}
                                        <div className="w-24 h-32 bg-gray-900 flex-shrink-0 overflow-hidden">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-cursive text-lg italic leading-tight text-white">
                                                        {item.product.name}
                                                    </h4>
                                                    <p className="text-xs text-white/60 uppercase tracking-widest mt-1">
                                                        Size: {item.selectedSize}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-white/40 hover:text-white transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Color indicator */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-xs text-white/60">Color:</span>
                                                <div
                                                    className="w-4 h-4 rounded-full border border-white/30"
                                                    style={{ backgroundColor: item.selectedColor }}
                                                />
                                            </div>

                                            {/* Quantity & Price */}
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <p className="text-sm tracking-widest text-white">
                                                    ₹ {formatPrice(parseInt(item.product.price.replace(/,/g, ""), 10) * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer with Total & Checkout */}
                    {items.length > 0 && (
                        <div className="p-6 border-t border-white/10 space-y-4">
                            {/* Clear Cart */}
                            <button
                                onClick={clearCart}
                                className="w-full text-sm text-white/40 hover:text-white transition-colors uppercase tracking-widest py-2"
                            >
                                Clear Cart
                            </button>

                            {/* Subtotal */}
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-white/60 uppercase tracking-widest">Subtotal</span>
                                <span className="text-lg text-white">₹ {formatPrice(getTotalPrice())}</span>
                            </div>

                            {/* Checkout Button */}
                            <button className="w-full bg-white text-black py-4 uppercase tracking-widest text-sm font-light hover:bg-white/90 transition-colors">
                                Proceed to Checkout
                            </button>

                            {/* Continue Shopping */}
                            <button
                                onClick={onClose}
                                className="w-full border border-white/30 py-3 uppercase tracking-widest text-xs hover:bg-white/10 transition-colors text-white"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
