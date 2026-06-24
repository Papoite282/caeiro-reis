import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Mapeamento de categorias WC → categorias da loja
const CAT_MAP: Record<string, string> = {
  'Unique':'Artigos de Festa','XiZ':'Artigos de Festa','Decorata Party':'Artigos de Festa',
  'PartyDeco':'Artigos de Festa','Just Add Love':'Artigos de Festa','Amscan':'Artigos de Festa',
  'Anagram':'Balões','Qualatex':'Balões','North Star Ballons':'Balões','Mas Roses':'Balões',
  'Brinquedos':'Brinquedos','EDUCA':'Brinquedos','Famosa':'Brinquedos',
  'Bubble World':'Artigos de Festa','Sempertex':'Balões','Gabby Dollhouse':'Brinquedos',
  "Gabby's Dollhouse":'Brinquedos','Just4Party':'Artigos de Festa','Procos':'Artigos de Festa',
  'Godan':'Artigos de Festa','Sem categoria':'Artigos de Festa',
};

// Produtos e serviços próprios da Caeiro & Reis
const kits = [
  { slug:"kit-festa-na-caixa", nome:"Kit Festa Na Caixa", descricao:"Ideal para quem quer uma comemoração prática e bonita em casa. BASIC: pratos, guardanapos, copos, talheres, vela, balões. MEDIUM: + toalha temática, balões temáticos, bandeirolas, topper. PREMIUM: + mini display, balão personalizado, topper de bolo.", preco:45, precoMin:25, categoria:"Kits de Festa", imageUrl:"/images/kits/kit-festa-caixa1.jpg", destaque:true, personalizavel:true },
  { slug:"kit-festa-na-creche", nome:"Kit Festa Na Creche", descricao:"A solução prática para enviar tudo pronto para a creche. Inclui pratos, copos, talheres, topper de bolo, mini arranjos e lembranças.", preco:60, precoMin:40, categoria:"Kits de Festa", imageUrl:"/images/kits/kit-festa-creche1.jpg", destaque:true, personalizavel:true },
  { slug:"kit-festa-na-mesa", nome:"Kit Festa Na Mesa", descricao:"Para quem quer aquele cantinho especial para cantar os parabéns. Kit completo com decoração temática e todos os acessórios.", preco:55, precoMin:35, categoria:"Kits de Festa", imageUrl:"/images/kits/kit-festa-mesa1.jpg", destaque:true, personalizavel:true },
  { slug:"kit-pequeno-almoco", nome:"Kit Pequeno Almoço", descricao:"Um kit festivo para o pequeno-almoço de aniversário. Pratos, copos, guardanapos, talheres e balões temáticos.", preco:50, precoMin:30, categoria:"Kits de Festa", imageUrl:null, destaque:false, personalizavel:true },
  { slug:"arco-baloes-personalizado", nome:"Arco de Balões Personalizado", descricao:"Arco de balões nas cores que quiser. Montagem incluída em Lisboa.", preco:55, precoMin:35, categoria:"Balões", imageUrl:null, destaque:true, personalizavel:true },
  { slug:"convites-personalizados", nome:"Convites Personalizados", descricao:"Convites digitais ou impressos com design exclusivo.", preco:35, precoMin:20, categoria:"Papelaria", imageUrl:null, destaque:true, personalizavel:true },
  { slug:"kit-papelaria-completo", nome:"Kit Papelaria Completo", descricao:"Convites, tags, rótulos, caixinhas, toppers e bandeirolas personalizados.", preco:75, precoMin:55, categoria:"Papelaria", imageUrl:null, destaque:true, personalizavel:true },
  { slug:"display-mesa-doces", nome:"Display Mesa de Doces", descricao:"Decoração completa para mesa de doces com andares e displays temáticos.", preco:90, precoMin:65, categoria:"Display", imageUrl:null, destaque:true, personalizavel:true },
  { slug:"decoracao-completa-festa-tematica", nome:"Decoração Completa Festa Temática", descricao:"Decoração de sala para qualquer tema: Minnie, Spiderman, Frozen, Princesas e muito mais.", preco:200, precoMin:120, categoria:"Festas Temáticas", imageUrl:null, destaque:true, personalizavel:true },
  { slug:"workshop-decoracao", nome:"Workshop Decoração de Festas", descricao:"Aprenda a decorar a sua própria festa! Workshop presencial em Lisboa. Materiais incluídos.", preco:35, precoMin:35, categoria:"Workshop", imageUrl:null, destaque:true, personalizavel:false },
];

async function main() {
  console.log("🎉 Caeiro & Reis — Seed com dados reais WooCommerce...\n");

  // Reset
  await prisma.itemPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.produto.deleteMany();

  // 1. Inserir kits próprios
  for (const k of kits) {
    await prisma.produto.create({ data: { ...k, ativo: true } });
  }
  console.log(`✅ ${kits.length} kits/serviços próprios inseridos`);

  // 2. Importar produtos WooCommerce do JSON
  const jsonPath = path.join(__dirname, 'wc_products.json');
  if (!fs.existsSync(jsonPath)) {
    console.log("⚠️  wc_products.json não encontrado — skipping WC products");
    return;
  }
  const wcProds = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  let imported = 0;
  let semPreco = 0;
  for (const p of wcProds) {
    if (!p.slug || !p.nome) continue;
    const cat = CAT_MAP[p.categoria] || 'Artigos de Festa';
    try {
      await prisma.produto.upsert({
        where: { slug: p.slug },
        update: { nome: p.nome, categoria: cat, imageUrl: p.imageUrl || null },
        create: {
          slug: p.slug, nome: p.nome, descricao: '',
          preco: 0, precoMin: null, categoria: cat,
          imageUrl: p.imageUrl || null,
          destaque: false, ativo: true, personalizavel: false
        }
      });
      if (!p.imageUrl) semPreco++;
      imported++;
    } catch {}
  }

  const total = await prisma.produto.count();
  const comImg = await prisma.produto.count({ where: { imageUrl: { not: null } } });
  console.log(`✅ ${imported} produtos WC importados`);
  console.log(`📦 Total: ${total} produtos | ${comImg} com imagem`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
