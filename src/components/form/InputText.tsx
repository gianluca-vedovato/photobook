import { Input } from "../ui/input";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { AlertCircle } from "lucide-react";

export default function InputText({
  id,
  label,
  value,
  handleChange,
  placeholder,
  isValid,
  errorMessage,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  handleChange: (value: string) => void;
  placeholder: string;
  isValid: boolean;
  errorMessage: string;
  disabled?: boolean;
}) {
  return (
    <Field data-invalid={!isValid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        value={value}
      />
      {!isValid && (
        <div role="alert">
          <FieldDescription className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4 text-destructive" />
            {errorMessage}
          </FieldDescription>
        </div>
      )}
    </Field>
  );
}
