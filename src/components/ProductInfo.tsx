import { useState } from "react";
import { useCarts } from "../hooks/useCarts";
import { useAuth } from "../hooks/useAuth";
import type { CartItem } from "../interfaces/Cart";
import type { Product } from "../interfaces/Product";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";

interface ProductInfoProps {
    product?: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const { getCartByUser, addCartItem, createCartIfNotExists, updateCartItem } = useCarts();
    const { currentUser } = useAuth();
    const [quantity, setQuantity] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

     const handleAddToCart = () => {
        let cart = getCartByUser(currentUser!.id);
        if (!cart) {
            createCartIfNotExists(currentUser!.id);
            cart = getCartByUser(currentUser!.id);
        }

        const existingItem = cart!.items.find(item => item.product.name === product!.name);

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + quantity,
            };
            updateCartItem(cart!.id, existingItem.id, updatedItem);
        } else {
            const newCartItem: CartItem = {
                id: crypto.randomUUID(),
                product: product!,
                quantity: quantity,
            };
            addCartItem(cart!.id, newCartItem);
        }
        setQuantity(1);
    };

  return (
    <div className="space-y-6">
 
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          {product?.name}
        </h1>
        <span className="text-2xl lg:text-3xl font-bold text-[#C6FF00]">
          ${product?.price?.toFixed(2)}
        </span>
      </div>

      {product?.category && (
        <div className="inline-flex px-3 py-1 text-sm font-medium bg-[#C6FF00]/10 dark:bg-[#C6FF00]/20 text-[#C6FF00] border border-[#C6FF00]/30 rounded-full">
          {product.category}
        </div>
      )}

      <Card>
        <CardContent>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Descripción
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {product?.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                htmlFor="quantity"
              >
                Cantidad
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#C6FF00] focus:border-[#C6FF00] transition-colors"
                value={quantity}
                onChange={handleChange}
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => {
                alert("Producto agregado al carrito");
                handleAddToCart();
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              Agregar al carrito
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
