import { useMemo, type FormEvent } from "react";
import { Summary } from "../components/Summary";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

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

export function Checkout() {  const subtotal: number = useMemo((): number => {
    let productsSubtotal = 0;
    products.map((product: Product) => {
      productsSubtotal += product.price;
    });
    const numberRounded = Math.round(productsSubtotal * 100) / 100;
    return numberRounded;
  }, []);

  const handleSubmitGifCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="flex items-center gap-4">              <div className="flex items-center justify-center w-12 h-12 bg-[#C6FF00]/10 dark:bg-[#C6FF00]/20 rounded-full">
                <svg className="w-6 h-6 text-[#C6FF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pedido <span className="text-[#C6FF00]">#123123</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400">¡Gracias, Pedro Pérez!</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Tu pedido está <span className="text-[#C6FF00]">confirmado</span>
              </h3>              <p className="text-gray-600 dark:text-gray-400">
                Hemos aceptado tu pedido y lo estamos preparando para el envío.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  <span className="text-[#C6FF00]">Dirección</span> de envío
                </h3>
              </CardHeader>
              <CardContent>                <p className="text-gray-600 dark:text-gray-400">
                  1234 Elm Street, Apt 56B<br />
                  Springfield, IL 62704<br />
                  Estados Unidos
                </p>
              </CardContent>
            </Card>

            <Card>              <CardHeader>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  <span className="text-[#C6FF00]">Dirección</span> de facturación
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary)]">
                  5678 Oak Avenue, Suite 101<br />
                  Chicago, IL 60616<br />
                  Estados Unidos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  <span className="text-[#C6FF00]">Método</span> de envío
                </h3>
              </CardHeader>
              <CardContent>                <p className="text-gray-600 dark:text-gray-400">
                  Entrega Express - 2 a 3 días hábiles<br />
                  Transportista: FedEx
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>                <h3 className="font-semibold text-gray-900 dark:text-white">
                  <span className="text-[#C6FF00]">Método</span> de pago
                </h3>
              </CardHeader>
              <CardContent>                <p className="text-gray-600 dark:text-gray-400">
                  Visa terminada en 4242<br />
                  Vencimiento: 12/26
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Summary subtotal={subtotal}>
            <form onSubmit={handleSubmitGifCode} className="space-y-4">
              <div>                <label htmlFor="gif-card" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  <span className="text-[#C6FF00]">Tarjeta regalo</span> o descuento
                </label>
                <div className="flex gap-2">                  <input
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#C6FF00] focus:border-[#C6FF00] transition-colors"
                    id="gif-card"
                    type="text"
                    placeholder="Código de regalo"
                  />
                  <Button type="submit" variant="outline" size="sm">
                    Aplicar
                  </Button>
                </div>
              </div>
            </form>
          </Summary>
        </div>
      </div>
    </div>
  );
}
