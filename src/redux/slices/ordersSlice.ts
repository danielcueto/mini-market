import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY_ORDERS } from '../../constants/localStorage';
import type { Order } from '../../interfaces/Order';

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ORDERS) || '[]'),
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    updateAllOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
  },
});

export const { addOrder, updateAllOrders } = ordersSlice.actions;

export const selectOrders = (state: { orders: OrdersState }) => state.orders.orders;
export const selectOrderById = (id: string) => (state: { orders: OrdersState }) =>
  state.orders.orders.find(order => order.id === id);

export default ordersSlice.reducer;
