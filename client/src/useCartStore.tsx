import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { Item } from "./domain/Item"; 
import { CartItem } from "./domain/CartItem";

interface CartState {
  items: CartItem[];
  addToCart: (item: Item, amount?: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item, amount = 1) => {
    const currentItems = get().items;
    const index = currentItems.findIndex((ci) => ci.product._id === item._id);

    if (index !== -1) {
      // Item already in cart, update amount
      const updatedItems = [...currentItems];
      updatedItems[index].amount += amount;
      set({ items: updatedItems });
    } else {
      // New item
      set({ items: [...currentItems, { product: item, amount }] });
    }
  },
  removeFromCart: (itemId) => {
    const updatedItems = get().items.filter(
      (ci) => ci.product._id !== itemId
    );
    set({ items: updatedItems });
  },
  clearCart: () => set({ items: [] }),
}));
