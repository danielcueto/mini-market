import { useMemo } from "react";
import { ProductImage } from "../components/ProductImage";
import { ProductInfo } from "../components/ProductInfo";
import { RelatedProduct } from "../components/RelatedProduct";
import { useProducts } from "../hooks/useProducts";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

type Params = {
  id: string;
};

export function ProductDetail() {
  const { id } = useParams<Params>();
  const { products } = useProducts();
  const navigate = useNavigate();

  const product = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [products, id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="dark:text-[#C6FF00] text-[#769700]">Producto</span> no encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            El producto que buscas no existe o ha sido eliminado.
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        <div className="order-2 lg:order-1">
          <ProductImage imageUrl={product.image} />
        </div>
        <div className="order-1 lg:order-2">
          <ProductInfo product={product} />
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
        <RelatedProduct />
      </div>
    </div>
  );
}
