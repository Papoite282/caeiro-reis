"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Produto, ItemCarrinho } from "@/types";
import { CarrinhoDrawer } from "./CarrinhoDrawer";

interface CarrinhoCtx {
  itens: ItemCarrinho[]; total: number; aberto: boolean;
  abrir: () => void; fechar: () => void;
  adicionar: (produto: Produto, personalizacao?: string) => void;
  remover: (produtoId: string) => void;
  limpar: () => void;
}
const Ctx = createContext<CarrinhoCtx | null>(null);
export function useCarrinho() { const c = useContext(Ctx); if (!c) throw new Error("useCarrinho fora do provider"); return c; }

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [aberto, setAberto] = useState(false);

  const adicionar = useCallback((produto: Produto, personalizacao?: string) => {
    setItens(prev => {
      const existe = prev.find(i => i.produto.id === produto.id);
      if (existe) return prev;
      return [...prev, { produto, quantidade: 1, personalizacao }];
    });
    setAberto(true);
  }, []);
  const remover = useCallback((id: string) => setItens(prev => prev.filter(i => i.produto.id !== id)), []);
  const limpar = useCallback(() => setItens([]), []);
  const total = itens.length;

  return (
    <Ctx.Provider value={{ itens, total, aberto, abrir: () => setAberto(true), fechar: () => setAberto(false), adicionar, remover, limpar }}>
      {children}
      <CarrinhoDrawer />
    </Ctx.Provider>
  );
}
