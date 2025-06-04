import { Route, Routes } from "react-router";
import { Layout } from "../layouts/Layout";
import { ProductDetail } from "../pages/ProductDetail";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout/>}>
               <Route index element={<h1>Home</h1>}/>
               <Route path="/product-detail" element={<ProductDetail/>}/>
            </Route>
        </Routes>
    );

}