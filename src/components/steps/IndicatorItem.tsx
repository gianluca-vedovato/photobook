export default function StepIndicatorItem({
  label,
  index,
  isActive,
  isDone,
}: {
  label: string;
  index: number;
  isActive: boolean;
  isDone: boolean;
}) {
  return (
    <li key={index} className="flex items-center gap-2">
      <div
        aria-current={isActive ? "step" : undefined}
        aria-label={`Step ${index}: ${label}${isDone ? " (completato)" : ""}`}
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
          isActive
            ? "bg-primary text-primary-foreground"
            : isDone
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {index}
      </div>
      {isDone && (
        <div
          aria-hidden="true"
          className={`h-0.5 w-8 transition-colors ${
            isDone ? "bg-primary/40" : "bg-muted"
          }`}
        />
      )}
    </li>
  );
}
