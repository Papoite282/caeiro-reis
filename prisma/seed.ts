import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const produtos = [
  // ─── KITS DE FESTA (dados reais do WordPress) ───────────────────
  {
    slug: "kit-festa-na-caixa",
    nome: "Kit Festa Na Caixa",
    descricao: "Ideal para quem quer uma comemoração prática e bonita em casa. O Kit Festa Na Caixa foi pensado para tornar mais simples a organização de um momento especial. Prático, alegre e divertido, ideal para animar os mais pequenos e criar um ambiente festivo sem complicações. Disponível em 3 versões: BASIC, MEDIUM e PREMIUM.",
    preco: 45,
    precoMin: 25,
    categoria: "Kits de Festa",
    imageUrl: "/images/kits/kit-festa-caixa1.jpg",
    destaque: true,
    personalizavel: true,
  },
  {
    slug: "kit-festa-na-creche",
    nome: "Kit Festa Na Creche",
    descricao: "A solução prática para enviar tudo pronto para a creche. O Kit Festa na Creche foi pensado para tornar mais simples a organização de um momento especial na creche ou na escola. Prático, alegre e divertido, ideal para animar os mais pequenos. Inclui pratos, copos e talheres, topper de bolo, mini arranjos e lembranças.",
    preco: 60,
    precoMin: 40,
    categoria: "Kits de Festa",
    imageUrl: "/images/kits/kit-festa-creche1.jpg",
    destaque: true,
    personalizavel: true,
  },
  {
    slug: "kit-festa-na-mesa",
    nome: "Kit Festa Na Mesa",
    descricao: "Para quem quer aquele cantinho especial para cantar os parabéns. O Kit Festa Na Mesa foi pensado para criar um ambiente festivo perfeito à mesa, com decoração temática e todos os acessórios necessários para um momento inesquecível.",
    preco: 55,
    precoMin: 35,
    categoria: "Kits de Festa",
    imageUrl: "/images/kits/kit-festa-mesa1.jpg",
    destaque: true,
    personalizavel: true,
  },
  {
    slug: "kit-pequeno-almoco",
    nome: "Kit Pequeno Almoço",
    descricao: "Um kit festivo pensado para tornar o pequeno-almoço de aniversário numa celebração especial e inesquecível. Pratos, copos, guardanapos, talheres e balões temáticos, cuidadosamente escolhidos para dar mais cor e alegria à celebração.",
    preco: 50,
    precoMin: 30,
    categoria: "Kits de Festa",
    imageUrl: null,
    destaque: false,
    personalizavel: true,
  },

  // ─── BALÕES ─────────────────────────────────────────────────────
  {
    slug: "arco-baloes-personalizado",
    nome: "Arco de Balões Personalizado",
    descricao: "Arco de balões decorativo nas cores que quiser. Perfeito para entrada, mesa de bolo ou fundo de festa. Montagem incluída em Lisboa e arredores.",
    preco: 55,
    precoMin: 35,
    categoria: "Balões",
    imageUrl: null,
    destaque: true,
    personalizavel: true,
  },
  {
    slug: "buque-baloes-personalizado",
    nome: "Buquê de Balões com Hélio",
    descricao: "Conjunto de balões decorativos com hélio para aniversários e eventos especiais. Personalizado com as cores e tema da festa.",
    preco: 20,
    precoMin: 15,
    categoria: "Balões",
    imageUrl: null,
    destaque: false,
    personalizavel: true,
  },
  {
    slug: "coluna-baloes",
    nome: "Coluna de Balões",
    descricao: "Coluna decorativa de balões para entrada ou fundo de sala. Disponível em qualquer combinação de cores e temas.",
    preco: 30,
    precoMin: 22,
    categoria: "Balões",
    imageUrl: null,
    destaque: false,
    personalizavel: true,
  },
  {
    slug: "balao-numero-gigante",
    nome: "Balão Número Gigante",
    descricao: "Balão XL metálico em forma de número para decoração de aniversários. Grande impacto visual e reutilizável.",
    preco: 15,
    precoMin: 12,
    categoria: "Balões",
    imageUrl: null,
    destaque: false,
    personalizavel: true,
  },

  // ─── PAPELARIA ──────────────────────────────────────────────────
  {
    slug: "convites-personalizados",
    nome: "Convites Personalizados",
    descricao: "Convites digitais ou impressos com design exclusivo para o seu evento. Layout criado a partir do tema e cores escolhidos. Entrega digital em 48h.",
    preco: 35,
    precoMin: 20,
    categoria: "Papelaria",
    imageUrl: null,
    destaque: true,
    personalizavel: true,
  },
  {
    slug: "topper-bolo-personalizado",
    nome: "Topper de Bolo Personalizado",
    descricao: "Topper acrílico ou cartão personalizado com o nome, idade e tema da festa. Acabamento profissional.",
    preco: 12,
    precoMin: 8,
    categoria: "Papelaria",
    imageUrl: null,
    destaque: false,
    personalizavel: true,
  },
  {
    slug: "kit-papelaria-completo",
    nome: "Kit Papelaria Completo",
    descricao: "Conjunto completo: convites, tags, rótulos, caixinhas de lembrança, toppers e bandeirolas. Tudo personalizado com o tema da festa.",
    preco: 75,
    precoMin: 55,
    categoria: "Papelaria",
    imageUrl: null,
    destaque: true,
    personalizavel: true,
  },

  // ─── DISPLAY ────────────────────────────────────────────────────
  {
    slug: "display-mesa-doces",
    nome: "Display Mesa de Doces",
    descricao: "Decoração completa para mesa de doces com andares, displays temáticos e decoração totalmente personalizada ao tema da festa.",
    preco: 90,
    precoMin: 65,
    categoria: "Display",
    imageUrl: null,
    destaque: true,
    personalizavel: true,
  },
  {
    slug: "painel-fundo-festa",
    nome: "Painel de Fundo para Festa",
    descricao: "Painel decorativo personalizado para fundo de festa. Perfeito para fotos e para criar o ambiente certo. Vários tamanhos disponíveis.",
    preco: 60,
    precoMin: 45,
    categoria: "Display",
    imageUrl: null,
    destaque: false,
    personalizavel: true,
  },

  // ─── FESTAS TEMÁTICAS ───────────────────────────────────────────
  {
    slug: "decoracao-completa-festa-tematica",
    nome: "Decoração Completa Festa Temática",
    descricao: "Decoração de sala completa para qualquer tema: Minnie, Spiderman, Frozen, Princesas, Safari, Dinossauros e muito mais. Inclui todos os elementos decorativos para transformar o espaço. Orçamento personalizado.",
    preco: 200,
    precoMin: 120,
    categoria: "Festas Temáticas",
    imageUrl: null,
    destaque: true,
    personalizavel: true,
  },

  // ─── WORKSHOP ───────────────────────────────────────────────────
  {
    slug: "workshop-decoracao-festas",
    nome: "Workshop Decoração de Festas",
    descricao: "Aprenda a decorar a sua própria festa! Workshop presencial em Lisboa com a nossa equipa. Aprenda técnicas de decoração com balões, papelaria e mesas de doces. Materiais incluídos.",
    preco: 35,
    precoMin: 35,
    categoria: "Workshop",
    imageUrl: null,
    destaque: true,
    personalizavel: false,
  },
];

async function main() {
  console.log("🎉 A semear base de dados Caeiro & Reis com dados reais do WordPress...");

  // Limpar produtos existentes
  await prisma.itemPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.produto.deleteMany();

  for (const p of produtos) {
    await prisma.produto.create({ data: { ...p, ativo: true } });
  }

  const count = await prisma.produto.count();
  console.log(`✅ ${count} produtos inseridos com dados reais.`);
  console.log("\nProdutos por categoria:");
  const cats = await prisma.produto.groupBy({ by: ["categoria"], _count: { id: true } });
  cats.forEach(c => console.log(`  ${c.categoria}: ${c._count.id}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
