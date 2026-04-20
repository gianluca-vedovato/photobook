import { useEffect } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useOrderStore } from "@/stores/order-store";
import { isBookFormatSelected } from "@/stores/order-validation";

const configureRoute = getRouteApi("/_order/configure");

/**
 * Route guard for `/configure`: keeps the `step` search param aligned with data in the order
 * store. Users can land on a later step via the URL or browser history without having completed
 * earlier choices; this hook detects those cases and replaces the location with step 1 so the
 * wizard cannot be skipped ahead of format/dimensions or valid page count.
 */
export function useRouteGuard() {
  const { step } = configureRoute.useSearch();
  const navigate = configureRoute.useNavigate();
  const book = useOrderStore((s) => s.book);

  useEffect(() => {
    const shouldRedirectToStep1 = step > 1 && !isBookFormatSelected(book);

    if (shouldRedirectToStep1) {
      navigate({ search: { step: 1 }, replace: true });
    }
  }, [step, book, navigate]);
}
