export function ProductImage({ imageUrl }: { imageUrl?: string }) {
  return (
    <div className="w-full h-80 sm:h-full lg:h-[650px] rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
      <img
        src={imageUrl}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        alt="Imagen del producto"
        loading="lazy"
      />
    </div>
  );
}
