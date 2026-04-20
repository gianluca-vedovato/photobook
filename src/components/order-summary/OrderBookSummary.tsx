import { Separator } from "@/components/ui/separator";
import { FORMATS } from "@/lib/dataset";
import type { BookConfig } from "@/stores/order-types";
import { BookOpen, Gift, Camera } from "lucide-react";
import MissingBadge from "./MissingBadge";

type OrderBookSummaryProps = {
  book: BookConfig;
};

export function OrderBookSummary({ book }: OrderBookSummaryProps) {
  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <BookOpen className="h-4 w-4" />
          Fotolibro
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Formato</span>
            {book.format ? (
              <span className="font-medium">
                {FORMATS.find((f) => f.id === book.format)?.label}
              </span>
            ) : (
              <MissingBadge />
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Dimensioni</span>
            {book.dimensions ? (
              <span className="font-medium">{book.dimensions} cm</span>
            ) : (
              <MissingBadge />
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Pagine</span>
            {book.pages > 0 ? (
              <span className="font-medium">{book.pages}</span>
            ) : (
              <MissingBadge />
            )}
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
                <Gift className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>
                  Confezione regalo
                  {book.giftMessage && (
                    <span className="text-muted-foreground">
                      {" "}
                      — "{book.giftMessage}"
                    </span>
                  )}
                </span>
              </div>
            )}
            {book.customCover && (
              <div className="flex items-center gap-2 text-sm">
                <Camera className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>
                  Copertina personalizzata:{" "}
                  {book.coverLayout ? (
                    <span className="font-medium">
                      {book.coverLayout === "single"
                        ? "Singola foto"
                        : "Collage"}
                    </span>
                  ) : (
                    <MissingBadge />
                  )}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
