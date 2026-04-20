import { COUNTRY_OPTIONS } from "@/lib/dataset";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import InputText from "./form/InputText";
import SelectDropdown from "./form/SelectDropdown";
import { Button } from "./ui/button";
import { useOrderStore } from "@/stores/order-store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Save, Trash } from "lucide-react";

const countryOptions = COUNTRY_OPTIONS.map((option) => option.value);

const shippingSchema = z.object({
  firstName: z.string().min(1, "Il nome è obbligatorio"),
  lastName: z.string().min(1, "Il cognome è obbligatorio"),
  address: z.string().min(1, "L'indirizzo è obbligatorio"),
  city: z.string().min(1, "La città è obbligatoria"),
  zip: z.string().regex(/^\d{5}$/, "Il CAP deve essere di 5 cifre"),
  country: z.enum(countryOptions as [string, ...string[]], {
    required_error: "Seleziona un paese",
  }),
});

export default function ShippingForm() {
  const shipping = useOrderStore((state) => state.shipping);
  const shippingSaved = useOrderStore((state) => state.shippingSaved);
  const setShipping = useOrderStore((state) => state.setShipping);
  const setShippingSaved = useOrderStore((state) => state.setShippingSaved);
  const clearShipping = useOrderStore((state) => state.clearShipping);

  const form = useForm({
    defaultValues: {
      firstName: shipping?.firstName || "",
      lastName: shipping?.lastName || "",
      address: shipping?.address || "",
      city: shipping?.city || "",
      zip: shipping?.zip || "",
      country: shipping?.country || "",
    },
    onSubmit: (props) => {
      setShipping(props.value);
      setShippingSaved(true);
    },
    validators: {
      onSubmit: shippingSchema,
    },
  });

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShippingSaved(false);
    clearShipping();
    form.reset();
  };
  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="firstName"
        children={(field) => (
          <InputText
            id="firstName"
            label="Nome"
            value={field.state.value}
            handleChange={field.handleChange}
            placeholder="Inserisci il tuo nome"
            isValid={field.state.meta.isValid}
            errorMessage={field.state.meta.errors
              .map((error) => error?.message)
              .join(",")}
            disabled={shippingSaved}
          />
        )}
      />
      <form.Field
        name="lastName"
        children={(field) => (
          <InputText
            id="lastName"
            label="Cognome"
            value={field.state.value}
            handleChange={field.handleChange}
            placeholder="Inserisci il tuo cognome"
            isValid={field.state.meta.isValid}
            errorMessage={field.state.meta.errors
              .map((error) => error?.message)
              .join(",")}
            disabled={shippingSaved}
          />
        )}
      />
      <form.Field
        name="address"
        children={(field) => (
          <InputText
            id="address"
            label="Indirizzo"
            value={field.state.value}
            handleChange={field.handleChange}
            placeholder="Inserisci il tuo indirizzo"
            isValid={field.state.meta.isValid}
            errorMessage={field.state.meta.errors
              .map((error) => error?.message)
              .join(",")}
            disabled={shippingSaved}
          />
        )}
      />
      <form.Field
        name="city"
        children={(field) => (
          <InputText
            id="city"
            label="Città"
            value={field.state.value}
            handleChange={field.handleChange}
            placeholder="Inserisci la tua città"
            isValid={field.state.meta.isValid}
            errorMessage={field.state.meta.errors
              .map((error) => error?.message)
              .join(",")}
            disabled={shippingSaved}
          />
        )}
      />
      <form.Field
        name="zip"
        children={(field) => (
          <InputText
            id="zip"
            label="CAP"
            value={field.state.value}
            handleChange={field.handleChange}
            placeholder="Inserisci il tuo CAP"
            isValid={field.state.meta.isValid}
            errorMessage={field.state.meta.errors
              .map((error) => error?.message)
              .join(",")}
            disabled={shippingSaved}
          />
        )}
      />
      <form.Field
        name="country"
        children={(field) => (
          <SelectDropdown
            id="country"
            label="Paese"
            items={[...COUNTRY_OPTIONS]}
            value={field.state.value}
            handleChange={field.handleChange}
            placeholder="Seleziona il tuo paese"
            isValid={field.state.meta.isValid}
            errorMessage={field.state.meta.errors
              .map((error) => error?.message)
              .join(",")}
            disabled={shippingSaved}
          />
        )}
      />
      {!shippingSaved ? (
        <Button type="submit" className="cursor-pointer lg:col-span-2">
          <Save className="size-4" /> Salva indirizzo
        </Button>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild className="lg:col-span-2">
            <Button variant="outline" className="cursor-pointer w-full">
              <Trash className="size-4" /> Resetta l'indirizzo
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Attenzione!</AlertDialogTitle>
              <AlertDialogDescription>
                Attenzione: resettando l'indirizzo, tutti i dati inseriti nel
                form verranno cancellati e dovranno essere reinseriti. Sei
                sicuro di voler continuare?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annulla il reset</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset}>
                Conferma il reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </form>
  );
}
