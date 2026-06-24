"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Phone } from "lucide-react";
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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rosa/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-hero flex items-center justify-center text-lg font-titulo font-black text-rosa">C</div>
          <div className="leading-tight">
            <p className="font-titulo font-black text-titulo text-sm">Caeiro<span className="text-rosa">&</span>Reis</p>
            <p className="text-[9px] font-corpo text-texto-suave tracking-widest uppercase">Decoração de Festas</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="text-xs font-titulo font-bold tracking-wide text-texto/60 hover:text-rosa transition-colors uppercase">{l.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-titulo font-bold text-[#25D366] hover:text-[#1DA851] transition-colors">
            <Phone className="w-3.5 h-3.5" /> WhatsApp
          </a>
          <button onClick={abrir} className="relative p-2 text-titulo hover:text-rosa transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {total > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rosa text-white text-[10px] font-titulo font-black rounded-full flex items-center justify-center animate-pop-in">
                {total}
              </span>
            )}
          </button>
          <button onClick={() => setMenu(!menu)} className="md:hidden p-2 text-titulo">
            {menu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {menu && (
        <div className="md:hidden border-t border-rosa/10 bg-white px-4 py-4 flex flex-col gap-3">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenu(false)}
              className="text-sm font-titulo font-bold text-titulo/70 hover:text-rosa py-1">{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
