export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Mini <span className="dark:text-[#C6FF00] text-[#769700]">Market</span>
            </h3>
          </div>

          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 Mini Market (Digital Academy). By:
            </p>
            <ul className="mt-2 space-y-1 text-sm show">
              <li className="text-gray-600 dark:text-gray-400 ">
                Daniel <span className="dark:text-[#C6FF00] text-[#769700]">Cueto</span>
              </li>
              <li className="text-gray-600 dark:text-gray-400 ">
                Sebastián <span className="dark:text-[#C6FF00] text-[#769700]">Padilla</span>
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                Daniel <span className="dark:text-[#C6FF00] text-[#769700]">Maldonado</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
