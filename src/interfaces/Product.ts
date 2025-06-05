export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
}

export interface ProductsContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  getProduct: (id: string) => Product | undefined;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateAllProducts: (product: Product[]) => void;
}
