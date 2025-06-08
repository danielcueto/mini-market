import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../redux/store';
import {
  updateAllCarts,
  getOrCreateCart,
  deleteCart,
  addCartItem,
  deleteCartItem,
  updateCartItem,
  selectCarts,
} from '../redux/slices/cartsSlice';
import type { Cart, CartItem } from '../interfaces/Cart';

export const useCarts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const carts = useSelector(selectCarts);

  const getCartByUser = (userId: string): Cart | undefined => {
    return carts.find(cart => cart.userId === userId);
  };

  return {
    Carts: carts,
    getCartByUser,
    createCartIfNotExists: (userId: string) => dispatch(getOrCreateCart({ userId })),
    updateAllCarts: (carts: Cart[]) => dispatch(updateAllCarts(carts)),
    deleteCart: (id: string) => dispatch(deleteCart(id)),
    addCartItem: (cartId: string, cartItem: CartItem) =>
      dispatch(addCartItem({ cartId, cartItem })),
    deleteCartItem: (cartId: string, cartItemId: string) =>
      dispatch(deleteCartItem({ cartId, cartItemId })),
    updateCartItem: (cartId: string, cartItemId: string, updates: Partial<CartItem>) =>
      dispatch(updateCartItem({ cartId, cartItemId, updates })),
  };
};
