import StepIndicatorItem from "./IndicatorItem";

const STEP_LABELS = ["Formato", "Dimensioni", "Pagine", "Extra"];

export default function StepsIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <nav
      aria-label="Progresso configurazione"
      className="mb-8 flex items-center justify-center gap-2"
    >
      <ol className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <StepIndicatorItem
            key={i}
            label={STEP_LABELS[i]}
            index={i + 1}
            isActive={i + 1 === current}
            isDone={i + 1 < current}
          />
        ))}
      </ol>
    </nav>
  );
}
