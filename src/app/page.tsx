import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CartaoProduto } from "@/components/loja/CartaoProduto";
import { formatarPrecoMin } from "@/lib/utils";
import { ArrowRight, Star, Truck, Heart, Sparkles } from "lucide-react";

const CATEGORIAS = [
  { nome: "Kits de Festa", emoji: "🎁", cor: "bg-rosa-claro text-rosa-escuro", destaque: "Tudo incluído" },
  { nome: "Balões", emoji: "🎈", cor: "bg-azul-claro text-azul-escuro", destaque: "Montagem incluída" },
  { nome: "Papelaria", emoji: "✉️", cor: "bg-amarelo-claro text-amarelo-escuro", destaque: "100% personalizada" },
  { nome: "Display", emoji: "🌈", cor: "bg-lavanda-claro text-lavanda-escuro", destaque: "Impactante" },
  { nome: "Cestas Personalizadas", emoji: "🧺", cor: "bg-menta-claro text-menta-escuro", destaque: "Oferta perfeita" },
  { nome: "Festas Temáticas", emoji: "🎡", cor: "bg-rosa-claro text-rosa-escuro", destaque: "Qualquer tema" },
  { nome: "Insufláveis", emoji: "🎀", cor: "bg-azul-claro text-azul-escuro", destaque: "Reutilizáveis" },
  { nome: "Workshop", emoji: "🎨", cor: "bg-amarelo-claro text-amarelo-escuro", destaque: "Aprenda a decorar" },
];

export default async function PaginaInicio() {
  const destaques = await prisma.produto.findMany({ where: { destaque: true, ativo: true }, take: 6 });

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-hero overflow-hidden">
        <div className="absolute inset-0 dots-bg" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-rosa" />
            <span className="text-xs font-titulo font-bold text-titulo tracking-wide">✨ Festas personalizadas em Lisboa</span>
          </div>
          <h1 className="secao-titulo text-5xl sm:text-6xl md:text-7xl text-titulo mb-6">
            Celebrar não precisa<br />
            <span className="text-rosa">ser complicado!</span>
          </h1>
          <p className="text-lg font-corpo text-texto/70 max-w-2xl mx-auto mb-10">
            Kits de festa prontos e personalizados, balões, papelaria e decoração criativa. Fazemos a magia acontecer para que só tenha de aproveitar! 🎉
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/loja" className="btn-primary text-base px-8 py-4">
              Ver a Loja <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Olá! Gostava de pedir um orçamento para decoração de festa.`}
              target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base px-8 py-4">
              💬 Pedir Orçamento
            </a>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-white py-10 border-y border-rosa/10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🎨", titulo: "100% Personalizado", sub: "Ao seu gosto" },
            { icon: "🚚", titulo: "Entrega em Lisboa", sub: "Montagem incluída" },
            { icon: "⚡", titulo: "Resposta Rápida", sub: "Via WhatsApp" },
            { icon: "💖", titulo: "Feito com Amor", sub: "Desde 2024" },
          ].map((b) => (
            <div key={b.titulo} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{b.icon}</span>
              <p className="font-titulo font-black text-sm text-titulo">{b.titulo}</p>
              <p className="text-xs font-corpo text-texto-suave">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-titulo font-bold text-rosa tracking-widest uppercase mb-2">O que fazemos</p>
          <h2 className="secao-titulo text-3xl sm:text-4xl text-titulo">Temos tudo para a sua festa 🎊</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIAS.map((cat) => (
            <Link key={cat.nome} href={`/loja?categoria=${encodeURIComponent(cat.nome)}`}
              className="group p-5 bg-white rounded-3xl border-2 border-transparent hover:border-rosa/30 shadow-sm hover:shadow-md transition-all duration-200 text-center">
              <span className="text-4xl block mb-3 group-hover:animate-wiggle">{cat.emoji}</span>
              <p className="font-titulo font-black text-sm text-titulo mb-1">{cat.nome}</p>
              <span className={`badge-categoria ${cat.cor} text-[10px]`}>{cat.destaque}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUTOS DESTAQUE */}
      <section className="bg-festivo py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-titulo font-bold text-rosa tracking-widest uppercase mb-2">Mais Populares</p>
              <h2 className="secao-titulo text-3xl sm:text-4xl text-titulo">Os nossos favoritos ⭐</h2>
            </div>
            <Link href="/loja" className="hidden sm:flex items-center gap-1.5 text-xs font-titulo font-bold text-rosa hover:text-rosa-escuro">
              Ver tudo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {destaques.map((p) => <CartaoProduto key={p.id} produto={p as any} />)}
          </div>
        </div>
      </section>

      {/* CTA WHATSAPP */}
      <section className="bg-rosa py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 text-[120px] flex items-center justify-center select-none">🎉</div>
        <div className="relative max-w-2xl mx-auto px-4">
          <h2 className="font-titulo font-black text-3xl sm:text-4xl mb-4">
            Não encontrou o que procura?
          </h2>
          <p className="font-corpo text-white/80 mb-8 text-lg">
            Fale connosco! Fazemos orçamentos personalizados para qualquer tipo de festa. 💬
          </p>
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Olá! Gostava de pedir um orçamento personalizado.`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-rosa font-titulo font-black px-8 py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform text-base">
            💬 Falar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
