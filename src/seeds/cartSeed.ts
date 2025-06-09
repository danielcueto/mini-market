import type { Cart } from "../interfaces/Cart";
import { products } from "./productSeed";
export const carts: Cart[] = [
  {
    id: "cart-1",
    userId: "client-1",
    items: [
      {
        id: "item-1",
        product: {
          image: products[0].image,
          name: products[0].name,
          description: products[0].description,
          price: products[0].price,
        },
        quantity: 2,
      },
      {
        id: "item-2",
        product: {
          image: products[1].image,
          name: products[1].name,
          description: products[1].description,
          price: products[1].price,
        },
        quantity: 1,
      },
    ],
  },
  {
    id: "cart-2",
    userId: "client-2",
    items: [
      {
        id: "item-3",
        product: {
          image: products[2].image,
          name: products[2].name,
          description: products[2].description,
          price: products[2].price,
        },
        quantity: 1,
      },
    ],
  },
];
