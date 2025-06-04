import { Route, Routes } from "react-router";
import { Layout } from "../layouts/Layout";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout/>}>
               <Route index element={<h1>Home</h1>}/>
            </Route>
        </Routes>
    );

}