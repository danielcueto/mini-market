import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../schemas/productSchema";
import type { Product } from "../../interfaces/Product";
import { Button } from "../ui/Button";

type FormProductData = {
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
};

interface ProductFormProps {
  onClose: () => void;
  productToEdit?: Product;
}

export function ProductForm({ onClose, productToEdit }: ProductFormProps) {
  const { addProduct, updateProduct } = useProducts();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormProductData>({
    resolver: yupResolver(productSchema),
  });

  const watchedImage = watch("image");

  useEffect(() => {
    if (watchedImage?.startsWith("http")) {
      setImagePreview(watchedImage);
    } else {
      setImagePreview(null);
    }
  }, [watchedImage]);

  useEffect(() => {
    if (productToEdit) {
      reset(productToEdit);
    }
  }, [productToEdit, reset]);

  const onSubmit = (formData: FormProductData) => {
    if (productToEdit) {
      updateProduct(productToEdit.id, formData);
    } else {
      addProduct({
        id: crypto.randomUUID(),
        ...formData,
      });
    }
    onClose();
  };
  return (
    <div className="p-6">
      {" "}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {productToEdit ? (
          <span>
            Editar <span className="text-[#C6FF00]">Producto</span>
          </span>
        ) : (
          <span>
            Crear <span className="text-[#C6FF00]">Producto</span>
          </span>
        )}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row gap-6 w-full max-w-4xl"
      >
        <div className="flex flex-col gap-4 flex-1">
          <div>
            {" "}
            <input
              type="text"
              placeholder="Nombre del producto"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#C6FF00] focus:border-[#C6FF00] transition-colors"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            {" "}
            <textarea
              placeholder="Descripción"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#C6FF00] focus:border-[#C6FF00] transition-colors resize-none"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {errors.description.message}
              </span>
            )}
          </div>
          <div>
            {" "}
            <input
              type="text"
              placeholder="Categoría"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#C6FF00] focus:border-[#C6FF00] transition-colors"
              {...register("category")}
            />
            {errors.category && (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {errors.category.message}
              </span>
            )}
          </div>{" "}
          <div>
            <input
              type="text"
              placeholder="URL de la imagen"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              {...register("image")}
            />
            {errors.image && (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {errors.image.message}
              </span>
            )}
          </div>{" "}
          <div>
            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              {...register("price")}
            />
            {errors.price && (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {errors.price.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4"
          >
            {productToEdit ? "Actualizar Producto" : "Guardar Producto"}
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {imagePreview ? (
            <div className="w-full max-w-sm">
              {" "}
              <img
                src={imagePreview}
                alt="Vista previa"
                className="w-full h-60 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
          ) : (
            <div className="w-full max-w-sm h-60 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Vista previa de imagen
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
