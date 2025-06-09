import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function SwitchRole() {
  const { currentUser, isAuthenticated } = useAuth();

  return (
    <nav className="flex items-center gap-6">
      
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-900 dark:text-white"
          }`
        }
      >
        {({ isActive }) => (
          <span className={isActive ? "text-[#C6FF00]" : ""}>Home</span>
        )}
      </NavLink>

      {isAuthenticated && currentUser?.role === "admin" && (
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-900 dark:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <span className={isActive ? "text-[#C6FF00]" : ""}>Admin</span>
          )}
        </NavLink>
      )}
    </nav>
  );
}
