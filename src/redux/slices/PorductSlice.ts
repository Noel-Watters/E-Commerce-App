import { Product } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice ({
    name: 'product',
    initialState,
    reducers: {
        //Sets the products in the state
        setProducts: (state, action: PayloadAction<Product[]>) => { 
            state.products = action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;