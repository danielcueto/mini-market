import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { OrderDetail } from "./Modal/OrderDetail";
import Modal from "./ Modal";
import type { Order } from "../interfaces/Order";
import { formatDate } from "../utils/formatDate";

interface OrderTableProps {
  orders: Order[];
}

export function OrderTable({ orders }: OrderTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-xs md:text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="even:bg-gray-50">
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.customerName}</td>
              <td className="p-2 border">{formatDate(order.date)}</td>
              <td className="p-2 border">${order.total}</td>
              <td className="p-2 border">
                <button
                  className="text-black flex items-center gap-1 cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <FaEye /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <Modal isOpen={true} onClose={() => setSelectedOrder(null)}>
          <OrderDetail order={selectedOrder} />
        </Modal>
      )}
    </div>
  );
}
