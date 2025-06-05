import { ProductsProvider } from "./ProductProvider";
import { UsersProvider } from "./UserProvider";
import { CartsProvider } from "./CartProvider";
import { OrdersProvider } from "./OrderProvider";
import type { ReactNode } from "react";

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <UsersProvider>
    <ProductsProvider>
      <CartsProvider>
        <OrdersProvider>
          {children}
        </OrdersProvider>
      </CartsProvider>
    </ProductsProvider>
  </UsersProvider>
);
