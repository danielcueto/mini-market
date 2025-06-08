import { Route, Routes } from "react-router";
import { Layout } from "../layouts/Layout";
import { ProductDetail } from "../pages/ProductDetail";
import { Cart } from "../pages/Cart";
import { HomePage } from "../pages/HomePage";
import { Dashboard } from "../pages/admin/Dashboard";
import { OrderManagement } from "../pages/admin/OrderManagement";
import { Login } from "../pages/Login";
import { Checkout } from "../pages/Checkout";


export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout/>}>
               <Route index element={<HomePage/>}/>
               <Route path="/product/:id" element={<ProductDetail/>}/>
               <Route path="/cart" element={<Cart/>}/>
               <Route path="/checkout/:id" element={<Checkout/>}/>
               <Route path="/admin" element={<Dashboard/>} />
               <Route path="admin/order-management" element={<OrderManagement/>} />
            </Route>
            <Route path="/login" element={<Login/>} />
        </Routes>
    );
}
