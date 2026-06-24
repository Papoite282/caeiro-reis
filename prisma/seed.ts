import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const produtos = [
  // KITS DE FESTA
  { slug: "kit-festa-completo-personalizado", nome: "Kit de Festa Completo Personalizado", descricao: "Kit completo para festa temática: painel de fundo, decoração de mesa, balões e papelaria personalizada com o tema e nome da criança.", preco: 120, precoMin: 80, categoria: "Kits de Festa", destaque: true, personalizavel: true },
  { slug: "kit-festa-basico", nome: "Kit de Festa Básico", descricao: "Kit essencial para festa: centro de mesa, balões temáticos e topper de bolo personalizado.", preco: 55, precoMin: 45, categoria: "Kits de Festa", destaque: false, personalizavel: true },
  { slug: "kit-festa-premium", nome: "Kit de Festa Premium", descricao: "Kit premium com tudo para a festa perfeita: painel XL, mesa completa, arco de balões, papelaria completa e insufláveis temáticos.", preco: 220, precoMin: 180, categoria: "Kits de Festa", destaque: true, personalizavel: true },
  // BALÕES
  { slug: "arco-baloes-personalizado", nome: "Arco de Balões Personalizado", descricao: "Arco de balões decorativo nas cores que quiser, perfeito para entrada ou mesa de festa. Montagem incluída em Lisboa.", preco: 45, precoMin: 35, categoria: "Balões", destaque: true, personalizavel: true },
  { slug: "buque-baloes", nome: "Buquê de Balões", descricao: "Conjunto de balões decorativos com hélio para aniversários e eventos especiais. Personalizado com cores e tema.", preco: 18, precoMin: 15, categoria: "Balões", destaque: false, personalizavel: true },
  { slug: "coluna-baloes", nome: "Coluna de Balões", descricao: "Coluna decorativa de balões para entrada ou fundo de sala. Disponível em qualquer combinação de cores.", preco: 28, precoMin: 22, categoria: "Balões", destaque: false, personalizavel: true },
  // PAPELARIA
  { slug: "convites-personalizados", nome: "Convites Personalizados", descricao: "Convites digitais ou impressos com design exclusivo para o seu evento. Inclui envelope personalizado.", preco: 35, precoMin: 25, categoria: "Papelaria", destaque: true, personalizavel: true },
  { slug: "topper-bolo-personalizado", nome: "Topper de Bolo Personalizado", descricao: "Topper acrílico ou cartão personalizado com nome, idade e tema da festa.", preco: 12, precoMin: 8, categoria: "Papelaria", destaque: false, personalizavel: true },
  { slug: "kit-papelaria-completo", nome: "Kit Papelaria Completo", descricao: "Conjunto completo: convites, tags, rótulos, caixinhas, toppers e bandeirinhas personalizados.", preco: 65, precoMin: 50, categoria: "Papelaria", destaque: true, personalizavel: true },
  { slug: "banner-happy-birthday", nome: "Banner Happy Birthday Personalizado", descricao: "Banner acrílico ou cartão personalizado com o nome da criança. Efeito 3D disponível.", preco: 22, precoMin: 18, categoria: "Papelaria", destaque: false, personalizavel: true },
  // DISPLAY
  { slug: "display-mesa-doces", nome: "Display Mesa de Doces", descricao: "Decoração completa para mesa de doces: andares, displays temáticos e decoração personalizada.", preco: 85, precoMin: 65, categoria: "Display", destaque: true, personalizavel: true },
  { slug: "painel-fundo-festa", nome: "Painel de Fundo para Festa", descricao: "Painel decorativo personalizado para fundo de festa. Disponível em vários tamanhos e materiais.", preco: 55, precoMin: 40, categoria: "Display", destaque: false, personalizavel: true },
  { slug: "numero-gigante-baloes", nome: "Número Gigante em Balões", descricao: "Número decorativo gigante feito em balões para fotos e decoração. Perfeito para aniversários.", preco: 35, precoMin: 28, categoria: "Display", destaque: false, personalizavel: true },
  // CESTAS PERSONALIZADAS
  { slug: "cesta-aniversario-personalizada", nome: "Cesta de Aniversário Personalizada", descricao: "Cesta decorativa personalizada com produtos e decoração temática. Ideal para oferta de aniversário.", preco: 45, precoMin: 35, categoria: "Cestas Personalizadas", destaque: true, personalizavel: true },
  { slug: "cesta-bebe-personalizada", nome: "Cesta de Bebé Personalizada", descricao: "Cesta especial para recém-nascido com produtos selecionados e decoração personalizada.", preco: 55, precoMin: 45, categoria: "Cestas Personalizadas", destaque: false, personalizavel: true },
  // INSUFLÁVEIS
  { slug: "insuflaveis-tematicos", nome: "Insufláveis Temáticos", descricao: "Decoração insuflável temática: arcos, números, personagens e letras. Impactantes e reutilizáveis.", preco: 25, precoMin: 18, categoria: "Insufláveis", destaque: false, personalizavel: false },
  { slug: "baloes-gigantes-metalicos", nome: "Balões Gigantes Metálicos", descricao: "Balões XXL metálicos em forma de números, letras ou figuras. Grande impacto visual.", preco: 15, precoMin: 10, categoria: "Insufláveis", destaque: true, personalizavel: true },
  // FESTAS TEMÁTICAS
  { slug: "decoracao-completa-festa-tematica", nome: "Decoração Completa Festa Temática", descricao: "Decoração de sala completa para qualquer tema: Minnie, Spiderman, Frozen, Princesas, etc. Orçamento personalizado.", preco: 180, precoMin: 120, categoria: "Festas Temáticas", destaque: true, personalizavel: true },
  { slug: "workshop-decoracao-festas", nome: "Workshop Decoração de Festas", descricao: "Aprenda a decorar a sua própria festa! Workshop presencial em Lisboa. Inclui materiais.", preco: 35, precoMin: 35, categoria: "Workshop", destaque: true, personalizavel: false },
];

async function main() {
  console.log("🎉 A semear base de dados Caeiro & Reis...");
  for (const p of produtos) {
    await prisma.produto.upsert({ where: { slug: p.slug }, update: p, create: { ...p, ativo: true } });
  }
  const count = await prisma.produto.count();
  console.log(`✅ ${count} produtos inseridos.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
