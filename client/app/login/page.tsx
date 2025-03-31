import Image from "next/image";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex rounded-md border border-zinc-800">
        <Image
          src={"/dashboard.png"}
          alt="dashboard"
          width={600}
          height={600}
          className="rounded-l-md"
        />
        <form className="flex flex-col gap-y-4 p-12 bg-zinc-950 bg-opacity-50 rounded-r-md w-96">
          <div>
            <h1 className="text-2xl font-bold">Iniciar sesión</h1>
            <p className="text-xs text-slate-300">Ingresa tus credenciales</p>
          </div>
          <label className="flex flex-col">
            <span className="text-sm mb-2">Correo Electrónico</span>
            <input
              type="text"
              className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
              placeholder="Ingresa tu correo electrónico"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm mb-2">Contraseña</span>
            <input
              type="password"
              className="bg-zinc-800 border border-zinc-700 rounded-md p-2 placeholder:text-sm"
              placeholder="******"
            />
          </label>
          <button
            type="submit"
            className="bg-gradient-to-t from-primary to-secondary to-100% p-2 rounded-md font-bold mt-3"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
