import { Route, Routes } from "react-router";
import { Layout } from "../layouts/Layout";
import { ProductDetail } from "../pages/ProductDetail";
import { Cart } from "../pages/Cart";
import { HomePage } from "../pages/HomePage";


export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout/>}>
               <Route index element={<HomePage/>}/>
               <Route path="/product-detail" element={<ProductDetail/>}/>
               <Route path="/cart" element={<Cart/>}/>
            </Route>
        </Routes>
    );

}
