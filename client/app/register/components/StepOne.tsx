import { RegisterStepOneSchema } from "@/lib/schemas/RegisterSchema";
import { useState } from "react";

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
  const [errors, setErrors] = useState<{
    nit: string[];
    name: string[];
    location: string[];
  }>({
    nit: [],
    name: [],
    location: [],
  });

  const isFormValid =
    data.nit && data.name.trim() !== "" && data.location.trim() !== "";

  const onClick = () => {
    const validatedFields = RegisterStepOneSchema.safeParse({
      nit: data.nit,
      name: data.name,
      location: data.location,
    });

    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      setErrors({
        nit: fieldErrors.nit ?? [],
        name: fieldErrors.name ?? [],
        location: fieldErrors.location ?? [],
      });
      return;
    }

    setErrors({ nit: [], name: [], location: [] });
    setStep(2);
  };
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
        {errors.nit && (
          <p className="text-xs mt-2 ml-1 text-red-600">{errors.nit}</p>
        )}
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
        {errors.name && (
          <p className="text-xs mt-2 ml-1 text-red-600">{errors.name}</p>
        )}
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
        {errors.location && (
          <p className="text-xs mt-2 ml-1 text-red-600">{errors.location}</p>
        )}
      </label>
      <button
        type="button"
        onClick={onClick}
        disabled={!isFormValid}
        className="bg-gradient-to-t from-primary to-secondary to-100% p-2 py-3 rounded-md font-bold mt-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </>
  );
}
