import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import Headline from "../Headline";
import StepNav from "./Nav";
import { Gift, Camera, Image, Images } from "lucide-react";
import { useOrderStore } from "@/stores/order-store";
import { cn } from "@/lib/utils";

export default function ExtrasStep() {
  const giftMessage = useOrderStore((s) => s.book.giftMessage);
  const customCover = useOrderStore((s) => s.book.customCover);
  const coverLayout = useOrderStore((s) => s.book.coverLayout);
  const hasGiftWrapping = useOrderStore((s) => s.book.giftWrapping);
  const hasCustomCover = useOrderStore((s) => s.book.customCover);
  const setGiftWrapping = useOrderStore((s) => s.setGiftWrapping);
  const setGiftMessage = useOrderStore((s) => s.setGiftMessage);
  const setCustomCover = useOrderStore((s) => s.setCustomCover);
  const setCoverLayout = useOrderStore((s) => s.setCoverLayout);

  return (
    <div>
      <Headline
        title="Opzioni Extra"
        description="Personalizza ulteriormente il tuo fotolibro"
      />
      <div className="space-y-8">
        <div className="space-y-4 rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <Gift className="h-5 w-5 text-primary" />
            <div className="flex items-center gap-2">
              <Checkbox
                id="gift"
                checked={hasGiftWrapping}
                onCheckedChange={(v) => setGiftWrapping(v === true)}
              />
              <Label htmlFor="gift" className="text-base font-semibold">
                Confezione regalo
              </Label>
            </div>
          </div>

          {hasGiftWrapping && (
            <div className="ml-8 space-y-2">
              <Label htmlFor="giftMessage">
                Messaggio per il biglietto{" "}
                <span className="text-muted-foreground">(opzionale)</span>
              </Label>
              <Textarea
                id="giftMessage"
                placeholder="Scrivi un messaggio personalizzato..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                rows={3}
              />
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <Camera className="h-5 w-5 text-primary" />
            <div className="flex items-center gap-2">
              <Checkbox
                id="cover"
                checked={customCover}
                onCheckedChange={(v) => setCustomCover(v === true)}
              />
              <Label htmlFor="cover" className="text-base font-semibold">
                Copertina fotografica personalizzata
              </Label>
            </div>
          </div>

          {hasCustomCover && (
            <div className="ml-8 space-y-3">
              <Label>Layout copertina</Label>
              <div className="flex gap-4">
                <button
                  className={cn(
                    "bg-card border rounded-xl p-1 lg:p-4 flex flex-col items-center justify-center gap-2 cursor-pointer size-30 lg:size-36",
                    coverLayout === "single"
                      ? "bg-primary/10 border-primary/20"
                      : "",
                  )}
                  aria-label="Seleziona layout singola foto"
                  onClick={() => setCoverLayout("single")}
                >
                  <Image className="size-6 lg:size-10 text-primary" />
                  <span className="text-sm text-center">Singola foto</span>
                </button>
                <button
                  className={cn(
                    "bg-card border rounded-xl p-1 lg:p-4 flex flex-col items-center justify-center gap-2 cursor-pointer size-30 lg:size-36",
                    coverLayout === "collage"
                      ? "bg-primary/10 border-primary/20"
                      : "",
                  )}
                  aria-label="Seleziona layout collage"
                  onClick={() => setCoverLayout("collage")}
                >
                  <Images className="size-6 lg:size-10 text-primary" />
                  <span className="text-sm text-center">Collage</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <StepNav current={3} total={3} canAdvance={true} />
    </div>
  );
}
