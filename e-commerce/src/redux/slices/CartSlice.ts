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
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id.toString());
      if (item) {
        item.quantity = action.payload.quantity;
      }
      sessionStorage.setItem('cart', JSON.stringify(state.items)); // Persist to session storage
    },
    // Remove a product from the cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload.toString());
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

//This is what I need to add:
//I would like to break down and extract logic when necessary to make the code more readable and maintainable
//I would like to add comments to explain the code and its purpose
//all things should be in TypeScript
//all things should be in Redux Toolkit
//all things should be formatted with bootstrap
// I want very minimal added to homepage.tsx :
//example:     
// return (
// <Container>
        //<Row>
           // <CategoryFilter />
       // </Row>

       // <Row>
           // <SetProducts />
       // </Row>
    //</Container>

//);
//Use Redux to mange shopping cart state
//include add, update quantity, & remove items from cart

//Display cart items in a list with total price
//include a fake checkout button that clears the cart & displays a success message
//fake checkout should also clear the session storage
//The cart should be a button present in the header of the app
//The cart should be a modal that opens when the button is clicked

//session storage to persist cart items
//store shopping cart as an array of product objects with quantity property
