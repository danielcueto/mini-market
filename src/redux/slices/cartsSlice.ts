import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY_CARTS } from '../../constants/localStorage';
import type { Cart, CartItem } from '../../interfaces/Cart';

interface CartsState {
  carts: Cart[];
}

const initialState: CartsState = {
  carts: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CARTS) || '[]'),
};

const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    updateAllCarts(state, action: PayloadAction<Cart[]>) {
      state.carts = action.payload;
    },
    deleteCart(state, action: PayloadAction<string>) {
      state.carts = state.carts.filter(c => c.id !== action.payload);
    },
    addCartItem(state, action: PayloadAction<{ cartId: string; cartItem: CartItem }>) {
      const cart = state.carts.find(c => c.id === action.payload.cartId);
      if (cart) {
        cart.items.push(action.payload.cartItem);
      }
    },
    deleteCartItem(state, action: PayloadAction<{ cartId: string; cartItemId: string }>) {
      const cart = state.carts.find(c => c.id === action.payload.cartId);
      if (cart) {
        cart.items = cart.items.filter(i => i.id !== action.payload.cartItemId);
      }
    },
    updateCartItem(
      state,
      action: PayloadAction<{ cartId: string; cartItemId: string; updates: Partial<CartItem> }>
    ) {
      const cart = state.carts.find(c => c.id === action.payload.cartId);
      if (cart) {
        const index = cart.items.findIndex(i => i.id === action.payload.cartItemId);
        if (index !== -1) {
          cart.items[index] = { ...cart.items[index], ...action.payload.updates };
        }
      }
    },
    getOrCreateCart(state, action: PayloadAction<{ userId: string }>) {
      let cart = state.carts.find(c => c.userId === action.payload.userId);
      if (!cart) {
        cart = {
          id: crypto.randomUUID(),
          userId: action.payload.userId,
          items: [],
        };
        state.carts.push(cart);
      }
    },
  },
});

export const {
  updateAllCarts,
  deleteCart,
  addCartItem,
  deleteCartItem,
  updateCartItem,
  getOrCreateCart,
} = cartsSlice.actions;

export const selectCarts = (state: { carts: CartsState }) => state.carts.carts;
export const selectCartByUser = (userId: string) => (state: { carts: CartsState }) =>
  state.carts.carts.find(cart => cart.userId === userId);

export default cartsSlice.reducer;
