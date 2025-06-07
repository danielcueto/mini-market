import { FaEdit, FaTrash } from "react-icons/fa";
import type { Product } from "../interfaces/Product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-xs md:text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Product Name</th>
            <th className="p-2 border">
              Price <span className="text-xs">↑/↓</span>
            </th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="even:bg-gray-50">
              <td className="p-2 border whitespace-pre-line">{prod.name}</td>
              <td className="p-2 border">{prod.price}</td>
              <td className="p-2 border">{prod.category}</td>
              <td className="p-2 border">
                <div className="flex gap-5 justify-center items-center">
                  <FaEdit onClick={() => onEdit(prod)} className="cursor-pointer text-black text-md md:text-lg" />
                  <FaTrash onClick={() => onDelete(prod)} className="cursor-pointer text-black text-xs md:text-md" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
