import { Route, Routes } from "react-router";
import { Layout } from "../layouts/Layout";
import { ProductDetail } from "../pages/ProductDetail";
import { Cart } from "../pages/Cart";
import { HomePage } from "../pages/HomePage";
import { Dashboard } from "../pages/Admin/Dashboard";
import { OrderManagement } from "../pages/Admin/OrderManagement";


export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout/>}>
               <Route index element={<HomePage/>}/>
               <Route path="/product-detail" element={<ProductDetail/>}/>
               <Route path="/cart" element={<Cart/>}/>
               <Route path="/admin/dashboard" element={<Dashboard/>} />
               <Route path="admin/order-management" element={<OrderManagement/>} />
            </Route>
        </Routes>
    );
}
