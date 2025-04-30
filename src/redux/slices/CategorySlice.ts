import { Category } from "../../types/types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CategoriesState {
    categories: Category[];
    selectedCategory: string | null; 
  }
  
  const initialState: CategoriesState = {
    categories: [],
    selectedCategory: null,
  };
  
  const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
      setCategories: (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      },
      setSelectedCategory: (state, action: PayloadAction<string | null>) => {
        state.selectedCategory = action.payload;
      },
    },
  });
  
  export const { setCategories, setSelectedCategory } = categoriesSlice.actions;
  export default categoriesSlice.reducer;