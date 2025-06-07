import { useState } from "react";
import type { Product } from "../interfaces/Product";

export function ProductInfo({ product }: { product?: Product }) {
    const [quantity, setQuantity] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    return (
        <div className="flex flex-col gap-5 p-2 pt-5 md:px-20">
            <div className="flex justify-between gap-3 font-semibold">
                <h1 className="text-xl md:text-2xl lg:text-2xl">{product?.name}</h1>
                <span className="text-md md:text-xl lg:text-xl">${product?.price}</span>
            </div>
            <hr />
            <div className="flex flex-col items-start gap-2">
                <label className="font-semibold" htmlFor="">Quantity</label>
                <input
                    type="number"
                    min={1}
                    className="border px-4 py-1 w-20"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>
            <hr />
            <div className="flex justify-center">
                <button className="w-full border-2 cursor-pointer">Add To Cart</button>
            </div>
            <hr />
            <article>
                {product?.description}
            </article>
        </div>
    )
}
