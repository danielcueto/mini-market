import { useState, useEffect } from "react";
import { FaFilter, FaTimes, FaShoppingCart } from "react-icons/fa";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
}

export function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);


    console.log(products)
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handlePriceRangeChange = (range: string) => {
        setSelectedPriceRanges(prev => 
            prev.includes(range) 
                ? prev.filter(r => r !== range)
                : [...prev, range]
        );
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedPriceRanges([]);
        setSearchTerm("");
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
        let matchesPrice = true;
        if (selectedPriceRanges.length > 0) {
            matchesPrice = selectedPriceRanges.some(range => {
                switch(range) {
                    case '< $20': return product.price < 20;
                    case '$20 - $50': return product.price >= 20 && product.price <= 50;
                    case '$50 - $100': return product.price > 50 && product.price <= 100;
                    case '$100 - $150': return product.price > 100 && product.price <= 150;
                    case '$150+': return product.price > 150;
                    default: return true;
                }
            });
        }
        
        return matchesSearch && matchesCategory && matchesPrice;
    });

    const categories = [...new Set(products.map(p => p.category))];

    return (
        <div className="relative">
            <div className="lg:hidden mb-4 flex gap-2">
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 p-3 rounded-lg bg-white" 
                    placeholder="Search products..." 
                />
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-black text-white p-3 rounded-lg"
                >
                    <FaFilter />
                </button>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
                {/* Filters Sidebar */}
                <aside className={`
                    ${showFilters ? 'block' : 'hidden'} lg:block
                    fixed lg:relative top-0 left-0 w-full lg:w-auto h-full lg:h-auto
                    bg-white lg:bg-gray-50 p-4 z-50 lg:z-auto
                    overflow-y-auto lg:overflow-visible
                    border-r lg:border-r-gray-200
                `}>

                    {/*  Close Button x for mobile */}
                    <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b">
                        <h3 className="font-bold text-lg">Filters</h3>
                        <button 
                            onClick={() => setShowFilters(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Long search input */}
                    <div className="hidden lg:block mb-6">
                        <h3 className="font-bold mb-2">Search</h3>
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 p-2 w-full bg-white rounded" 
                            placeholder="Search products..." 
                        />
                    </div>

                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-300">
                        <p className="font-semibold">Filters</p>
                        <button 
                            onClick={clearAllFilters}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                            Clear All
                        </button>
                    </div>

    
                    <div className="mb-6">
                        <h3 className="font-bold mb-3">CATEGORY</h3>
                        <div className="flex flex-col gap-2 pb-4 border-b border-gray-300">
                            {categories.map(category => (
                                <label key={category} className="flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="mr-2" 
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    <span className="capitalize">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>


                    <div>
                        <h3 className="font-bold mb-3">PRICE</h3>
                        <div className="flex flex-col gap-2">
                            {['< $20', '$20 - $50', '$50 - $100', '$100 - $150', '$150+'].map(range => (
                                <label key={range} className="flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="mr-2" 
                                        checked={selectedPriceRanges.includes(range)}
                                        onChange={() => handlePriceRangeChange(range)}
                                    />
                                    <span>{range}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                <section className="lg:col-span-2 p-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-lg">Loading products...</div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <h2 className="text-xl font-bold">Products ({filteredProducts.length})</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="bg-orange-50 shadow-2xl overflow-hidden hover:bg-fuchsia-200">
                                        <div className="aspect-square overflow-hidden">
                                            <img 
                                                src={product.image} 
                                                alt={product.title}
                                                className="w-full h-full object-contain p-4"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10">
                                                {product.title}
                                            </h3>
                                            <p className="text-lg font-bold mb-3">
                                                ${product.price.toFixed(2)}
                                            </p>
                                            <button className="w-full py-2 px-4 rounded not-target flex items-center justify-center gap-2">
                                                <FaShoppingCart />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredProducts.length === 0 && !loading && (
                                <div className="text-center py-8">
                                    <p>No hay nada mi estimado.</p>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>

            {showFilters && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowFilters(false)}
                />
            )}
        </div>
    );
}