"use client";
import Image from "next/image";
import { useActionState } from "react";

import Input from "../components/Input";
import { login } from "../actions/login";
import ButtonSubmit from "../components/ButtonSubmit";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="grid place-content-center h-screen">
      <form
        action={action}
        className="flex flex-col gap-y-4 p-12 bg-zinc-950 bg-opacity-50 rounded-md w-96 border border-zinc-800"
      >
        <Image
          src={"/Logo.svg"}
          alt="dashboard"
          width={60}
          height={60}
          className="self-center"
        />
        <div className="flex flex-col self-center mb-4">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="self-center text-xs text-slate-300">
            Ingresa tus credenciales
          </p>
        </div>
        <Input
          type="text"
          name="email"
          label="Correo Electrónico"
          error={state?.errors?.email}
          placeholder="Ingresa tu correo electrónico"
        />
        <Input
          type="password"
          name="password"
          label="Contraseña"
          error={state?.errors?.password}
          placeholder="***********"
        />
        <ButtonSubmit pending={pending}>Iniciar sesión</ButtonSubmit>
        <p
          className={`text-sm text-center text-red-600 min-h-4 transition-opacity duration-300 ${
            state?.message ? "opacity-100" : "opacity-0"
          }`}
        >
          {state?.message ?? " "}
        </p>
      </form>
    </div>
  );
}
