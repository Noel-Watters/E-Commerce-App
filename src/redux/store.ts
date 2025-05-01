// store.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/ProductSlice';
import categoriesReducer from './slices/CategorySlice';
import cartReducer from './slices/CartSlice';
import userReducer from './slices/UserSlice'; 

export const store = configureStore({
   reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    user: userReducer, 
   }, 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

