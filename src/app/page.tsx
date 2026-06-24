import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { CartaoProduto } from "@/components/loja/CartaoProduto";
import { formatarPreco } from "@/lib/utils";
import { ArrowRight, Star } from "lucide-react";

const SERVICOS = [
  { titulo: "Decoração personalizada",   desc: "Criamos decorações ajustadas ao tema, cores e estilo da sua festa, garantindo um resultado único e harmonioso.", emoji: "🎨" },
  { titulo: "Balões personalizados",      desc: "Arranjos de balões criativos com personalização de cores, números, temas e detalhes para qualquer ocasião.", emoji: "🎈" },
  { titulo: "Festas temáticas",           desc: "Disponibilizamos vários temas e inspirações para tornar a sua festa ainda mais especial e visualmente marcante.", emoji: "🎡" },
  { titulo: "Eventos e ocasiões",         desc: "Estamos presentes nos momentos que importam, nas datas festivas e momentos importantes, sempre com atenção ao detalhe.", emoji: "🌟" },
  { titulo: "Artigos e complementos",     desc: "Temos tudo o que precisa para complementar a sua decoração e tornar o ambiente perfeito.", emoji: "🛍️" },
  { titulo: "Atendimento personalizado",  desc: "Oferecemos um serviço próximo e personalizado para que cada cliente sinta um acompanhamento único.", emoji: "💖" },
];

const REVIEWS = [
  { nome: "ANIMALICE! - Animação Infantil", texto: "Excelente atendimento, profissionalismo e atenção aos detalhes. A loja bem acolhedora com brinquedos e artigos de festas impecáveis.", stars: 5, tempo: "há 21 dias" },
  { nome: "Silvia Abrantes", texto: "Recomendo, atendimento de excelência, super atenciosos. Trabalho maravilhoso ❤️🌿", stars: 5, tempo: "mês passado" },
  { nome: "Ester Vicentini", texto: "Atendimento excelente, materiais de qualidade. A Carla é super atenta aos detalhes! Recomendo muito!", stars: 5, tempo: "há 2 meses" },
  { nome: "Fernanda Sobrinho", texto: "Excelente loja! Produtos de qualidade e atendimento muito simpático. Voltarei com certeza!", stars: 5, tempo: "há 2 meses" },
];

