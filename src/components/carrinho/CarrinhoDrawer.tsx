"use client";
import { useCarrinho } from "./CarrinhoProvider";
import { X, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { formatarPreco, cn } from "@/lib/utils";
import { useState } from "react";

export function CarrinhoDrawer() {
  const { itens, aberto, fechar, remover, total, limpar } = useCarrinho();
  const [loading, setLoading] = useState(false);
  const subtotal = itens.reduce((s, i) => s + i.produto.preco, 0);

  async function checkout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itens: itens.map(i => ({ id: i.produto.id, personalizacao: i.personalizacao })) }),
      });
      const data = await res.json();
      if (data.url) { limpar(); window.location.href = data.url; }
    } finally { setLoading(false); }
  }

  return (
    <>
      <div onClick={fechar} className={cn("fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300", aberto ? "opacity-100" : "opacity-0 pointer-events-none")} />
      <div className={cn("fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white flex flex-col shadow-2xl transition-transform duration-300", aberto ? "translate-x-0" : "translate-x-full")}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-rosa/10">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-rosa" />
            <span className="font-titulo font-black text-titulo">O Meu Carrinho</span>
            {total > 0 && <span className="w-5 h-5 bg-rosa text-white text-[10px] font-titulo font-black rounded-full flex items-center justify-center">{total}</span>}
          </div>
          <button onClick={fechar} className="p-1.5 text-texto/40 hover:text-rosa transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {itens.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-12">
              <span className="text-6xl animate-float">🛒</span>
              <p className="font-titulo font-black text-titulo/50 text-lg">Carrinho vazio</p>
              <p className="text-sm font-corpo text-texto-suave">Adicione produtos da nossa loja!</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {itens.map(item => (
                <li key={item.produto.id} className="flex gap-3 group bg-fundo rounded-2xl p-3">
                  <div className="w-14 h-14 bg-hero rounded-xl flex items-center justify-center text-2xl shrink-0">🎉</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-titulo font-bold text-titulo truncate">{item.produto.nome}</p>
                    <p className="text-xs font-corpo text-texto-suave">{item.produto.categoria}</p>
                    {item.personalizacao && <p className="text-xs font-corpo text-rosa mt-0.5 truncate">✏️ {item.personalizacao}</p>}
                    <p className="text-sm font-titulo font-black text-rosa mt-1">{formatarPreco(item.produto.preco)}</p>
                  </div>
                  <button onClick={() => remover(item.produto.id)} className="opacity-0 group-hover:opacity-100 p-1 text-texto/30 hover:text-rosa transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {itens.length > 0 && (
          <div className="p-5 border-t border-rosa/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-corpo text-texto/60 text-sm">Subtotal</span>
              <span className="font-titulo font-black text-2xl text-titulo">{formatarPreco(subtotal)}</span>
            </div>
            <button onClick={checkout} disabled={loading} className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60">
              {loading ? "A processar..." : <><span>Finalizar Pedido</span> <ArrowRight className="w-4 h-4" /></>}
            </button>
            <p className="text-center text-xs font-corpo text-texto-suave">Pagamento seguro via Stripe · MB Way · Multibanco</p>
          </div>
        )}
      </div>
    </>
  );
}
