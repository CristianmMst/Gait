"use client";
import Image from "next/image";
import { useActionState } from "react";
import { login } from "../actions/login";

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
            className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
            placeholder="Ingresa tu correo electrónico"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm mb-2">Contraseña</span>
          <input
            name="password"
            type="password"
            className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
            placeholder="***********"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="bg-gradient-to-t from-primary to-secondary to-100% p-2 rounded-md font-bold mt-3 disabled:opacity-50"
        >
          Iniciar sesión
        </button>
        <p
          className={`text-sm text-center text-red-700 min-h-4 transition-opacity duration-300 ${
            state?.errors ? "opacity-100" : "opacity-0"
          }`}
        >
          {state?.errors ?? " "}
        </p>
      </form>
    </div>
  );
}
