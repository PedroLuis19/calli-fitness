'use client'
import { registerUser } from "@/app/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function CadastroPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await registerUser(formData);
    if (res.error) setError(res.error);
    else router.push("/login");
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-md">
        <Dumbbell className="text-emerald-500 mx-auto mb-6" size={40} />
        <h2 className="text-2xl font-bold text-center text-white mb-6">Criar Conta</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Nome Completo" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white" />
          <input name="email" type="email" placeholder="Email" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white" />
          <input name="password" type="password" placeholder="Senha" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white" />
          <button type="submit" className="w-full bg-emerald-500 text-zinc-950 font-bold py-3 rounded-xl mt-4">Cadastrar</button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-500">Já possui conta? <Link href="/login" className="text-emerald-500">Faça Login</Link></p>
      </div>
    </div>
  );
}

