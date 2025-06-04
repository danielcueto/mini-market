import { Route, Routes } from "react-router";
import { Layout } from "../layouts/Layout";
import { ProductDetail } from "../pages/ProductDetail";
import { Cart } from "../pages/Cart";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout/>}>
               <Route index element={<h1>Home</h1>}/>
               <Route path="/product-detail" element={<ProductDetail/>}/>
               <Route path="/cart" element={<Cart/>}/>
            </Route>
        </Routes>
    );

}
