export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

export type BookFormat = "square" | "horizontal" | "vertical";

export type CoverLayout = "single" | "collage";

export interface BookConfig {
  format: BookFormat | null;
  dimensions: string | null;
  pages: number;
  giftWrapping: boolean;
  giftMessage: string;
  customCover: boolean;
  coverLayout: CoverLayout | null;
}

export interface OrderState {
  shipping: ShippingInfo | null;
  shippingSaved: boolean;
  book: BookConfig;
  orderConfirmed: boolean;
}
