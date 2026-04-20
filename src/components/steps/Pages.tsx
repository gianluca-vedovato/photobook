import { AlertTriangle, X } from "lucide-react";
import { useOrderStore } from "@/stores/order-store";
import { Slider } from "../ui/slider";
import Headline from "../Headline";
import StepNav from "./Nav";
import { useEffect, useState } from "react";

export default function PagesStep() {
  const [displayAlert, setDisplayAlert] = useState(true);
  const [latestPages, setLatestPages] = useState(0);

  const { pages } = useOrderStore((state) => state.book);
  const setBookPages = useOrderStore((state) => state.setBookPages);

  useEffect(() => {
    if (latestPages < 61 && pages > 60) {
      setDisplayAlert(true);
    }
    setLatestPages(pages);
  }, [pages]);

  return (
    <div>
      <Headline
        title="Scegli il numero di pagine"
        description="Seleziona il numero di pagine del tuo fotolibro."
      />
      <div className="text-center flex flex-col gap-1">
        <span className="text-5xl font-bold tabular-nums">{pages}</span>
        <span className="ml-2 text-muted-foreground">pagine</span>
      </div>
      <div className="max-w-xl mx-auto">
        <Slider
          value={[pages]}
          onValueChange={([v]) => setBookPages(v)}
          defaultValue={[20]}
          min={2}
          max={100}
          step={2}
          aria-label="Numero di pagine"
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>10</span>
          <span>100</span>
        </div>

        {pages > 60 && displayAlert && (
          <div
            className="mt-4 flex gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
            aria-live="assertive"
            role="alert"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p>
              Attenzione: il costo aumenterà per l'aggiunta di pagine extra.
            </p>
            <button
              className="ml-auto cursor-pointer"
              onClick={() => setDisplayAlert(false)}
            >
              <X className="h-4 w-4 shrink-0" />
            </button>
          </div>
        )}
      </div>

      <StepNav current={2} total={3} canAdvance={pages > 0} />
    </div>
  );
}
