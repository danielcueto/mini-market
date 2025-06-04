import { FaShoppingCart, FaRegUserCircle, FaSquare } from "react-icons/fa";
import { SwitchRole } from "./SwichRole";
import { Link } from "react-router";

export function Header() {
    return (
        <header className="bg-orange-100 flex justify-between items-center p-5">
            <div className="flex items-center gap-6">
                <Link to="/">
                    <FaSquare />
                    <h1> Mini Market</h1>
                </Link>
               <SwitchRole  />
            </div>

            <div>
                <Link to="/cart" className="flex items-center gap-2"  >
                    <FaShoppingCart />
                    <span>Cart (0)</span>
                </Link>
                <Link to="/profile" className="flex items-center gap-2">
                    <FaRegUserCircle  />
                    <span>Pedro Perez</span>
                </Link>
            </div>
        </header>
    ); 
}