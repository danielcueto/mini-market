import type { Order } from "../../interfaces/Order";
import { formatDate } from "../../utils/formatDate";
import { Card, CardHeader, CardContent } from "../ui/Card";

interface OrderDetailsModalProps {
  order: Order;
}

export function OrderDetail({ order }: OrderDetailsModalProps) {
  return (
    <div className="p-6 max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Pedido #{order.id}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Información del cliente
            </h4>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              {order.customerName}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Fecha del pedido
            </h4>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              {formatDate(order.date)}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <h4 className="font-medium text-gray-900 dark:text-white">
            Productos
          </h4>
        </CardHeader>
        <CardContent>
          <div className="max-h-60 overflow-y-auto">
            <div className="space-y-3">
              {order.cart.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${(item.quantity * item.product.price).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ${item.product.price.toFixed(2)} c/u
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Total:
              </span>
              <span className="text-lg font-bold text-[#C6FF00]">
                ${(order.total || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
