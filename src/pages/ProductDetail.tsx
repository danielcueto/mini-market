import { useMemo } from "react";
import { ProductImage } from "../components/ProductImage";
import { ProductInfo } from "../components/ProductInfo";
import { RelatedProduct } from "../components/RelatedProduct";
import { useProducts } from "../hooks/useProducts";
import { useParams } from 'react-router-dom';

type Params = {
    id: string;
};

export function ProductDetail() {
    const { id } = useParams<Params>();
    const { products } = useProducts();

    const product = useMemo(() => {
        return products.find((p) => p.id === id);
    }, [products, id]);

    return (
        <div className="flex flex-col p-2">
            <div className="md:flex flex-row gap-10">
                <div className="flex-[1]">
                    <ProductImage imageUrl={product?.image} />
                </div>
                <div className="flex-[1]">
                    <ProductInfo product={product} />
                </div>
            </div>
            <RelatedProduct />
        </div>
    );
}
