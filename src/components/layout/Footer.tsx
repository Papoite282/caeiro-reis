import Link from "next/link";
export function Footer() {
  return (
    <footer className="bg-titulo text-white/70 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-titulo font-black text-xl text-white mb-1">Caeiro<span className="text-rosa">&</span>Reis</p>
            <p className="text-xs tracking-widest uppercase text-white/30 mb-3">Decoração de Festas</p>
            <p className="text-sm font-corpo text-white/50 leading-relaxed">Decoração de festas criativa e personalizada em Lisboa. Celebrar não precisa ser complicado! 🎉</p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-white/30 mb-4 font-titulo font-bold">Loja</p>
            <ul className="space-y-2">
              {["Kits de Festa","Balões","Papelaria","Display","Festas Temáticas","Workshop"].map(c => (
                <li key={c}><Link href={`/loja?categoria=${encodeURIComponent(c)}`} className="text-sm font-corpo text-white/50 hover:text-rosa transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-white/30 mb-4 font-titulo font-bold">Contacto</p>
            <ul className="space-y-2 text-sm font-corpo text-white/50">
              <li>📍 Estrada A-da-Maia nº33A, Lisboa</li>
              <li><a href="https://wa.me/351999999999" target="_blank" className="hover:text-[#25D366] transition-colors">💬 WhatsApp</a></li>
              <li><a href="https://www.instagram.com/caeiro_reis_decoracaodefestas/" target="_blank" className="hover:text-rosa transition-colors">📸 Instagram</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61580984458470" target="_blank" className="hover:text-azul transition-colors">👤 Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-corpo text-white/25">
          <p>© {new Date().getFullYear()} Caeiro & Reis · Lisboa, Portugal</p>
          <p>Site desenvolvido por <a href="https://github.com/Papoite282" className="hover:text-white/60 transition-colors">Eduardo Carvalho</a></p>
        </div>
      </div>
    </footer>
  );
}
