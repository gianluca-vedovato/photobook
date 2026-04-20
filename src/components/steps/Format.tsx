import { useOrderStore } from "@/stores/order-store";
import { FORMATS } from "@/lib/dataset";
import { Separator } from "../ui/separator";
import StepNav from "./Nav";
import { cn } from "@/lib/utils";
import DimensionsSelector from "../DimensionsSelector";
import Headline from "../Headline";
import { useMemo } from "react";

export default function FormatStep() {
  const { format, dimensions } = useOrderStore((state) => state.book);
  const setBookFormat = useOrderStore((state) => state.setBookFormat);

  const currentFormat = useMemo(
    () => FORMATS.find((f) => f.id === format),
    [format],
  );
  return (
    <div>
      <Headline
        title="Scegli il formato"
        description="Seleziona la forma del tuo fotolibro."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            className={cn(
              "flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:border-primary/60 hover:shadow-md cursor-pointer",
              format === f.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card",
            )}
            aria-label={`Seleziona il formato ${f.label}`}
            onClick={() => setBookFormat(f.id)}
          >
            <f.icon className="h-10 w-10" />
            {f.label}
          </button>
        ))}
      </div>
      {currentFormat && (
        <div className="w-full flex flex-col gap-6 mt-6">
          <Separator />
          <DimensionsSelector options={currentFormat.options} />
        </div>
      )}
      <StepNav current={1} total={3} canAdvance={!!dimensions} />
    </div>
  );
}