export default async function PaginaInicio() {
  const kitsDestaque = await prisma.produto.findMany({
    where: { destaque: true, ativo: true, categoria: "Kits de Festa" }, take: 3,
  });
  const produtosDestaque = await prisma.produto.findMany({
    where: { ativo: true, imageUrl: { not: null }, destaque: false },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#79c9ef]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="font-titulo font-black text-[#79bfe1] text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
                Caeiro &amp; Reis
              </h1>
              <p className="font-titulo font-bold text-titulo/70 text-lg sm:text-xl">
                Decoração de Festas e Organização de Eventos
              </p>
            </div>
            <div className="shrink-0 w-28 sm:w-36 md:w-44">
              <Image src="/mascot.png" alt="Mascote Caeiro & Reis" width={180} height={180} className="w-full h-auto" priority />
            </div>
          </div>
        </div>
      </section>

      {/* ── SOBRE NÓS ────────────────────────────────────────────── */}
      <section className="bg-[rgba(247,250,252,0.88)] border border-[#79c9ef]/30 mx-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="font-titulo font-black text-[#79bfe1] text-2xl sm:text-3xl text-center mb-10">
            Transformamos momentos em memórias inesquecíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-texto/70 font-corpo leading-relaxed text-sm sm:text-base">
              <p>Somos uma empresa especializada em organização e decoração de eventos personalizados, com foco em festas infantis e celebrações que merecem um toque único e memorável.</p>
              <p>Nasceu do sonho da <strong className="text-titulo">Carla</strong> e do <strong className="text-titulo">Bruno</strong> de criar momentos felizes e tornar cada celebração única.</p>
              <p>Com presença consolidada online e uma comunidade apaixonada por festas, a Caeiro &amp; Reis combina criatividade, profissionalismo e atenção ao detalhe para tornar cada evento verdadeiramente especial.</p>
            </div>
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
              <Image src="/images/galeria/loja-2.jpg" alt="Caeiro & Reis — A nossa equipa" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAZEMOS OS MOMENTOS ÚNICOS ───────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="font-titulo font-black text-[#79bfe1] text-2xl sm:text-3xl text-center mb-10">
            Fazemos os momentos, únicos.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md order-2 md:order-1">
              <Image src="/images/galeria/loja-1.jpg" alt="Caeiro & Reis — Decoração personalizada" fill className="object-cover" />
            </div>
            <div className="space-y-4 text-texto/70 font-corpo leading-relaxed text-sm sm:text-base order-1 md:order-2">
              <p>Acreditamos que cada festa é uma história única, todos os pequenos detalhes fazem a diferença e é por isso que colocamos amor em tudo o que fazemos.</p>
              <p>Desde aniversários e batizados até aos baby showers, chás de revelação e eventos corporativos, não há festa grande ou pequena demais para nós.</p>
              <Link href="/loja?categoria=Kits+de+Festa" className="btn-primary inline-flex mt-2">
                Ver os nossos kits <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS (6 cards) ────────────────────────────────────── */}
      <section className="bg-[rgba(247,250,252,0.88)] border-y border-[#79c9ef]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-10">
            <h2 className="font-titulo font-black text-[#79bfe1] text-2xl sm:text-3xl mb-3">
              Uma paixão pela decoração de festas
            </h2>
            <p className="font-corpo text-texto/60 max-w-2xl mx-auto text-sm">
              O nosso conjunto de serviços foi criado para transformar qualquer celebração num momento memorável. Desenvolvemos soluções criativas, personalizadas e adaptadas ao seu gosto.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICOS.map((s) => (
              <div key={s.titulo} className="card-categoria text-left p-5">
                <span className="text-2xl mb-3 block">{s.emoji}</span>
                <h3 className="font-titulo font-black text-[#79bfe1] text-sm mb-2">{s.titulo}</h3>
                <p className="font-corpo text-texto/60 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KITS EM DESTAQUE ─────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-titulo font-bold text-rosa tracking-widest uppercase mb-1">Os nossos kits</p>
              <h2 className="font-titulo font-black text-titulo text-2xl sm:text-3xl">Kits de Festa Prontos ✨</h2>
            </div>
            <Link href="/loja?categoria=Kits+de+Festa" className="hidden sm:flex items-center gap-1.5 text-xs font-titulo font-bold text-rosa hover:text-rosa-escuro">
              Ver todos <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {kitsDestaque.map((p) => (
              <CartaoProduto key={p.id} produto={p as any} />
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS GOOGLE ───────────────────────────────────────── */}
      <section className="bg-[rgba(247,250,252,0.88)] border-y border-[#79c9ef]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-8">
            <h2 className="font-titulo font-black text-[#79bfe1] text-2xl sm:text-3xl mb-2">
              A felicidade dos nossos clientes é o que nos move.
            </h2>
            <p className="font-corpo text-texto/50 text-sm">As avaliações dos nossos clientes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.nome} className="card-categoria p-5 text-left">
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({length: r.stars}).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amarelo text-amarelo" />
                  ))}
                </div>
                <p className="font-titulo font-black text-titulo text-xs mb-1">{r.nome}</p>
                <p className="font-corpo text-texto-suave text-[10px] mb-2">{r.tempo}</p>
                <p className="font-corpo text-texto/70 text-xs leading-relaxed line-clamp-4">{r.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIA DE TRABALHOS ─────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="font-titulo font-black text-[#79bfe1] text-2xl sm:text-3xl text-center mb-8">
            Cada detalhe conta uma história
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {["trabalho-1","trabalho-2","trabalho-3","trabalho-4","trabalho-5","trabalho-6"].map((img) => (
              <div key={img} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image src={`/images/galeria/${img}.jpg`} alt="Trabalho Caeiro & Reis" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUTOS EM DESTAQUE (WooCommerce) ───────────────────── */}
      <section className="bg-[rgba(247,250,252,0.88)] border-t border-[#79c9ef]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-titulo font-bold text-rosa tracking-widest uppercase mb-1">Loja</p>
              <h2 className="font-titulo font-black text-titulo text-2xl sm:text-3xl">Produtos em Destaque 🛒</h2>
            </div>
            <Link href="/loja" className="hidden sm:flex items-center gap-1.5 text-xs font-titulo font-bold text-rosa hover:text-rosa-escuro">
              Ver tudo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {produtosDestaque.map((p) => (
              <CartaoProduto key={p.id} produto={p as any} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA WHATSAPP ─────────────────────────────────────────── */}
      <section className="bg-[#79bfe1] py-14 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-titulo font-black text-2xl sm:text-3xl mb-3">Pronto para criar momentos únicos?</h2>
          <p className="font-corpo text-white/80 mb-7 text-base">Fale connosco e juntos criamos a festa perfeita para a sua ocasião especial. 🎉</p>
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Olá! Gostava de pedir um orçamento.`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#79bfe1] font-titulo font-black px-8 py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform text-base">
            💬 Falar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
