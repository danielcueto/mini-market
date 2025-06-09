import { useContext } from "react";
import { Button } from "../ui/Button";
import { NotificationContext } from "../../context/NotificationContext";

interface ConfirmOrderProps {
  onConfirmOrder: () => void;
  onClose: () => void;
}

export function ConfirmOrder({ onConfirmOrder, onClose }: ConfirmOrderProps) {
  const context = useContext(NotificationContext);
    
  if (!context) return null;
    
  const { showNotification } = context;
    
  const handleConfirmOrder = () => {
    onConfirmOrder();
    showNotification("Order create succesfull", "success");
    onClose();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-full">
        <svg
          className="w-6 h-6 text-primary-600 dark:text-primary-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
        Confirmar pedido
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
        ¿Confirmar los productos en tu carrito?
        <br />
        <span className="text-sm text-gray-500 dark:text-gray-500">
          Se procesará tu orden inmediatamente.
        </span>
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <Button variant="outline" onClick={onClose} className="sm:order-1">
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirmOrder}
          className="sm:order-2"
        >
          Confirmar pedido
        </Button>
      </div>
    </div>
  );
}
