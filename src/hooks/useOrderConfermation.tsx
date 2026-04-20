import { useOrderStore } from "@/stores/order-store";
import { canConfirmOrder } from "@/stores/order-validation";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function useOrderConfermation() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { shipping, book, shippingSaved, orderConfirmed, confirmOrder } =
    useOrderStore((s) => s);

  const handleConfirm = () => {
    if (!canConfirmOrder({ shippingSaved, book, orderConfirmed })) return;
    setIsLoading(true);
    setTimeout(() => {
      const orderedShipping = shipping
        ? {
            firstName: shipping.firstName,
            lastName: shipping.lastName,
            address: shipping.address,
            city: shipping.city,
            zip: shipping.zip,
            country: shipping.country,
          }
        : null;

      const orderedBook = {
        format: book.format,
        dimensions: book.dimensions,
        pages: book.pages,
        giftWrapping: book.giftWrapping,
        giftMessage: book.giftMessage,
        customCover: book.customCover,
        coverLayout: book.coverLayout,
      };

      console.groupCollapsed(
        "%c🧾 Order confirmation details",
        "color:#7c3aed;font-weight:700;",
      );
      console.log(
        "%c🕒 Submitted at:%c %s",
        "color:#0ea5e9;font-weight:600;",
        "color:#1748b0;",
        new Date().toLocaleString(),
      );
      console.log(
        "%c📦 Shipping",
        "color:#16a34a;font-weight:700;text-transform:uppercase;letter-spacing:.04em;",
        orderedShipping,
      );
      console.log(
        "%c📚 Book configuration",
        "color:#f59e0b;font-weight:700;text-transform:uppercase;letter-spacing:.04em;",
        orderedBook,
      );
      console.groupEnd();

      confirmOrder();
      navigate({ to: "/confirmed" });
      setIsLoading(false);
    }, 1000);
  };

  return { handleConfirm, isLoading };
}
