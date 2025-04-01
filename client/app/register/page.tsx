"use client";

import Image from "next/image";
import { useState } from "react";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";

export default function Login() {
  const [step, setStep] = useState(1);
  return (
    <div className="grid place-content-center h-screen">
      <form className="flex flex-col gap-y-4 p-12 bg-zinc-950 bg-opacity-50 rounded-md w-96 border border-zinc-800">
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
          <StepOne setStep={setStep} />
        ) : (
          <StepTwo setStep={setStep} />
        )}
      </form>
    </div>
  );
}
