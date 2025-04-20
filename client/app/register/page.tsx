"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";
import { register } from "../auth/actions/register";

export default function Register() {
  const [step, setStep] = useState(1);
  const [state, action, pending] = useActionState(register, undefined);

  const [stepOneData, setStepOneData] = useState({
    nit: "",
    name: "",
    location: "",
  });

  return (
    <div className="grid place-content-center h-screen">
      <form
        className="flex flex-col gap-y-4 p-12 bg-zinc-950 bg-opacity-50 rounded-md w-96 border border-zinc-800"
        action={action}
      >
        <Image
          src={"/Logo.svg"}
          alt="dashboard"
          width={60}
          height={60}
          className="self-center"
        />
        <div className="flex flex-col self-center mb-4">
          <h1 className="text-2xl font-bold">Crea un cuenta</h1>
          <p className="self-center text-xs text-slate-300">
            Únete a nuestra red
          </p>
        </div>
        {step === 1 ? (
          <StepOne
            setStep={setStep}
            data={stepOneData}
            setData={setStepOneData}
          />
        ) : (
          <>
            <input type="hidden" name="nit" value={stepOneData.nit} />
            <input type="hidden" name="name" value={stepOneData.name} />
            <input type="hidden" name="location" value={stepOneData.location} />
            <StepTwo setStep={setStep} pending={pending} state={state} />
          </>
        )}
        <p
          className={`text-sm text-center text-red-700 min-h-4 transition-opacity duration-300 ${
            state?.message ? "opacity-100" : "opacity-0"
          }`}
        >
          {state?.message ?? " "}
        </p>
      </form>
    </div>
  );
}
