interface StepOneProps {
  setStep: (step: number) => void;
}

export function StepOne({ setStep }: StepOneProps) {
  return (
    <>
      <label className="flex flex-col">
        <span className="text-sm mb-2">NIT</span>
        <input
          type="text"
          className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
          placeholder="Ingrese el NIT"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-sm mb-2">Nombre de la empresa</span>
        <input
          type="text"
          className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
          placeholder="Ingrese el nombre de la empresa"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-sm mb-2">Ubicación</span>
        <input
          type="text"
          className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
          placeholder="Ingrese la ubicación"
        />
      </label>
      <button
        type="button"
        onClick={() => setStep(2)}
        className="bg-gradient-to-t from-primary to-secondary to-100% p-2 py-3 rounded-md font-bold mt-3"
      >
        Siguiente
      </button>
    </>
  );
}
