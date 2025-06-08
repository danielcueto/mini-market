import { useEffect, useMemo, useState } from "react";
import { Summary } from "../components/Summary";
import { useCarts } from "../hooks/useCarts";
import { useAuth } from "../hooks/useAuth";
import { type Cart, type CartItem } from "../interfaces/Cart";
import { CartRow } from "../components/CartRow";
import { useNavigate } from "react-router";
import Modal from "../components/ Modal";
import { ConfirmOrder } from "../components/Modal/ConfirmOrder";
import type { Order } from "../interfaces/Order";
import { useOrders } from "../hooks/useOrders";

export function Cart() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { addOrder } = useOrders();
  const {
    getCartByUser,
    createCartIfNotExists,
    updateCartItem,
    deleteCartItem,
    deleteCart,
  } = useCarts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) createCartIfNotExists(currentUser!.id);
  }, [currentUser]);
  const cart = getCartByUser(currentUser!.id);

  const subtotal: number = useMemo((): number => {
    let productsSubtotal = 0;
    cart?.items.map((cartItem: CartItem) => {
      productsSubtotal += cartItem.product.price * cartItem.quantity;
    });
    const numberRounded = Math.round(productsSubtotal * 100) / 100;
    return numberRounded;
  }, [cart]);

  const onChangeQuantity = (cartItemId: string, quantity: number) => {
    if (cart)
      updateCartItem(cart!.id, cartItemId, {
        quantity: quantity,
      });
  };

  const onClickRemoveItem = (cartItemId: string) => {
    if (cart) deleteCartItem(cart!.id, cartItemId);
  };

  const onConfirmOrder = () => {
    if (!cart || !cart?.items || !cart?.items.length) return;
    const orderId = crypto.randomUUID();
    const order: Order = {
      cart: {
        items: [...cart!.items],
        userId: currentUser!.id,
      },
      id: orderId,
      customerName: currentUser!.username,
      date: Date.now(),
      total: subtotal,
    };

    addOrder(order);
    deleteCart(cart.id);

    if (cart && cart.items.length) navigate(`/checkout/${orderId}`);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="min-w-[320px] flex flex-col-reverse gap-2 p-3 md:grid md:grid-cols-[1fr_30%] md:gap-3 md:justify-items-center w-full">
        <section className="w-full">
          <h1 className="font-bold">My Cart</h1>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 border-t-[1px] p-1">
              <div className="font-bold text-center">Item</div>
              <div className="font-bold text-center">Price</div>
              <div className="font-bold text-center">Quantity</div>
              <div className="font-bold text-center">Action</div>
            </div>
            <div className="border-t-[1px] overflow-y-scroll max-h-[200px] md:max-h-[600px]">
              {cart &&
                cart.items.map((cartItem: CartItem) => (
                  <CartRow
                    key={cartItem.id}
                    id={cartItem.id}
                    description={cartItem.product.description}
                    image={cartItem.product.image}
                    onChangeQuantity={onChangeQuantity}
                    onClickRemoveItem={onClickRemoveItem}
                    price={cartItem.product.price}
                    quantity={cartItem.quantity}
                  />
                ))}
              {(!cart?.items || !cart?.items.length) && (
                <p>There are no products</p>
              )}
            </div>
            <div className="text-end border-b-[1px] yrc">
              Subtotal: {subtotal}$
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-3 w-full mb-3">
          <Summary subtotal={subtotal}>
            <button
              className="border-[1px] w-full text-white font-bold bg-gray-400 p-2"
              type="button"
              disabled={!cart?.items?.length}
              onClick={() => setIsModalOpen(true)}
            >
              Checkout
            </button>
          </Summary>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ConfirmOrder
              onConfirmOrder={onConfirmOrder}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        </section>
      </div>
    </div>
  );
}
