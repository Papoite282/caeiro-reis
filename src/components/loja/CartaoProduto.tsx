"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Check, Star } from "lucide-react";
import { Produto } from "@/types";
import { formatarPrecoMin, cn } from "@/lib/utils";
import { useCarrinho } from "@/components/carrinho/CarrinhoProvider";
import { useState } from "react";

const EMOJIS: Record<string,string> = {
  "Kits de Festa":"🎁","Balões":"🎈","Papelaria":"✉️","Display":"🌈",
  "Cestas Personalizadas":"🧺","Festas Temáticas":"🎡","Insufláveis":"🎀","Workshop":"🎨"
};
const CORES: Record<string,string> = {
  "Kits de Festa":"bg-rosa-claro text-rosa-escuro","Balões":"bg-azul-claro text-azul-escuro",
  "Papelaria":"bg-amarelo-claro text-amarelo-escuro","Display":"bg-lavanda-claro text-lavanda-escuro",
  "Cestas Personalizadas":"bg-menta-claro text-menta-escuro","Festas Temáticas":"bg-rosa-claro text-rosa-escuro",
  "Insufláveis":"bg-azul-claro text-azul-escuro","Workshop":"bg-amarelo-claro text-amarelo-escuro"
};

export function CartaoProduto({ produto }: { produto: Produto }) {
  const { adicionar, itens } = useCarrinho();
  const [ok, setOk] = useState(false);
  const noCarrinho = itens.some(i => i.produto.id === produto.id);

  function handleAdicionar(e: React.MouseEvent) {
    e.preventDefault(); if (noCarrinho) return;
    adicionar(produto); setOk(true); setTimeout(() => setOk(false), 1500);
  }

  return (
    <Link href={`/loja/${produto.slug}`} className="block">
      <article className="card-produto">
        {/* Imagem */}
        <div className="relative aspect-square bg-hero overflow-hidden">
          {produto.imageUrl ? (
            <Image src={produto.imageUrl} alt={produto.nome} fill sizes="(max-width:640px) 50vw,25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl group-hover:animate-wiggle">{EMOJIS[produto.categoria] ?? "🎉"}</span>
            </div>
          )}
          {produto.destaque && (
            <span className="absolute top-2 left-2 flex items-center gap-1 bg-amarelo text-titulo text-[10px] font-titulo font-black px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-current" /> Popular
            </span>
          )}
          {produto.personalizavel && (
            <span className="absolute top-2 right-2 bg-rosa text-white text-[10px] font-titulo font-black px-2 py-0.5 rounded-full">✏️ Personalizável</span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <span className={`badge-categoria ${CORES[produto.categoria] ?? "bg-rosa-claro text-rosa-escuro"} text-[10px] mb-2`}>
            {EMOJIS[produto.categoria]} {produto.categoria}
          </span>
          <h3 className="font-titulo font-black text-titulo text-sm leading-snug line-clamp-2 mt-1 mb-3">{produto.nome}</h3>
          <div className="flex items-center justify-between">
            <p className="font-titulo font-black text-rosa">{formatarPrecoMin(produto.preco, produto.precoMin)}</p>
            <button onClick={handleAdicionar}
              className={cn("flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-titulo font-bold transition-all duration-200",
                noCarrinho || ok ? "bg-menta text-white" : "bg-rosa/10 text-rosa hover:bg-rosa hover:text-white"
              )}>
              {noCarrinho || ok ? <><Check className="w-3 h-3" /> Adicionado</> : <><ShoppingCart className="w-3 h-3" /> Adicionar</>}
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
