import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useOrderStore } from "@/stores/order-store";
import { canConfirmOrder } from "@/stores/order-validation";
import { useOrderConfermation } from "@/hooks/useOrderConfermation";
import { OrderBookSummary } from "./OrderBookSummary";
import { OrderShippingSummary } from "./OrderShippingSummary";

export default function OrderSummary() {
  const { shipping, shippingSaved, book, orderConfirmed } = useOrderStore();

  const canConfirm = canConfirmOrder({ shippingSaved, book, orderConfirmed });

  const { handleConfirm, isLoading } = useOrderConfermation();

  const buttonContent = () => {
    console.log("can confirm: ", canConfirm);
    console.log("shippingSaved: ", shippingSaved);
    console.log("book: ", book);
    console.log("orderConfirmed: ", orderConfirmed);
    if (!canConfirm) return "Completa i dati per confermare";
    if (isLoading)
      return (
        <>
          <Spinner />
          Conferma ordine
        </>
      );
    return "Conferma ordine";
  };

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="space-y-5">
        <h3 className="text-lg font-bold tracking-tight">Riepilogo ordine</h3>
        <OrderBookSummary book={book} />
        <Separator />
        <OrderShippingSummary
          shipping={shipping}
          shippingSaved={shippingSaved}
        />
        <Separator />
        <Button
          className="w-full"
          size="lg"
          disabled={!canConfirm}
          onClick={handleConfirm}
        >
          {buttonContent()}
        </Button>
        {!canConfirm && (
          <p
            aria-live="polite"
            className="text-center text-xs text-muted-foreground"
          >
            {!shippingSaved && "Salva l'indirizzo di spedizione. "}
            {!book.format && "Scegli un formato. "}
            {!book.dimensions && book.format && "Scegli le dimensioni. "}
            {book.customCover &&
              !book.coverLayout &&
              "Scegli il layout della copertina."}
          </p>
        )}
      </div>
    </div>
  );
}
