import { useState } from "react";
import Input from "../../components/Input";
import { SignupStepOneSchema } from "@/lib/schemas/SignupSchema";

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
  const [errors, setErrors] = useState<
    | {
        nit: string[];
        name: string[];
        location: string[];
      }
    | undefined
  >({
    nit: [],
    name: [],
    location: [],
  });

  const isFormValid =
    data.nit && data.name.trim() !== "" && data.location.trim() !== "";

  const onClick = () => {
    const validatedFields = SignupStepOneSchema.safeParse({
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
      <Input
        type="text"
        name="nit"
        label="NIT"
        error={errors?.nit}
        placeholder="Ingrese el NIT"
        onChange={(e) => setData({ ...data, nit: e.target.value })}
      />
      <Input
        type="text"
        name="name"
        label="Nombre de la empresa"
        error={errors?.name}
        placeholder="Ingrese el nombre de la empresa"
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <Input
        type="text"
        name="location"
        label="Ubicación"
        error={errors?.location}
        placeholder="Ingrese la ubicación"
        onChange={(e) => setData({ ...data, location: e.target.value })}
      />
      <button
        type="button"
        onClick={onClick}
        disabled={!isFormValid}
        className="bg-linear-to-t from-primary to-secondary to-100% p-2 py-3 rounded-md font-bold mt-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </>
  );
}
