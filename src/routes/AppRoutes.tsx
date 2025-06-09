import { Route, Routes, Navigate } from "react-router";
import { Layout } from "../layouts/Layout";
import { ProductDetail } from "../pages/ProductDetail";
import { Cart } from "../pages/Cart";
import { HomePage } from "../pages/HomePage";
import { Dashboard } from "../pages/admin/Dashboard";
import { OrderManagement } from "../pages/admin/OrderManagement";
import { Login } from "../pages/Login";
import { Checkout } from "../pages/Checkout";
import { useAuth } from "../hooks/useAuth";
import { NotFound } from "../pages/NotFound";

export function AppRoutes() {
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route
          path="/admin"
          element={
            isAuthenticated && currentUser?.role === "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="admin/order-management"
          element={
            isAuthenticated && currentUser?.role === "admin" ? (
              <OrderManagement />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
