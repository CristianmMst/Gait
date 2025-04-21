import Input from "../../components/Input";
import ButtonSubmit from "../../components/ButtonSubmit";

interface StepTwoProps {
  state?: {
    errors?: {
      email?: string[];
      password?: string[];
    };
    message?: string;
  };
  pending: boolean;
  setStep: (step: number) => void;
}

export function StepTwo({ setStep, pending, state }: StepTwoProps) {
  return (
    <div className={`flex flex-col gap-y-4 step_two`}>
      <Input
        type="email"
        name="email"
        label="Correo Electrónico"
        error={state?.errors?.email}
        placeholder="Ingrese un correo electrónico"
      />
      <Input
        type="password"
        name="password"
        label="Contraseña"
        error={state?.errors?.password}
        placeholder="***********"
      />
      <div className="flex justify-between mt-3 font-bold">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="border-4 border-secondary p-2 px-10 rounded-md w-32"
        >
          Atras
        </button>
        <ButtonSubmit pending={pending}>Crear cuenta</ButtonSubmit>
      </div>
    </div>
  );
}
