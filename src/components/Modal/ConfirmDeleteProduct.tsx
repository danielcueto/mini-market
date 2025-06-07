import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../interfaces/Product";

interface ConfirmDeleteProps {
    product: Product | null;
    onClose: () => void;
}

export function ConfirmDeleteProduct({ product, onClose }: ConfirmDeleteProps) {
    const { deleteProduct } = useProducts();

    if (!product) return null;

    const handleDeleteProduct = () => {
        deleteProduct(product.id);
        onClose();
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-md w-full mx-auto bg-white rounded">
            <h2 className="text-base md:text-lg lg:text-xl font-bold mb-4 text-center md:text-left">Delete product</h2>
            <p className="text-sm md:text-base mb-4 text-center md:text-left">
                Are you sure you want to delete <strong>{product.name}</strong>?
            </p>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3">
                <button onClick={handleDeleteProduct} className="px-4 py-2 text-sm md:text-base bg-red-500 text-white rounded cursor-pointer">
                    Delete
                </button>
            </div>
        </div>
    );

}
