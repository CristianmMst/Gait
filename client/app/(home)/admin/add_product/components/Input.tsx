export const Input = ({
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
}: {
  name: string;
  type?: string;
  value: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
}) => {
  return (
    <input
      id={name}
      required
      type={type}
      value={value}
      autoComplete="off"
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border-zinc-800 border rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50"
    />
  );
};
