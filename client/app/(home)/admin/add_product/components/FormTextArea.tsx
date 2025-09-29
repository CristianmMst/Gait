interface FormTextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  error?: string[];
  value?: string;
  onChange?: (field: string, value: string) => void;
  required?: boolean;
  rows?: number;
}

export default function FormTextArea({
  name,
  label,
  placeholder = "",
  error,
  value = "",
  onChange,
  required = false,
  rows = 4,
}: FormTextAreaProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(name, e.target.value)}
        rows={rows}
        className={`w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical ${
          error && error.length > 0 ? "border-red-500" : ""
        }`}
      />
      {error && <span className="text-sm text-red-500">{error[0]}</span>}
    </div>
  );
}
