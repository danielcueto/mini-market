import { Outlet } from "react-router"; 
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header />
            <main className="flex-1 pt-24 md:pt-20">
                <Outlet />
            </main>
            <Footer />   
        </div>
    );
}