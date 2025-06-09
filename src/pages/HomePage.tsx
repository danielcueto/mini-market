import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter, FaTimes, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardFooter } from "../components/ui/Card";
import { useProducts } from "../hooks/useProducts";
import { useCarts } from "../hooks/useCarts";
import { useAuth } from "../hooks/useAuth";
import type { Product } from "../interfaces/Product";
import type { CartItem } from "../interfaces/Cart";

export function HomePage() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { getCartByUser, addCartItem, createCartIfNotExists, updateCartItem } =
    useCarts();
  const { currentUser, isAuthenticated } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSearchTerm("");
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated || !currentUser) {
      navigate("/login");
      return;
    }

    let cart = getCartByUser(currentUser.id);
    if (!cart) {
      createCartIfNotExists(currentUser.id);
      cart = getCartByUser(currentUser.id);
    }

    const existingItem = cart!.items.find(
      (item) => item.product.name === product.name
    );

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updateCartItem(cart!.id, existingItem.id, updatedItem);
    } else {
      const newCartItem: CartItem = {
        id: crypto.randomUUID(),
        product: {
          image: product.image,
          name: product.name,
          description: product.description,
          price: product.price,
        },
        quantity: 1,
      };
      addCartItem(cart!.id, newCartItem);
    }
  };
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    let matchesPrice = true;
    if (selectedPriceRanges.length > 0) {
      matchesPrice = selectedPriceRanges.some((range) => {
        switch (range) {
          case "< $20":
            return product.price < 20;
          case "$20 - $50":
            return product.price >= 20 && product.price <= 50;
          case "$50 - $100":
            return product.price > 50 && product.price <= 100;
          case "$100 - $150":
            return product.price > 100 && product.price <= 150;
          case "$150+":
            return product.price > 150;
          default:
            return true;
        }
      });
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = [...new Set(products.map((p) => p.category))];
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters - Mobile */}
        <div className="lg:hidden mb-6 flex gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C6FF00] focus:border-[#C6FF00] transition-colors"
              placeholder="Search products..."
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="px-4"
          >
            <FaFilter className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`
                        lg:col-span-1
                        ${showFilters ? "block" : "hidden"} lg:block
                        ${showFilters ? "fixed lg:relative" : "relative"}
                        top-0 left-0 w-full lg:w-auto
                        h-full lg:h-auto
                        bg-white dark:bg-gray-800 lg:bg-transparent
                        p-6 lg:p-0
                        z-40 lg:z-auto
                        overflow-y-auto lg:overflow-visible
                    `}
          >
            {/* Close Button for mobile */}
            <div className="lg:hidden flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filters
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            {/* Desktop Search */}
            <div className="hidden lg:block mb-6">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C6FF00] focus:border-[#C6FF00] transition-colors"
                  placeholder="Search products..."
                />
              </div>
            </div>
            {/* Categories Filter */}
            <Card className="mb-6">
              <CardContent>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="rounded border-gray-300 text-[#C6FF00] focus:ring-[#C6FF00]"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Price Range Filter */}
            <Card>
              <CardContent>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Price Range
                </h4>
                <div className="space-y-2">
                  {[
                    "< $20",
                    "$20 - $50",
                    "$50 - $100",
                    "$100 - $150",
                    "$150+",
                  ].map((range) => (
                    <label
                      key={range}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(range)}
                        onChange={() => handlePriceRangeChange(range)}
                        className="rounded border-gray-300 text-[#C6FF00] focus:ring-[#C6FF00]"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {range}
                      </span>
                    </label>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Clear All
                </Button>
              </CardFooter>
            </Card>
          </aside>{" "}
          {/* Products Grid */}
          <section className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Products
                <span className="text-[#C6FF00]">
                  ({filteredProducts.length})
                </span>
              </h2>
            </div>{" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <Card className="group hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-50 dark:bg-gray-800">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10 text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <p className="text-xl font-bold text-[#C6FF00] mb-3">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        <FaShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </section>
        </div>
        {/* Mobile filter overlay */}
        {showFilters && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowFilters(false)}
          />
        )}
      </div>
    </div>
  );
}
