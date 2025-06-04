import { useMemo, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Summary } from "../components/Summary";

interface Product {
  id: number;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", // Bulbasaur
    description:
      "Bulbasaur: una planta portátil con energía solar incorporada. Ideal para quienes valoran la sostenibilidad con estilo natural.",
    price: 19.99,
    quantity: 100,
  },
  {
    id: 2,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", // Charmander
    description:
      "Charmander: llama viva de compañía. Perfecto para climas fríos o para encender cualquier aventura con calidez.",
    price: 29.99,
    quantity: 50,
  },
  {
    id: 3,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", // Squirtle
    description:
      "Squirtle: solución portátil de hidratación y defensa. Ideal para quienes buscan protección acuática en cualquier situación.",
    price: 39.99,
    quantity: 75,
  },
  {
    id: 4,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", // Pikachu
    description:
      "Pikachu: fuente de energía eléctrica móvil con diseño adorable. Tecnología portátil con encanto y potencia.",
    price: 49.99,
    quantity: 20,
  },
  {
    id: 5,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png", // Eevee
    description:
      "Eevee: el compañero multifuncional que se adapta a tus necesidades. Evoluciona contigo según tu estilo de vida.",
    price: 59.99,
    quantity: 10,
  },
];

export function Cart() {
  const subtotal: number = useMemo((): number => {
    let productsSubtotal = 0;
    products.map((product: Product) => {
      productsSubtotal += product.price;
    });
    const numberRounded = Math.round(productsSubtotal * 100) / 100;
    return numberRounded;
  }, [products]);

  const onClickRemoveItem = () => {};

  return (
    <div className="w-full flex justify-center">
      <div className="min-w-[320px] flex flex-col-reverse gap-2 p-3 md:grid md:grid-cols-[1fr_30%] md:gap-3 md:justify-items-center w-full">
        <section className="w-full">
          <h1 className="font-bold">My Cart</h1>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 border-t-[1px] p-1">
              <div className="font-bold text-center">Item</div>
              <div className="font-bold text-center">Price</div>
              <div className="font-bold text-center">Quantity</div>
              <div className="font-bold text-center">Action</div>
            </div>
            <div className="border-t-[1px] overflow-y-scroll max-h-[200px] md:max-h-[600px]">
              {products &&
                products.map((product: Product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-4 border-b-[1px] p-2 items-center"
                  >
                    <div className="flex flex-col items-center">
                      <img src={product.image} alt="None" />
                      <p className="md:text-base text-xs">{product.description}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      {product.price}
                    </div>
                    <input className="flex flex-col justify-center items-center h-1/4 text-center"
                      value={product.quantity}
                      min={0}
                    />
                    
                    <div className="flex flex-col justify-center items-center">
                      <button onClick={onClickRemoveItem} type="button">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              {!products && <p>There are no products</p>}
            </div>
            <div className="text-end border-b-[1px] yrc">
              Subtotal: {subtotal}$
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-3 w-full mb-3">
          <Summary subtotal={subtotal}>
            <button
              className="border-[1px] w-full text-white font-bold bg-gray-400 p-2"
              type="button"
            >
              Checkout
            </button>
          </Summary>
        </section>
      </div>
    </div>
  );
}
