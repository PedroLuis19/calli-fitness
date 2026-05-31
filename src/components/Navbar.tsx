'use client'
import { Home, Activity, BookOpen, LogIn, LogOut, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const getLinkClass = (path: string) => 
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${pathname === path ? 'bg-zinc-800 text-emerald-400 font-semibold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO ATUALIZADA AQUI */}
        <Link href="/" className="flex items-center transition-transform hover:scale-105">
          <Image 
            src="/home-logo.png" 
            alt="Calli Logo" 
            width={140} 
            height={60} 
            className="h-10 w-auto" 
            priority // Diz ao Next.js para carregar essa imagem primeiro (melhora a performance)
          />
        </Link>
        
        <div className="hidden md:flex space-x-1">
          <Link href="/" className={getLinkClass('/')}><Home size={18}/> Home</Link>
          <Link href="/treinos" className={getLinkClass('/treinos')}><Dumbbell size={18}/> Treinos</Link>
          <Link href="/evolucao" className={getLinkClass('/evolucao')}><Activity size={18}/> Evolução</Link>
          <Link href="/catalogo" className={getLinkClass('/catalogo')}><BookOpen size={18}/> Catálogo</Link>
        </div>
        
        <div>
          {session ? (
            <button onClick={() => signOut()} className="flex items-center gap-2 text-zinc-400 hover:text-red-400">
              <LogOut size={18} /> Sair
            </button>
          ) : (
            <Link href="/login" className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-4 py-2 rounded-lg font-bold">
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}