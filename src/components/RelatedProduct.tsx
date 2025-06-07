import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";

export function RelatedProduct() {
  const { products } = useProducts();

  return (
    <div className="mt-8">
      <hr />
      <h3 className="text-lg font-semibold mt-2 mb-4">Related Products</h3>
      <div className="flex gap-10 md:gap-20 overflow-x-auto max-w-full pb-2">
        {products.map((product) => (
          <div
            className="min-w-[96px] sm:min-w-[120px] md:min-w-[140px] h-24 sm:h-28 md:h-32 overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-full object-fit" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
