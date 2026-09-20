import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import api from "../../api/axios";

const ProductSelector = ({ value, onChange }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const selectorRef = useRef(null);

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectorRef.current &&
                !selectorRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                "/api/v1/products/my"
            );

            setProducts(response.data);
        } catch (error) {
            console.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const selectedProduct = products.find(
        (product) =>
            product.id === Number(value)
    );

    const filteredProducts = products.filter(
        (product) =>
            product.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
    );

    const handleSelect = (product) => {
        onChange(product.id);
        setOpen(false);
        setSearch("");
    };

    return (
        <div
            ref={selectorRef}
            className="relative"
        >
            <label className="mb-2 block text-sm font-medium text-slate-200">
                Product
            </label>

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-left outline-none transition hover:border-slate-600 focus:border-indigo-500"
            >
                {selectedProduct ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={
                                (selectedProduct.imageUrls && Object.values(selectedProduct.imageUrls)[0]) ||
                                "/placeholder-product.png"
                            }
                            alt={selectedProduct.name}
                            className="h-10 w-10 rounded-lg object-cover"
                        />

                        <div>
                            <p className="text-sm font-medium text-white">
                                {selectedProduct.name}
                            </p>

                            {selectedProduct.categoryName && (
                                <p className="text-xs text-slate-400">
                                    {selectedProduct.categoryName}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <span className="text-slate-400">
                        Select a product
                    </span>
                )}

                <ChevronDown
                    size={18}
                    className="text-slate-400"
                />
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

                    <div className="border-b border-slate-800 p-3">
                        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3">
                            <Search
                                size={17}
                                className="text-slate-500"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search products..."
                                autoFocus
                                className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto">

                        {loading ? (
                            <div className="p-6 text-center text-sm text-slate-400">
                                Loading products...
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="p-6 text-center text-sm text-slate-400">
                                No products found
                            </div>
                        ) : (
                            filteredProducts.map((product) => (
                                <button
                                    type="button"
                                    key={product.id}
                                    onClick={() =>
                                        handleSelect(product)
                                    }
                                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-800"
                                >
                                    <img
                                        src={
                                            (product.imageUrls && Object.values(product.imageUrls)[0]) ||
                                            "/placeholder-product.png"
                                        }
                                        alt={product.name}
                                        className="h-11 w-11 rounded-lg object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-white">
                                            {product.name}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            {product.categoryName ||
                                                "No category"}
                                        </p>
                                    </div>

                                    {Number(value) === product.id && (
                                        <Check
                                            size={18}
                                            className="text-indigo-400"
                                        />
                                    )}
                                </button>
                            ))
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductSelector;