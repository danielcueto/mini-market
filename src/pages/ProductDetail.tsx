import { ProductImage } from "../components/ProductImage";
import { ProductInfo } from "../components/ProductInfo";
import { RelatedProduct } from "../components/RelatedProduct";

export function ProductDetail() {
    return (
        <div className="flex flex-col p-2">
            <div className="md:flex flex-row gap-10">
                <div className="flex-[1]">
                    <ProductImage />
                </div>
                <div className="flex-[1]">
                    <ProductInfo />
                </div>
            </div>
            <RelatedProduct />
        </div>
    )
}