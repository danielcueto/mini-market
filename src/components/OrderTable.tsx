import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { OrderDetail } from "./Modal/OrderDetail";
import Modal from "./ Modal";

interface Order {
  id: number;
  customer: string;
  date: string;
  total: number;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
}

const orders: Order[] = [
  {
    id: 1001,
    customer: "Juan Pérez",
    date: "2025-06-01",
    total: 120,
    items: [
      { product: "Coca Cola", quantity: 2, price: 30 },
      { product: "Sprite", quantity: 3, price: 20 },
      { product: "Sprite", quantity: 3, price: 20 },
      { product: "Sprite", quantity: 3, price: 20 },

    ],
  },
  {
    id: 1002,
    customer: "Ana García",
    date: "2025-06-03",
    total: 75,
    items: [
      { product: "Pepsi", quantity: 5, price: 15 },
    ],
  },
];

export function OrderTable() {
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
              <td className="p-2 border">{order.customer}</td>
              <td className="p-2 border">{order.date}</td>
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
