import { FaShoppingCart, FaRegUserCircle, FaSquare } from "react-icons/fa";
import { SwitchRole } from "./SwichRole";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useCarts } from "../hooks/useCarts";
import type { CartItem } from "../interfaces/Cart";

export function Header() {
    const { currentUser, isAuthenticated, logout } = useAuth();
    const { getCartByUser } = useCarts();
 
    const cart = currentUser ? getCartByUser(currentUser.id) : null;
    const cartItemsCount = cart ? cart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0) : 0;
    
    return (
        <header className="bg-orange-100 flex justify-between items-center p-5">
            <div className="flex items-center gap-6">
                <Link to="/">
                    <FaSquare />
                    <h1> Mini Market</h1>
                </Link>
               <SwitchRole  />
            </div>

            <div className="flex items-center gap-4">
                <Link to="/cart" className="flex items-center gap-2"  >
                    <FaShoppingCart />
                    <span>Cart ({cartItemsCount})</span>
                </Link>
                
                <div className="flex items-center gap-2">
                    <FaRegUserCircle  />
                    <span>{isAuthenticated ? currentUser?.username : "No logueado"}</span>
                </div>
                
                {isAuthenticated && (
                    <button 
                        onClick={logout}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                        Logout
                    </button>
                )}
                
                {!isAuthenticated && (
                    <Link to="/login" className="bg-black text-white px-3 py-1 rounded text-sm">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}