import {
  FaShoppingCart,
  FaRegUserCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { SwitchRole } from "./SwichRole";
import { Link, useNavigate } from "react-router";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { useAuth } from "../hooks/useAuth";
import { useCarts } from "../hooks/useCarts";
import { Notification } from "../components/Notification";
import type { CartItem } from "../interfaces/Cart";

export function Header() {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { getCartByUser } = useCarts();
  const navigate = useNavigate();
  const cart = currentUser ? getCartByUser(currentUser.id) : null;
  const cartItemsCount = cart
    ? cart.items.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      )
    : 0;
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-900/90 border-b border-neutral-200 dark:border-neutral-700 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-neutral-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="flex justify-between items-center py-3 md:hidden">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>

            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Mini
              <span className="dark:text-[#C6FF00] text-[#769700]">Market</span>
            </h1>
          </Link>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-1">
                    {/* Cart Icon with Item Count */} 
                    <FaShoppingCart className="text-lg" />
                    <span className="dark:text-[#C6FF00] text-[#769700]">
                      ({cartItemsCount})
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FaSignOutAlt className="text-lg" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:dark:text-[#C6FF00] rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600"
              >
                <FaSignInAlt className="text-sm" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
        <div className="hidden md:flex justify-between items-center py-4">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Mini
                <span className="dark:text-[#C6FF00] text-[#769700]">
                  Market
                </span>
              </h1>
            </Link>
            {isAuthenticated && <SwitchRole />}
          </div>

          <div className="flex items-center gap-4">
            <DarkModeToggle />
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FaShoppingCart className="text-lg" />
                  <span className="font-medium">
                    Cart
                    <span className="dark:text-[#C6FF00] text-[#769700]">
                      ({cartItemsCount})
                    </span>
                  </span>
                </Link>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 px-3 py-2">
                  <FaRegUserCircle className="text-lg" />
                  <span className="font-medium">{currentUser?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:dark:text-[#C6FF00] transition-colors px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600"
              >
                <FaSignInAlt className="text-lg" />
                <span className="font-medium">Login</span>
              </Link>
            )}
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {isAuthenticated && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-2">
            <SwitchRole />
          </div>
        )}
        <Notification />
      </div>
    </header>
  );
}
