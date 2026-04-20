import { createFileRoute } from "@tanstack/react-router";
import ShippingForm from "@/components/ShippingForm";
import BackButton from "@/components/BackButton";
import Headline from "@/components/Headline";

export const Route = createFileRoute("/_order/shipping")({
  component: ShippingComponent,
});

function ShippingComponent() {
  return (
    <>
      <div>
        <BackButton to="/configure" label="Torna alla configurazione" />
        <Headline
          title="Dati di Spedizione"
          description="Inserisci l'indirizzo per la consegna del tuo fotolibro."
        ></Headline>
        <ShippingForm />
      </div>
    </>
  );
}
