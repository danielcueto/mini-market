export function ProductImage({ imageUrl }: { imageUrl?: string }) {
  return (
    <div className="w-full h-80 sm:h-full lg:h-[650px]">
      <img
        src={imageUrl}
        className="w-full h-full object-fit"
        alt="Product"
      />
    </div>
  );
}
