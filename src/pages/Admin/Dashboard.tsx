import { IoAddCircleOutline } from "react-icons/io5";
import { ProductTable } from "../../components/ProductTable";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import Modal from "../../components/ Modal";
import { ProductForm } from "../../components/Modal/ProductForm";
import type { Product } from "../../interfaces/Product";
import { ConfirmDeleteProduct } from "../../components/Modal/ConfirmDeleteProduct";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const { products } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full gap-8 mt-5 md:mt-20">
            <div className="flex justify-end">
                <button onClick={() => {
                    setProductToEdit(null);
                    setIsModalOpen(true);
                }} className="flex justify-center border-1 items-center gap-2 px-8 md:px-20 lg:px-23 text-sm md:text-lg cursor-pointer">
                    <IoAddCircleOutline className="text-lg md:text-2xl font-extrabold" />
                    Create
                </button>
            </div>
            <ProductTable products={products} onEdit={(product) => {
                setProductToEdit(product);
                setIsModalOpen(true);
            }}
                onDelete={(product) => {
                    setProductToDelete(product);
                    setIsDeleteModalOpen(true);
                }} />
            <div className="flex justify-start md:pt-5">
                <button onClick={() => navigate("/admin/order-management")} className="border-1 px-2 text-sm md:text-lg cursor-pointer">Order Management</button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ProductForm onClose={() => setIsModalOpen(false)}
                    productToEdit={productToEdit ?? undefined} />
            </Modal>
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <ConfirmDeleteProduct product={productToDelete}
                    onClose={() => setIsDeleteModalOpen(false)} />
            </Modal>
        </div>
    )
}
