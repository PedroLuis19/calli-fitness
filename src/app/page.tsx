import { Dumbbell } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center mt-20">
      <div className="p-4 bg-emerald-500/10 rounded-full mb-6"><Dumbbell className="text-emerald-500" size={64} /></div>
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Bem-vindo ao Calli</h1>
      <p className="text-zinc-400 max-w-lg mb-10 text-lg">Organize seus treinos e acompanhe sua evolução de verdade.</p>
      <Link href="/treinos" className="bg-emerald-500 text-zinc-950 font-bold py-3 px-8 rounded-xl text-lg hover:bg-emerald-600 transition">Começar a Treinar</Link>
    </div>
  );
}