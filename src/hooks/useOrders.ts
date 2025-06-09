import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../redux/store';
import {
  addOrder,
  updateAllOrders,
  selectOrders
} from '../redux/slices/ordersSlice';
import type { Order } from '../interfaces/Order';

export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders);
  const getOrder = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  return {
    orders,
    getOrder,
    addOrder: (order: Order) => dispatch(addOrder(order)),
    updateAllOrders: (newOrders: Order[]) => dispatch(updateAllOrders(newOrders)),
  };
};
