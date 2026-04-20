import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrderStore } from "@/stores/order-store";
import { COUNTRY_OPTIONS, FORMATS } from "@/lib/dataset";
import {
  CheckCircle2,
  Truck,
  BookOpen,
  Gift,
  Camera,
  Home,
  RotateCcw,
} from "lucide-react";

export const Route = createFileRoute("/confirmed")({
  component: ConfirmedPage,
});

function ConfirmedPage() {
  const { shipping, book, orderConfirmed } = useOrderStore();
  const resetOrder = useOrderStore((s) => s.resetOrder);
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderConfirmed) {
      navigate({ to: "/" });
    }
  }, [orderConfirmed, navigate]);

  if (!orderConfirmed || !shipping) return null;

  const handleNewOrder = () => {
    resetOrder();
    navigate({ to: "/" });
  };

  return (
    <main className="px-4 pb-8 pt-10">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 text-center" role="status">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Ordine confermato!
          </h1>
          <p className="text-muted-foreground">
            Grazie per il tuo acquisto. Il tuo fotolibro verrà preparato e
            spedito al più presto.
          </p>
        </div>

        <div className="space-y-6 rounded-xl border bg-card p-6">
          {/* Shipping recap */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Truck className="h-4 w-4" />
              Spedizione
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-sm">
              <p className="font-medium">
                {shipping.firstName} {shipping.lastName}
              </p>
              <p>{shipping.address}</p>
              <p>
                {shipping.zip} {shipping.city}
              </p>
              <p>
                {
                  COUNTRY_OPTIONS.find((c) => c.value === shipping.country)
                    ?.label
                }
              </p>
            </div>
          </div>

          <Separator />

          {/* Book recap */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4" />
              Fotolibro
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Formato</span>
                <span className="font-medium">
                  {book.format &&
                    FORMATS.find((f) => f.id === book.format)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensioni</span>
                <span className="font-medium">{book.dimensions} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pagine</span>
                <span className="font-medium">{book.pages}</span>
              </div>
            </div>
          </div>

          {(book.giftWrapping || book.customCover) && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-semibold">Extra</div>
                {book.giftWrapping && (
                  <div className="flex items-center gap-2 text-sm">
                    <Gift className="h-3.5 w-3.5 text-primary" />
                    <span>
                      Confezione regalo
                      {book.giftMessage && (
                        <span className="text-muted-foreground">
                          {" "}
                          &mdash; &ldquo;{book.giftMessage}&rdquo;
                        </span>
                      )}
                    </span>
                  </div>
                )}
                {book.customCover && (
                  <div className="flex items-center gap-2 text-sm">
                    <Camera className="h-3.5 w-3.5 text-primary" />
                    <span>
                      Copertina personalizzata:{" "}
                      <span className="font-medium">
                        {book.coverLayout === "single"
                          ? "Singola foto"
                          : "Collage"}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button className="flex-1" onClick={handleNewOrder}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Nuovo ordine
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Torna alla home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
