interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string[];
  className?: string;
}

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <label className="flex flex-col mb-2">
      <span className="text-sm mb-2">{label}</span>
      <input
        {...props}
        className={`bg-zinc-800 border rounded-md p-2 placeholder:text-sm ${!!error?.length ? "border-red-600" : "border-zinc-700"} ${className ? className : ""}`}
      />
      {error && <p className="text-xs mt-2 ml-1 text-red-600">{error}</p>}
    </label>
  );
}
