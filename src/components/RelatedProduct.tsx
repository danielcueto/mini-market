import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";

export function RelatedProduct() {
  const { products } = useProducts();

  return (
    <div className="space-y-6">
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        <span className="dark:text-[#C6FF00] text-[#769700]">Productos</span> relacionados
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.slice(0, 6).map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-[#C6FF00] transition-all duration-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {product.name}
              </p>
              <p className="text-sm dark:text-[#C6FF00] text-[#769700] font-semibold">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
