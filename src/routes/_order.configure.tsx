import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { useRouteGuard } from "@/hooks/useRouteGuard";
import StepsIndicator from "@/components/steps/Indicator";
import FormatStep from "@/components/steps/Format";
import PagesStep from "@/components/steps/Pages";
import ExtrasStep from "@/components/steps/Extras";

const searchSchema = z.object({
  step: z.coerce.number().int().min(1).max(4).default(1),
});

export const Route = createFileRoute("/_order/configure")({
  validateSearch: searchSchema,
  component: ConfigureComponent,
});

function ConfigureComponent() {
  const { step } = useSearch({ from: "/_order/configure" });
  useRouteGuard();

  return (
    <>
      <StepsIndicator current={step} total={3} />
      {step === 1 && <FormatStep />}
      {step === 2 && <PagesStep />}
      {step === 3 && <ExtrasStep />}
    </>
  );
}
