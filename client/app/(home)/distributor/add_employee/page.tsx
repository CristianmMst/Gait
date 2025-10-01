"use client";
import { useActionState } from "react";
import { ROLE } from "@/app/shared/enums/user";
import { addEmployee } from "../actions/add_employee";

import Input from "@/app/(auth)/components/Input";
import ButtonSubmit from "@/app/(auth)/components/ButtonSubmit";

export default function AddEmployee() {
  const [state, action, pending] = useActionState(addEmployee, undefined);

  return (
    <div className="grid place-content-center h-screen">
      <form
        action={action}
        className="flex flex-col gap-y-4 p-12 py-8 bg-zinc-950 bg-opacity-50 rounded-md border border-zinc-800"
      >
        <div className="flex flex-col self-center mb-4">
          <h1 className="text-2xl font-bold">Registra un nuevo empleado</h1>
          <p className="self-center text-xs text-slate-300">
            Ingresa los datos para registrar un nuevo empleado
          </p>
        </div>
        <div className="flex justify-between gap-x-4">
          <Input
            type="text"
            name="name"
            label="Nombre"
            className="w-48"
            error={state?.errors?.name}
            placeholder="Nombre del empleado"
          />
          <Input
            type="text"
            name="lastname"
            label="Apellido"
            className="w-48"
            error={state?.errors?.lastname}
            placeholder="Apellido del empleado"
          />
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <Input
            type="text"
            name="id"
            className="w-48"
            error={state?.errors?.id}
            label="Cedula de ciudadanía"
            placeholder="Cédula del empleado"
          />
          <label className="flex flex-col mb-2">
            <span className="text-sm mb-2">Permisos del empleado</span>
            <select
              name="role"
              defaultValue={ROLE.ADMIN}
              className={`bg-zinc-800 p-2 rounded-md w-48`}
            >
              <option value={ROLE.VIEWER}>Viewer</option>
              <option value={ROLE.MODERATOR}>Moderador</option>
              <option value={ROLE.ADMIN}>Administrador</option>
            </select>
            {state?.errors?.role && (
              <p className="text-xs mt-2 ml-1 text-red-600">
                {state.errors.role}
              </p>
            )}
          </label>
        </div>
        <Input
          type="text"
          name="phone"
          label="Numero de telefono"
          error={state?.errors?.phone}
          placeholder="(+57) 1234567890"
        />
        <Input
          type="text"
          name="email"
          label="Correo Electrónico"
          error={state?.errors?.email}
          placeholder="Correo electrónico del empleado"
        />
        <Input
          type="password"
          name="password"
          label="Contraseña"
          error={state?.errors?.password}
          placeholder="Ingresa una contraseña para el empleado"
        />
        <ButtonSubmit pending={pending}>Registrar</ButtonSubmit>
        <p
          className={`text-sm text-center min-h-4 transition-opacity duration-300 ${
            state?.success
              ? "opacity-100 text-green-700"
              : state?.message
              ? "opacity-100 text-red-700"
              : "opacity-0"
          }`}
        >
          {state?.success
            ? "Empleado registrado exitosamente"
            : state?.message ?? " "}
        </p>
      </form>
    </div>
  );
}
