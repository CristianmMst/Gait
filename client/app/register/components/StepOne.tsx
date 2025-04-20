interface StepOneProps {
  setStep: (step: number) => void;
  data: {
    nit: string;
    name: string;
    location: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      nit: string;
      name: string;
      location: string;
    }>
  >;
}

export function StepOne({ setStep, data, setData }: StepOneProps) {
  return (
    <>
      <label className="flex flex-col">
        <span className="text-sm mb-2">NIT</span>
        <input
          name="nit"
          type="text"
          placeholder="Ingrese el NIT"
          onChange={(e) => setData({ ...data, nit: e.target.value })}
          className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-sm mb-2">Nombre de la empresa</span>
        <input
          type="text"
          name="name"
          placeholder="Ingrese el nombre de la empresa"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-sm mb-2">Ubicación</span>
        <input
          type="text"
          name="location"
          placeholder="Ingrese la ubicación"
          onChange={(e) => setData({ ...data, location: e.target.value })}
          className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
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
