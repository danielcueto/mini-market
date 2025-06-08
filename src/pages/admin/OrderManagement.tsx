import { OrderTable } from "../../components/OrderTable";
import { useOrders } from "../../hooks/useOrders";

export function OrderManagement() {
    const { orders } = useOrders();

    return (
        <div className="flex flex-col w-full gap-8 mt-5 md:mt-20">
            <div className="flex justify-end">
                <h2 className="text-md md:text:lg lg:text-lg font-semibold">Customer Orders</h2>
            </div>
            <OrderTable orders={orders} />
        </div>
    )
}
