import { useMemo, type FormEvent } from "react";
import { Summary } from "../components/Summary";
import { GrStatusGood } from "react-icons/gr";

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

export function Checkout() {
  const subtotal: number = useMemo((): number => {
    let productsSubtotal = 0;
    products.map((product: Product) => {
      productsSubtotal += product.price;
    });
    const numberRounded = Math.round(productsSubtotal * 100) / 100;
    return numberRounded;
  }, [products]);

  const handleSubmitGifCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="w-full flex justify-center">
      <div className="min-w-[320px] flex flex-col-reverse gap-2 p-3 md:grid md:grid-cols-[1fr_30%] md:gap-3 md:justify-items-center w-full">
        <section className="w-full flex flex-col gap-3">
          <article className="border-b-[1px] flex flex-row gap-2 items-center p-2">
            <GrStatusGood size={"100%"} className="w-1/12" />
            <div>
              <div>Order 123123</div>
              <div>Thank you, Pedro Perez!</div>
            </div>
          </article>
          <article className="border-b-[1px] p-2">
            <p>Your order is confirmed</p>
            <p>We've accepted your order and we're getting it ready</p>
          </article>
          <article className="p-2">
            <h1></h1>
            <div className="grid grid-cols-2 grid-rows-2">
              <div>
                <h3 className="font-bold">Shipping address</h3>
                <p>
                  1234 Elm Street, Apt 56B
                  <br />
                  Springfield, IL 62704
                  <br />
                  United States
                </p>
              </div>

              <div>
                <h3 className="font-bold">Billing address</h3>
                <p>
                  5678 Oak Avenue, Suite 101
                  <br />
                  Chicago, IL 60616
                  <br />
                  United States
                </p>
              </div>

              <div>
                <h3 className="font-bold">Shipping method</h3>
                <p>
                  Express Delivery - 2 to 3 business days
                  <br />
                  Carrier: FedEx
                </p>
              </div>

              <div>
                <h3 className="font-bold">Payment Method</h3>
                <p>
                  Visa ending in 4242
                  <br />
                  Expiration: 12/26
                </p>
              </div>
            </div>
          </article>
        </section>
        <section className="flex flex-col gap-3 w-full mb-3">
          <Summary subtotal={subtotal}>
            <form onSubmit={handleSubmitGifCode} className="w-full flex flex-col justify-baseline">
              <label htmlFor="gif-card">Gif card or discount</label>
              <div className="w-full pt-1 pb-1 grid grid-rows-2 gap-1 xl:grid-cols-[1fr_20%]">
                <input
                  className="p-1 border-[1px]"
                  id="gif-card"
                  type="text"
                  placeholder="Gif code"
                />
                <button type="submit" className="p-3 border-[1px] bg-gray-500 hover:bg-gray-700 text-white font-bold">
                  Apply
                </button>
              </div>
            </form>
          </Summary>
        </section>
      </div>
    </div>
  );
}
