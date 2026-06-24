import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function PaginaSucesso({ searchParams }: { searchParams: Promise<{session_id?: string}> }) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/");
  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (!session || session.payment_status !== "paid") redirect("/");
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-menta-claro rounded-full mb-6">
        <CheckCircle className="w-10 h-10 text-menta" />
      </div>
      <h1 className="font-titulo font-black text-3xl text-titulo mb-3">Pedido confirmado! 🎉</h1>
      <p className="font-corpo text-texto-suave mb-2">Obrigado pelo seu pedido, <strong className="text-titulo">{session.customer_details?.name ?? ""}!</strong></p>
      <p className="font-corpo text-texto-suave mb-8">Entraremos em contacto em breve para confirmar os detalhes de personalização e entrega.</p>
      <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Olá! Acabei de fazer um pedido. Session: ${session_id}`}
        target="_blank" rel="noopener noreferrer" className="btn-whatsapp mr-3">💬 Falar connosco</a>
      <Link href="/loja" className="btn-secondary">Ver mais produtos</Link>
    </div>
  );
}
