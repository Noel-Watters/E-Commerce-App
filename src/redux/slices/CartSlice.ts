// CartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';

// Define the initial state for the cart
interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: JSON.parse(sessionStorage.getItem('cart') || '[]'), // Load cart from session storage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a product to the cart or update its quantity if it already exists
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      sessionStorage.setItem('cart', JSON.stringify(state.items)); // Persist to session storage
    },
    // Update the quantity of a product in the cart
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      sessionStorage.setItem('cart', JSON.stringify(state.items)); // Persist to session storage
    },
    // Remove a product from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      sessionStorage.setItem('cart', JSON.stringify(state.items)); // Persist to session storage
    },
    // Clear the cart (e.g., after checkout)
    clearCart: (state) => {
      state.items = [];
      sessionStorage.removeItem('cart'); // Clear session storage
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
