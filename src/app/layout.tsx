import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CarrinhoProvider } from "@/components/carrinho/CarrinhoProvider";

export const metadata: Metadata = {
  title: { default: "Caeiro & Reis | Decoração de Festas em Lisboa", template: "%s | Caeiro & Reis" },
  description: "Kits de festa prontos e personalizados, balões, papelaria e decoração criativa para festas em Lisboa. Celebrar não precisa ser complicado!",
  keywords: ["decoração festas", "kits festa", "balões personalizados", "papelaria festa", "aniversário criança", "Lisboa"],
  authors: [{ name: "Caeiro & Reis" }],
  openGraph: { type: "website", locale: "pt_PT", siteName: "Caeiro & Reis", title: "Caeiro & Reis | Decoração de Festas em Lisboa", description: "Kits de festa prontos e personalizados em Lisboa. Celebrar não precisa ser complicado!" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body className="min-h-screen flex flex-col bg-fundo">
        <CarrinhoProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CarrinhoProvider>
      </body>
    </html>
  );
}
