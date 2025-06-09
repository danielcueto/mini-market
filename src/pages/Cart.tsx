import { useEffect, useMemo, useState } from "react";
import { Summary } from "../components/Summary";
import { useCarts } from "../hooks/useCarts";
import { useAuth } from "../hooks/useAuth";
import { type Cart, type CartItem } from "../interfaces/Cart";
import { CartRow } from "../components/CartRow";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import { ConfirmOrder } from "../components/Modal/ConfirmOrder";
import type { Order } from "../interfaces/Order";
import { useOrders } from "../hooks/useOrders";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";

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
  }, [currentUser, createCartIfNotExists]);
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My <span className="dark:text-[#C6FF00] text-[#769700]">Cart</span>
                </h1>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                  <div className="font-semibold text-sm text-gray-900 dark:text-white text-center">
                    Item
                  </div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white text-center">
                    Price
                  </div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white text-center">
                    Quantity
                  </div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white text-center">
                    Action
                  </div>
                </div>

                <div className="space-y-3 max-h-[400px] lg:max-h-[600px] overflow-y-auto">
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
                    <div className="text-center py-12">
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Your cart is empty
                      </p>
                    </div>
                  )}
                </div>

                {cart?.items && cart.items.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Subtotal:
                        <span className="dark:text-[#C6FF00] text-[#769700] font-bold">
                          ${subtotal}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          <section className="lg:col-span-1">
            <div className="sticky top-8">
              <Summary subtotal={subtotal}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!cart?.items?.length}
                  onClick={() => setIsModalOpen(true)}
                >
                  Checkout
                </Button>
              </Summary>
            </div>
          </section>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ConfirmOrder
            onConfirmOrder={onConfirmOrder}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
}
