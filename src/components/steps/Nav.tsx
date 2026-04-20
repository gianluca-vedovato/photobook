import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrderStore } from "@/stores/order-store";
import { canConfirmOrder, isShippingComplete } from "@/stores/order-validation";
import { useOrderConfermation } from "@/hooks/useOrderConfermation";
import { Spinner } from "../ui/spinner";
interface StepNavProps {
  current: number;
  total: number;
  canAdvance?: boolean;
  onNext?: () => void;
}

export default function StepNav({
  current,
  total,
  canAdvance = true,
}: StepNavProps) {
  const shipping = useOrderStore((s) => s.shipping);
  const shippingSaved = useOrderStore((s) => s.shippingSaved);
  const book = useOrderStore((s) => s.book);
  const orderConfirmed = useOrderStore((s) => s.orderConfirmed);
  const shippingComplete = isShippingComplete(shipping);
  const canConfirm = canConfirmOrder({ shippingSaved, book, orderConfirmed });
  const { handleConfirm, isLoading } = useOrderConfermation();
  return (
    <nav
      aria-label="Navigazione step"
      className="mt-8 flex items-center justify-between"
    >
      {current > 1 ? (
        <Button variant="outline" asChild disabled={current === 1}>
          <Link to="/configure" search={{ step: current - 1 }}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Indietro
          </Link>
        </Button>
      ) : (
        <Button variant="outline" asChild>
          <Link to="/">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Home
          </Link>
        </Button>
      )}

      <span className="text-sm text-muted-foreground">
        Step {current} di {total}
      </span>

      {current < total ? (
        <Button
          asChild
          disabled={!canAdvance}
          className={cn(
            !canAdvance && "opacity-50 cursor-not-allowed",
            "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          <Link to="/configure" search={{ step: current + 1 }}>
            Avanti
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      ) : shippingComplete && canConfirm ? (
        <Button onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner /> Conferma ordine
            </>
          ) : (
            "Conferma ordine"
          )}
        </Button>
      ) : (
        <Button asChild disabled={!canAdvance}>
          <Link to="/shipping">Vai alla spedizione</Link>
        </Button>
      )}
    </nav>
  );
}
