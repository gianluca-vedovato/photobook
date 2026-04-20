import { useOrderStore } from "@/stores/order-store";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FORMATS } from "@/lib/dataset";

export default function DimensionsSelector({
  options,
}: {
  options: (typeof FORMATS)[number]["options"];
}) {
  const dimensions = useOrderStore((state) => state.book.dimensions);
  const setBookDimensions = useOrderStore((state) => state.setBookDimensions);
  return (
    <div>
      <p className="mb-2 text-sm font-medium">Seleziona le dimensioni</p>
      {options.length > 2 ? (
        <Select onValueChange={(value) => setBookDimensions(value)}>
          <SelectTrigger className="w-full max-w-60">
            <SelectValue placeholder="Seleziona una dimensione" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Dimensioni disponibili</SelectLabel>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <div className="flex items-center gap-2">
          {options.map((option) => (
            <Button
              key={option}
              variant={dimensions === option ? "default" : "outline"}
              size="sm"
              onClick={() => setBookDimensions(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
