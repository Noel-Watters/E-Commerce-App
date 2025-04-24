// store.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/PorductSlice';
import categoriesReducer from './slices/CategorySlice';
import cartReducer from './slices/CartSlice';

export const store = configureStore({
   reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer
   }, 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;