interface FormInputProps {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  error?: string[];
  value?: string;
  onChange?: (field: string, value: string) => void;
  required?: boolean;
}

export default function FormInput({
  name,
  type = "text",
  label,
  placeholder = "",
  error,
  value = "",
  onChange,
  required = false,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange?.(name, e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full p-2 border rounded-md outline-none focus:ring-4 ring-primary/50 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-800 focus:border-primary"
        }`}
      />
      {error && <span className="text-sm text-red-500">{error[0]}</span>}
    </div>
  );
}
