import { LoaderCircle } from "lucide-react";

interface ButtonSubmitProps {
  pending: boolean;
  children: React.ReactNode;
}

export default function ButtonSubmit({ pending, children }: ButtonSubmitProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-linear-to-t from-primary to-secondary to-100% p-2 px-4 rounded-md font-bold disabled:opacity-50"
    >
      {pending ? <LoaderCircle className="m-auto animate-spin" /> : children}
    </button>
  );
}
