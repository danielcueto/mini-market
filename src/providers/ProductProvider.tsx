import { useEffect, useState, type ReactNode } from "react";
import { LOCAL_STORAGE_KEY_PRODUCTS } from "../constants/localStorage";
import type { Product } from "../interfaces/Product";
import { ProductsContext } from "../contexts/ProductContext";

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_PRODUCTS);
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (error) {
        console.error("Error while parsing products from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const updateAllProducts = (newProducts: Product[]) => {
    setProducts([...newProducts]);
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductsContext.Provider
      value={{
        addProduct,
        deleteProduct,
        getProduct,
        products,
        updateProduct,
        updateAllProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
