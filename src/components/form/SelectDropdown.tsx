import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { AlertCircle } from "lucide-react";

export default function SelectDropdown({
  id,
  label,
  value,
  items,
  handleChange,
  placeholder,
  isValid,
  errorMessage,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  items: { label: string; value: string }[];
  handleChange: (value: string) => void;
  placeholder: string;
  isValid: boolean;
  errorMessage: string;
  disabled?: boolean;
}) {
  return (
    <Field data-invalid={!isValid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select onValueChange={handleChange} disabled={disabled} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
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
