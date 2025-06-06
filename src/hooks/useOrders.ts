import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../redux/store';
import {
  addOrder,
  updateAllOrders,
  selectOrders,
  selectOrderById,
} from '../redux/slices/ordersSlice';
import type { Order } from '../interfaces/Order';

export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders);

  return {
    orders,
    getOrder: (id: string) => useSelector(selectOrderById(id)),
    addOrder: (order: Order) => dispatch(addOrder(order)),
    updateAllOrders: (newOrders: Order[]) => dispatch(updateAllOrders(newOrders)),
  };
};
