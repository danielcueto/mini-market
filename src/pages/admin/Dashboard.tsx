import { IoAddCircleOutline } from "react-icons/io5";
import { ProductTable } from "../../components/ProductTable";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import Modal from "../../components/Modal";
import { ProductForm } from "../../components/Modal/ProductForm";
import type { Product } from "../../interfaces/Product";
import { ConfirmDeleteProduct } from "../../components/Modal/ConfirmDeleteProduct";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export function Dashboard() {
  const { products } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Panel de <span className="text-[#C6FF00]">Administración</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tus productos y pedidos
          </p>
        </div>
        <Button
          onClick={() => {
            setProductToEdit(null);
            setIsModalOpen(true);
          }}
          variant="primary"
          className="flex items-center gap-2"
        >
          <IoAddCircleOutline className="text-xl" />
          Crear Producto
        </Button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <ProductTable
          products={products}
          onEdit={(product) => {
            setProductToEdit(product);
            setIsModalOpen(true);
          }}
          onDelete={(product) => {
            setProductToDelete(product);
            setIsDeleteModalOpen(true);
          }}
        />
      </div>
      <div className="flex justify-start">
        <Button
          onClick={() => navigate("/admin/order-management")}
          variant="outline"
          className="flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Gestión de Pedidos
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm
          onClose={() => setIsModalOpen(false)}
          productToEdit={productToEdit ?? undefined}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <ConfirmDeleteProduct
          product={productToDelete}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
