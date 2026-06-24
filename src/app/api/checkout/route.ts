import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { itens } = await req.json();
  if (!itens?.length) return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
  const ids = itens.map((i: any) => i.id);
  const produtos = await prisma.produto.findMany({ where: { id: { in: ids }, ativo: true } });
  if (produtos.length !== ids.length) return NextResponse.json({ error: "Produto inválido" }, { status: 400 });
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "multibanco", "mb_way"] as any,
    line_items: produtos.map(p => ({
      price_data: { currency: "eur", product_data: { name: p.nome, description: `${p.categoria} · Personalizado`, metadata: { slug: p.slug } }, unit_amount: Math.round(p.preco * 100) },
      quantity: 1,
    })),
    mode: "payment",
    success_url: `${base}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/loja`,
    locale: "pt-PT" as any,
    metadata: { produtoIds: ids.join(",") },
    customer_creation: "always",
    phone_number_collection: { enabled: true },
    custom_fields: [{ key: "personalizacao", label: { type: "custom", custom: "Detalhes de personalização (nome, tema, cores)" }, type: "text", optional: true }],
  });
  return NextResponse.json({ url: session.url });
}
