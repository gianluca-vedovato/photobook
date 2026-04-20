import { create } from "zustand";
import type {
  BookConfig,
  BookFormat,
  CoverLayout,
  OrderState,
  ShippingInfo,
} from "./order-types";
import { isShippingComplete } from "./order-validation";

// -----------------------------------------------------------------------------
// Defaults
// -----------------------------------------------------------------------------

const emptyShipping = (): ShippingInfo => ({
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  zip: "",
  country: "",
});

const initialBook = (): BookConfig => ({
  format: null,
  dimensions: null,
  pages: 20,
  giftWrapping: false,
  giftMessage: "",
  customCover: false,
  coverLayout: null,
});

const initialState = (): OrderState => ({
  shipping: null,
  shippingSaved: false,
  book: initialBook(),
  orderConfirmed: false,
});

// -----------------------------------------------------------------------------
// Actions
// -----------------------------------------------------------------------------

type OrderActions = {
  // Shipping
  setShipping: (shipping: ShippingInfo) => void;
  updateShipping: (patch: Partial<ShippingInfo>) => void;
  clearShipping: () => void;
  setShippingSaved: (saved: boolean) => void;
  markShippingSaved: () => void;

  // Book
  setBook: (book: BookConfig) => void;
  updateBook: (patch: Partial<BookConfig>) => void;
  resetBook: () => void;
  setBookFormat: (format: BookFormat | null) => void;
  setBookDimensions: (dimensions: string | null) => void;
  setBookPages: (pages: number) => void;
  setGiftWrapping: (giftWrapping: boolean) => void;
  setGiftMessage: (giftMessage: string) => void;
  setCustomCover: (customCover: boolean) => void;
  setCoverLayout: (coverLayout: CoverLayout | null) => void;

  // Order
  confirmOrder: () => void;
  resetOrder: () => void;
};

export type OrderStoreApi = OrderState & OrderActions;

// -----------------------------------------------------------------------------
// Store
// -----------------------------------------------------------------------------

export const useOrderStore = create<OrderStoreApi>((set, get) => ({
  ...initialState(),

  // --- Shipping ---

  setShipping: (shipping) => set({ shipping }),

  updateShipping: (patch) =>
    set((state) => ({
      shipping: state.shipping
        ? { ...state.shipping, ...patch }
        : { ...emptyShipping(), ...patch },
    })),

  clearShipping: () => set({ shipping: null, shippingSaved: false }),

  setShippingSaved: (shippingSaved) => set({ shippingSaved }),

  markShippingSaved: () => {
    if (isShippingComplete(get().shipping)) set({ shippingSaved: true });
  },

  // --- Book ---

  setBook: (book) => set({ book }),

  updateBook: (patch) =>
    set((state) => ({ book: { ...state.book, ...patch } })),

  resetBook: () => set({ book: initialBook() }),

  setBookFormat: (format) =>
    set((state) => ({
      book: {
        ...state.book,
        format,
        dimensions: format !== state.book.format ? null : state.book.dimensions,
      },
    })),

  setBookDimensions: (dimensions) =>
    set((state) => ({ book: { ...state.book, dimensions } })),

  setBookPages: (pages) => set((state) => ({ book: { ...state.book, pages } })),

  setGiftWrapping: (giftWrapping) =>
    set((state) => ({
      book: {
        ...state.book,
        giftWrapping,
        giftMessage: giftWrapping ? state.book.giftMessage : "",
      },
    })),

  setGiftMessage: (giftMessage) =>
    set((state) => ({ book: { ...state.book, giftMessage } })),

  setCustomCover: (customCover) =>
    set((state) => ({
      book: {
        ...state.book,
        customCover,
        coverLayout: customCover ? state.book.coverLayout : null,
      },
    })),

  setCoverLayout: (coverLayout) =>
    set((state) => ({ book: { ...state.book, coverLayout } })),

  // --- Order ---

  confirmOrder: () => set({ orderConfirmed: true }),

  resetOrder: () => set(initialState()),
}));
