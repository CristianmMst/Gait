interface SelectOption {
  id: number;
  name: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  error?: string[];
  value?: string;
  onChange?: (field: string, value: string) => void;
  required?: boolean;
}

export default function FormSelect({
  name,
  label,
  options,
  error,
  value = "",
  onChange,
  required = false,
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange?.(name, e.target.value)}
        className={`p-2 border rounded-md outline-none focus:ring-4 ring-primary/50 max-h-10 text-ellipsis ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-800 focus:border-primary"
        } text-zinc-500`}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500">{error[0]}</span>}
    </div>
  );
}
