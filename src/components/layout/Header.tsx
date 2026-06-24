"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCarrinho } from "@/components/carrinho/CarrinhoProvider";

export function Header() {
  const { total, abrir } = useCarrinho();
  const [menu, setMenu] = useState(false);

  const nav = [
    { href: "/loja", label: "Loja" },
    { href: "/loja?categoria=Kits+de+Festa", label: "Kits de Festa" },
    { href: "/loja?categoria=Balões", label: "Balões" },
    { href: "/loja?categoria=Papelaria", label: "Papelaria" },
    { href: "/sobre", label: "Sobre nós" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#79c9ef]/30 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo real */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Caeiro & Reis — início">
          <Image
            src="/logo.png"
            alt="Logo Caeiro & Reis"
            width={40}
            height={40}
            className="rounded-full group-hover:scale-105 transition-transform duration-200"
          />
          <div className="leading-tight">
            <p className="font-titulo font-black text-[#79bfe1] text-base tracking-tight">
              Caeiro<span className="text-rosa">&</span>Reis
            </p>
            <p className="text-[9px] font-corpo text-texto-suave tracking-widest uppercase">
              Decoração de Festas
            </p>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-xs font-titulo font-bold tracking-wide text-texto/60 hover:text-rosa transition-colors uppercase">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 text-[#25D366] text-xs font-titulo font-bold hover:bg-[#25D366]/20 transition-colors">
            💬 WhatsApp
          </a>
          <button onClick={abrir} className="relative p-2 text-titulo hover:text-rosa transition-colors" aria-label="Carrinho">
            <ShoppingCart className="w-5 h-5" />
            {total > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rosa text-white text-[10px] font-titulo font-black rounded-full flex items-center justify-center animate-pop-in">
                {total}
              </span>
            )}
          </button>
          <button onClick={() => setMenu(!menu)} className="md:hidden p-2 text-titulo" aria-label="Menu">
            {menu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menu && (
        <div className="md:hidden border-t border-[#79c9ef]/20 bg-white px-4 py-4 flex flex-col gap-3">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenu(false)}
              className="text-sm font-titulo font-bold text-titulo/70 hover:text-rosa py-1 transition-colors">
              {l.label}
            </Link>
          ))}
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
            className="text-sm font-titulo font-bold text-[#25D366] py-1">
            💬 WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
