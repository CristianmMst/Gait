"use client";
import { useState } from "react";
import { RotateCcw, Copy, Link, CopyCheck } from "lucide-react";
import { generateToken } from "../actions/generate_token";

export default function RegisterDistributor() {
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState("http://localhost:3000/register");
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = async () => {
    const { token } = await generateToken();
    setLink(`http://localhost:3000/register?token=${token}`);

    setIsGenerated(true);
    setTimeout(() => {
      setIsGenerated(false);
    }, 1500);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="grid place-content-center h-screen">
      <h1 className="text-xl font-bold">Registra un distribuidor</h1>
      <div className="flex flex-col gap-6">
        <p>Genera un link para que un distribuidor pueda registrarse</p>
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between bg-zinc-800 w-[35rem] h-10 rounded px-4 gap-4">
            <div className="flex items-center gap-4 w-full">
              <Link size={20} />
              <input
                disabled
                type="text"
                value={link}
                className="bg-transparent text-sm w-full"
              />
            </div>
            <button
              onClick={handleCopy}
              className="flex justify-center items-center gap-2"
            >
              {copied ? <span className="text-xs">Copiado</span> : ""}
              {copied ? <CopyCheck size={20} /> : <Copy size={20} />}
            </button>
          </div>
          <button
            onClick={handleGenerate}
            className="flex justify-center items-center bg-accent text-black p-2 rounded font-bold gap-2 active:scale-95 transition-transform hover:opacity-90"
          >
            <RotateCcw size={20} />
            <span>{isGenerated ? "Generado" : "Generar"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
