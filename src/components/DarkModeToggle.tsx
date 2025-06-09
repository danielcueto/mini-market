import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved
      ? JSON.parse(saved)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(isDark));
  }, [isDark]);
  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent hover:border-[#C6FF00]/30 transition-all duration-200"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? (
        <FaSun className="w-5 h-5 dark:text-[#C6FF00] text-[#769700]" />
      ) : (
        <FaMoon className="w-5 h-5 dark:text-[#C6FF00] text-[#769700]" />
      )}
    </button>
  );
}
