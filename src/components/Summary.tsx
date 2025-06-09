import { useMemo, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/Card";

type SummaryProps = {
  subtotal: number;
  shipping?: number;
  taxes?: number;
  children?: ReactNode;
};

export function Summary({ subtotal, shipping, taxes, children }: SummaryProps) {
  const total: number = useMemo((): number => {
    return subtotal + (shipping ?? 0) + (taxes ?? 0);
  }, [subtotal, shipping, taxes]);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Order <span className="text-[#C6FF00]">Summary</span>
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {shipping ? (
                `$${shipping.toFixed(2)}`
              ) : (
                <span className="text-[#C6FF00] font-bold">Free</span>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Est. Taxes</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {taxes ? `$${taxes.toFixed(2)}` : "$0.00"}
            </span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Total
              </span>
              <span className="text-lg font-bold text-[#C6FF00]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      {children && <CardFooter>{children}</CardFooter>}
    </Card>
  );
}
