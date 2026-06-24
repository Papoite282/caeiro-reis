import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CarrinhoProvider } from "@/components/carrinho/CarrinhoProvider";

export const metadata: Metadata = {
  title: { default: "Caeiro & Reis | Decoração de Festas em Lisboa", template: "%s | Caeiro & Reis" },
  description: "Kits de festa prontos e personalizados, balões, papelaria e decoração criativa para festas em Lisboa. Celebrar não precisa ser complicado!",
  keywords: ["decoração festas", "kits festa", "balões personalizados", "papelaria festa", "aniversário criança", "Lisboa"],
  authors: [{ name: "Caeiro & Reis" }],
  openGraph: {
    type: "website", locale: "pt_PT", siteName: "Caeiro & Reis",
    title: "Caeiro & Reis | Decoração de Festas em Lisboa",
    description: "Kits de festa prontos e personalizados em Lisboa. Celebrar não precisa ser complicado!",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body className="min-h-screen bg-[#e9edf1]">

        {/* Borders laterais animados */}
        <div className="side-border left"  aria-hidden="true" />
        <div className="side-border right" aria-hidden="true" />

        {/* Mascot estática — canto inferior direito, entre o border e o conteúdo */}
        <div className="mascot-fixed" aria-hidden="true">
          <Image
            src="/mascot.png"
            alt="Mascote Caeiro & Reis"
            width={160}
            height={160}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Wrapper central */}
        <div className="site-wrapper flex flex-col min-h-screen">
          <CarrinhoProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CarrinhoProvider>
        </div>

      </body>
    </html>
  );
}
