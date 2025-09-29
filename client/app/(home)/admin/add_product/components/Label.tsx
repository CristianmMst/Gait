export function Label({
  children,
  htmlFor,
}: Readonly<{ children: React.ReactNode; htmlFor: string }>) {
  return (
    <label
      className="flex items-center gap-2 text-sm leading-none font-semibold select-none"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
