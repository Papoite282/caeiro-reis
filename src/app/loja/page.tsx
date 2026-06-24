import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { CartaoProduto } from "@/components/loja/CartaoProduto";
import { FiltroCategorias } from "@/components/loja/FiltroCategorias";

interface Props { searchParams: Promise<{ categoria?: string }> }

export async function generateMetadata({ searchParams }: Props) {
  const { categoria } = await searchParams;
  return { title: categoria ? `${categoria}` : "Loja", description: "Kits de festa, balões, papelaria e decoração personalizada em Lisboa." };
}

export default async function PaginaLoja({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const produtos = await prisma.produto.findMany({
    where: { ativo: true, ...(categoria ? { categoria } : {}) },
    orderBy: [{ destaque: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="text-xs font-titulo font-bold text-rosa tracking-widest uppercase mb-1">O que temos para si</p>
        <h1 className="font-titulo font-black text-3xl sm:text-4xl text-titulo mb-1">{categoria ?? "Toda a Loja"} 🛍️</h1>
        <p className="text-sm font-corpo text-texto-suave">{produtos.length} {produtos.length === 1 ? "produto" : "produtos"} disponíveis</p>
      </div>

      <div className="mb-8">
        <Suspense><FiltroCategorias /></Suspense>
      </div>
      <div className="w-full h-px bg-rosa/10 mb-8" />

      {produtos.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">🔍</span>
          <p className="font-titulo font-black text-titulo/50 text-xl">Nenhum produto encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {produtos.map(p => <CartaoProduto key={p.id} produto={p as any} />)}
        </div>
      )}
    </div>
  );
}
