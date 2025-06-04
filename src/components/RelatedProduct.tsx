import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  image: string;
}

export function RelatedProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);
  
  return (
    <div className="mt-8">
        <hr />
      <h3 className="text-lg font-semibold mt-2 mb-4">Related Products</h3>
      <div className="flex gap-10 md:gap-20 overflow-x-auto max-w-full pb-2">
        {products.map((product) => (
          <div
            className="min-w-[96px] sm:min-w-[120px] md:min-w-[140px] h-24 sm:h-28 md:h-32 overflow-hidden">
            <img
              src={product.image}
              className="w-full h-full object-fit"
            />
          </div>
         ))}
      </div>
    </div>
  );
}
