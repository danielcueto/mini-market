import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Product } from '../../interfaces/Product';
import { LOCAL_STORAGE_KEY_PRODUCTS } from '../../constants/localStorage';

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_PRODUCTS) || '[]'),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<{ id: string; updates: Partial<Product> }>) {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload.updates };
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    updateAllProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, updateAllProducts } = productsSlice.actions;

export const selectProducts = (state: { products: ProductsState }) => state.products.products;
export const selectProductById = (id: string) => (state: { products: ProductsState }) =>
  state.products.products.find(product => product.id === id);

export default productsSlice.reducer;
