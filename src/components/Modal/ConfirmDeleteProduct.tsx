import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../interfaces/Product";
import { Button } from "../ui/Button";

interface ConfirmDeleteProps {
  product: Product | null;
  onClose: () => void;
}

export function ConfirmDeleteProduct({ product, onClose }: ConfirmDeleteProps) {
  const { deleteProduct } = useProducts();

  if (!product) return null;
  const handleDeleteProduct = () => {
    deleteProduct(product.id);
    onClose();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full">
        <svg
          className="w-6 h-6 text-red-600 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
        Eliminar producto
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
        ¿Estás seguro de que quieres eliminar
        <strong className="text-gray-900 dark:text-white">
          {product.name}
        </strong>
        ?
        <br />
        <span className="text-sm text-gray-500 dark:text-gray-500">
          Esta acción no se puede deshacer.
        </span>
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <Button variant="outline" onClick={onClose} className="sm:order-1">
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleDeleteProduct}
          className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 sm:order-2"
        >
          Eliminar producto
        </Button>
      </div>
    </div>
  );
}
