"use client";
import Image from "next/image";
import { useActionState } from "react";

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
        <label className="flex flex-col">
          <span className="text-sm mb-2">Correo Electrónico</span>
          <input
            type="text"
            name="email"
            className={`bg-zinc-800 border rounded-md p-2 placeholder:text-sm ${state?.errors?.email ? "border-red-600" : "border-zinc-700"}`}
            placeholder="Ingresa tu correo electrónico"
          />
          {state?.errors?.email && (
            <p className="text-xs mt-2 ml-1 text-red-600">
              {state.errors.email}
            </p>
          )}
        </label>
        <label className="flex flex-col mb-2">
          <span className="text-sm mb-2">Contraseña</span>
          <input
            name="password"
            type="password"
            className={`bg-zinc-800 border rounded-md p-2 placeholder:text-sm ${state?.errors?.password ? "border-red-600" : "border-zinc-700"}`}
            placeholder="***********"
          />
          {state?.errors?.password && (
            <p className="text-xs mt-2 ml-1 text-red-600">
              {state.errors.password}
            </p>
          )}
        </label>
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
