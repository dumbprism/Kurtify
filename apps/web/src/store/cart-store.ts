import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState, Product, CartItem } from "./types";

// Helper to generate unique cart item ID
const generateItemId = (productId: number, size: string, color: string): string => {
    return `${productId}-${size}-${color}`;
};

// Helper to parse price string to number (removes commas)
const parsePrice = (price: string): number => {
    return parseInt(price.replace(/,/g, ""), 10);
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: Product, size: string, color: string, quantity: number) => {
                const itemId = generateItemId(product.id, size, color);
                const existingItem = get().items.find((item) => item.id === itemId);

                if (existingItem) {
                    // Update quantity if item already exists
                    set((state) => ({
                        items: state.items.map((item) =>
                            item.id === itemId
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    }));
                } else {
                    // Add new item
                    const newItem: CartItem = {
                        id: itemId,
                        product,
                        selectedSize: size,
                        selectedColor: color,
                        quantity,
                    };
                    set((state) => ({ items: [...state.items, newItem] }));
                }
            },

            removeItem: (itemId: string) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== itemId),
                }));
            },

            updateQuantity: (itemId: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(itemId);
                    return;
                }
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === itemId ? { ...item, quantity } : item
                    ),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + parsePrice(item.product.price) * item.quantity,
                    0
                );
            },
        }),
        {
            name: "kurtify-cart", // localStorage key
        }
    )
);
