import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { COUNTRY_OPTIONS } from "@/lib/dataset";
import type { ShippingInfo } from "@/stores/order-types";
import { Truck, AlertCircle } from "lucide-react";

type OrderShippingSummaryProps = {
  shipping: ShippingInfo | null;
  shippingSaved: boolean;
};

export function OrderShippingSummary({
  shipping,
  shippingSaved,
}: OrderShippingSummaryProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Truck className="h-4 w-4" />
        Spedizione
      </div>
      {shippingSaved && shipping ? (
        <div className="rounded-lg bg-muted/50 p-3 text-sm">
          <p>
            {shipping.firstName} {shipping.lastName}
          </p>
          <p>{shipping.address}</p>
          <p>
            {shipping.zip} {shipping.city}
          </p>
          <p>
            {COUNTRY_OPTIONS.find((c) => c.value === shipping.country)?.label}
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 text-xs text-destructive">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span>Indirizzo di spedizione non salvato.</span>
          </div>
          <Button variant="outline" className="w-full cursor-pointer">
            <Link to="/shipping">Aggiungi l'indirizzo di spedizione</Link>
          </Button>
        </>
      )}
    </div>
  );
}
