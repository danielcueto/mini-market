import { FaEdit, FaTrash } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number | string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Giacomo Guilizzoni\nFounder & CEO",
    price: 36,
    category: "Peldi",
  },
  { id: 2, name: "Marco Botton\nTuttatore", price: 34, category: "Patata" },
  {
    id: 3,
    name: "Mariah Maclachlan\nBetter Half",
    price: 37,
    category: "Patata",
  },
  { id: 4, name: "Valerie Liberty\nHead Chef", price: 10, category: "Val" },
  { id: 5, name: "Guido Jack Guilizzoni", price: 6, category: "The Guids" },
];

export function ProductTable() {
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
                  <button className="text-black text-md md:text-lg">
                    <FaEdit className="cursor-pointer" />
                  </button>
                  <button className="text-black text-xs md:text-md">
                    <FaTrash className="cursor-pointer" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
