import { Outlet } from "react-router"; 
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-1 container mx-auto p-4">
                <Outlet/>
            </main>
            <Footer/>   
        </div>
    );
}