import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../redux/store';
import {
  addProduct,
  deleteProduct,
  updateProduct,
  updateAllProducts,
  selectProducts,
  selectProductById,
} from '../redux/slices/productsSlice';
import type { Product } from '../interfaces/Product';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);

  return {
    products,
    getProduct: (id: string) => useSelector(selectProductById(id)),
    addProduct: (product: Product) => dispatch(addProduct(product)),
    deleteProduct: (id: string) => dispatch(deleteProduct(id)),
    updateProduct: (id: string, updates: Partial<Product>) =>
      dispatch(updateProduct({ id, updates })),
    updateAllProducts: (product: Product[]) => dispatch(updateAllProducts(product)),
  };
};
