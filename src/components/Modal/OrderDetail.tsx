interface OrderDetailsModalProps {
  order: {
    id: number;
    customer: string;
    date: string;
    total: number;
    items: {
      product: string;
      quantity: number;
      price: number;
    }[];
  };
}

export function OrderDetail({ order }: OrderDetailsModalProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Order #{order.id}</h3>
      <p>
        <strong>Customer:</strong> {order.customer}
      </p>
      <p>
        <strong>Date:</strong> {order.date}
      </p>

      <div className="mt-4 border-t pt-2">
        <h4 className="font-semibold mb-1">Items</h4>

        <div className="max-h-[80px] overflow-y-auto pr-2">
          <ul className="space-y-1">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>
                  {item.product} x {item.quantity}
                </span>
                <span>${item.quantity * item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 text-right font-bold">Total: ${order.total}</div>
    </div>
  );
}
