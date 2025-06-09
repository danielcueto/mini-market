import { OrderTable } from "../../components/OrderTable";
import { useOrders } from "../../hooks/useOrders";

export function OrderManagement() {
  const { orders } = useOrders();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gestión de <span className="text-[#C6FF00]">Pedidos</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Administra y revisa todos los pedidos de clientes
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <OrderTable orders={orders} />
      </div>
    </div>
  );
}
