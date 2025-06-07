import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../schemas/productSchema";
import type { Product } from "../../interfaces/Product";

type FormProductData = {
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
};

interface ProductFormProps {
  onClose: () => void;
  productToEdit?: Product
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
    resolver: yupResolver(productSchema)
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
  }

 return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-6 w-full max-w-4xl"
    >
      <div className="flex flex-col gap-4 flex-1">
        <h2 className="text-lg font-semibold text-center">
          {productToEdit ? "Edit Product" : "Create Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}

        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-red-500 text-xs">{errors.description.message}</span>
        )}

        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded"
          {...register("category")}
        />
        {errors.category && (
          <span className="text-red-500 text-xs">{errors.category.message}</span>
        )}

        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 rounded"
          {...register("image")}
        />
        {errors.image && (
          <span className="text-red-500 text-xs">{errors.image.message}</span>
        )}

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          className="border p-2 rounded"
          {...register("price")}
        />
        {errors.price && (
          <span className="text-red-500 text-xs">{errors.price.message}</span>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
        >
          {productToEdit ? "Edit Product" : "Save Product"}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full max-w-sm h-60 object-contain border rounded"
          />
        ) : (
          <div className="w-full max-w-sm h-60 flex items-center justify-center border rounded text-gray-400 text-sm">
            Image preview
          </div>
        )}
      </div>
    </form>
  );
}
