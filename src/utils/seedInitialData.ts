import type { AppDispatch } from "../redux/store";
import { products } from "../seeds/productSeed";
import { users } from "../seeds/userSeed";
import { carts } from "../seeds/cartSeed";
import { orders } from "../seeds/orderSeed";

import { updateAllProducts } from "../redux/slices/productsSlice";
import { updateAllUsers } from "../redux/slices/usersSlice";
import { updateAllCarts } from "../redux/slices/cartsSlice";
import { updateAllOrders } from "../redux/slices/ordersSlice";
import {
  LOCAL_STORAGE_KEY_CARTS,
  LOCAL_STORAGE_KEY_ORDERS,
  LOCAL_STORAGE_KEY_PRODUCTS,
  LOCAL_STORAGE_KEY_USERS,
} from "../constants/localStorage";

export const seedInitialData = (dispatch: AppDispatch) => {
  dispatch(updateAllProducts(products));
  dispatch(updateAllUsers(users));
  dispatch(updateAllCarts(carts));
  dispatch(updateAllOrders(orders));

  localStorage.setItem(LOCAL_STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
  localStorage.setItem(LOCAL_STORAGE_KEY_CARTS, JSON.stringify(carts));
  localStorage.setItem(LOCAL_STORAGE_KEY_ORDERS, JSON.stringify(orders));
};
