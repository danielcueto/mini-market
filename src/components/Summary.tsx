import { useMemo, type JSX } from "react";

type SumaryProps = {
  subtotal: number;
  shipping?: number;
  taxes?: number;
  children?: JSX.Element;
};

export function Summary({ subtotal, shipping, taxes, children }: SumaryProps) {
  const total: number = useMemo((): number => {
    return subtotal + (shipping ?? 0) + (taxes ?? 0);
  }, [subtotal, shipping, taxes]);

  return (
    <div className="border-[1px] p-2">
      <h2 className="font-bold">Sumary ( 1 item)</h2>
      <div className="flex flex-col border-b-[1px] gap-2 pb-1">
        <div className="flex flex-row justify-between">
          <div>Subtotal</div>
          <div>{subtotal}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div>Shipping</div>
          <div>{shipping ? shipping : "-"}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div> Est.Taxes</div>
          <div> {taxes ? taxes : "-"} </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div>Total</div>
          <div>{total}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
