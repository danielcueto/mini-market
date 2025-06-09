import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartsReducer from './slices/cartsSlice';
import usersReducer from './slices/usersSlice';
import ordersReducer from './slices/ordersSlice';
import { LOCAL_STORAGE_KEY_CARTS, LOCAL_STORAGE_KEY_ORDERS, LOCAL_STORAGE_KEY_PRODUCTS, LOCAL_STORAGE_KEY_USERS } from '../constants/localStorage';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    carts: cartsReducer,
    users: usersReducer,
    orders: ordersReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY_PRODUCTS, JSON.stringify(store.getState().products.products));
  localStorage.setItem(LOCAL_STORAGE_KEY_CARTS, JSON.stringify(store.getState().carts.carts));
  localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(store.getState().users.users));
  localStorage.setItem(LOCAL_STORAGE_KEY_ORDERS, JSON.stringify(store.getState().orders.orders));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
