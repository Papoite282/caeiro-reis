import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

const catMap: Record<string,string> = {
  'Unique':'Artigos de Festa','XiZ':'Artigos de Festa','Decorata Party':'Artigos de Festa',
  'PartyDeco':'Artigos de Festa','Just Add Love':'Artigos de Festa','Amscan':'Artigos de Festa',
  'Anagram':'Balões','Qualatex':'Balões','North Star Ballons':'Balões','Mas Roses':'Balões',
  'Brinquedos':'Brinquedos','EDUCA':'Brinquedos','Famosa':'Brinquedos','Sem categoria':'Artigos de Festa',
  'Bubble World':'Artigos de Festa'
};

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") return NextResponse.json({ error: "Dev only" }, { status: 403 });

  const { produtos } = await req.json();
  let created = 0;

  for (const p of produtos) {
    const cat = catMap[p.cats?.[0]] || catMap[p.categoria] || 'Artigos de Festa';
    const slug = (p.slug || '').replace(/-wp$/, '');
    if (!slug) continue;

    try {
      await prisma.produto.upsert({
        where: { slug },
        update: { nome: p.nome, preco: parseFloat(p.preco)||0, categoria: cat, imageUrl: p.img || p.imageUrl || null },
        create: {
          slug, nome: p.nome, descricao: '', preco: parseFloat(p.preco)||0,
          precoMin: null, categoria: cat, imageUrl: p.img || p.imageUrl || null,
          destaque: false, ativo: true, personalizavel: false
        }
      });
      created++;
    } catch {}
  }

  return NextResponse.json({ ok: true, created });
}
