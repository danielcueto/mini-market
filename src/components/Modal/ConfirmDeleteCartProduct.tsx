import { Button } from "../ui/Button";

interface ConfirmDeleteCartProductProps {
  deleteCartItem: () => void;
  onClose: () => void;
}

export function ConfirmDeleteCartProduct({
  deleteCartItem,
  onClose,
}: ConfirmDeleteCartProductProps) {
  const handleDeleteProduct = () => {
    deleteCartItem();
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>{" "}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
        Eliminar producto del carrito
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
        ¿Estás seguro de que quieres eliminar este producto del carrito?
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
          Eliminar del carrito
        </Button>
      </div>
    </div>
  );
}
