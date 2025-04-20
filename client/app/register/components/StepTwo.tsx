import { LoaderCircle } from "lucide-react";

interface StepTwoProps {
  pending: boolean;
  setStep: (step: number) => void;
}

export function StepTwo({ setStep, pending }: StepTwoProps) {
  return (
    <div className={`flex flex-col gap-y-4 step_two`}>
      <label className="flex flex-col">
        <span className="text-sm mb-2">Correo Electrónico</span>
        <input
          type="text"
          name="email"
          className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
          placeholder="Ingrese un correo electrónico"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-sm mb-2">Contraseña</span>
        <input
          type="text"
          name="password"
          className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
          placeholder="***********"
        />
      </label>
      <div className="flex justify-between mt-3 font-bold">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="border-4 border-secondary p-2 px-10 rounded-md w-32"
        >
          Atras
        </button>
        <button
          type="submit"
          disabled={pending}
          className="bg-gradient-to-t from-primary to-secondary to-100% p-2 px-4 rounded-md w-36"
        >
          {pending ? (
            <LoaderCircle className="m-auto animate-spin" />
          ) : (
            "Crear cuenta"
          )}
        </button>
      </div>
    </div>
  );
}
