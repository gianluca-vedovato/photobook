import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";

export const FORMATS = [
  {
    id: "square",
    label: "Quadrato",
    icon: Square,
    options: ["20x20", "30x30"],
  },
  {
    id: "horizontal",
    label: "Orizzontale",
    icon: RectangleHorizontal,
    options: ["14x10", "18x12", "20x15"],
  },
  {
    id: "vertical",
    label: "Verticale",
    icon: RectangleVertical,
    options: ["10x14", "12x18", "15x20"],
  },
] as const;

export const COUNTRY_OPTIONS = [
  { value: "IT", label: "Italia" },
  { value: "DE", label: "Germania" },
  { value: "FR", label: "Francia" },
] as const;
