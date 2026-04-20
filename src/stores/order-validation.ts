import type { BookConfig, ShippingInfo } from "./order-types";

function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isShippingComplete(shipping: ShippingInfo | null): boolean {
  if (!shipping) return false;
  return (
    isNonEmpty(shipping.firstName) &&
    isNonEmpty(shipping.lastName) &&
    isNonEmpty(shipping.address) &&
    isNonEmpty(shipping.city) &&
    isNonEmpty(shipping.zip) &&
    isNonEmpty(shipping.country)
  );
}

export function isBookBasicsComplete(book: BookConfig): boolean {
  return book.format !== null && book.dimensions !== null && book.pages > 0;
}

export function isCoverLayoutComplete(book: BookConfig): boolean {
  if (!book.customCover) return true;
  return book.coverLayout !== null;
}

export function isBookPagesValid(book: BookConfig): boolean {
  return Number.isFinite(book.pages) && book.pages > 0;
}

export function isGiftMessageValid(book: BookConfig): boolean {
  if (!book.giftWrapping) return true;
  return isNonEmpty(book.giftMessage);
}

export function isBookValid(book: BookConfig): boolean {
  return isBookBasicsComplete(book) && isBookPagesValid(book);
}

export function isBookFormatSelected(book: BookConfig): boolean {
  return book.format !== null && book.dimensions !== null;
}

export function canSaveShipping(shipping: ShippingInfo | null): boolean {
  return isShippingComplete(shipping);
}

export function canConfirmOrder({
  shippingSaved,
  book,
  orderConfirmed,
}: {
  shippingSaved: boolean;
  book: BookConfig;
  orderConfirmed: boolean;
}): boolean {
  return shippingSaved && isBookValid(book) && !orderConfirmed;
}
