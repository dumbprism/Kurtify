// Product type based on the existing product structure in collection page
export interface Product {
    id: string | number;
    name: string;
    category: string;
    price: string;
    colors: string[];
    sizes: string[];
    image: string;
    rating: number;
    reviews: number;
    description: string;
    fabric: string;
    care: string;
}

// Cart item extends product with selected options
export interface CartItem {
    id: string; // Unique cart item ID (productId-size-color)
    product: Product;
    selectedSize: string;
    selectedColor: string;
    quantity: number;
}

// Cart store state and actions
export interface CartState {
    items: CartItem[];
    addItem: (product: Product, size: string, color: string, quantity: number) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}
