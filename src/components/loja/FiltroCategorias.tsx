"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
const cats = [
  { v: "", l: "Todos 🎊" }, { v: "Kits de Festa", l: "🎁 Kits de Festa" },
  { v: "Balões", l: "🎈 Balões" }, { v: "Papelaria", l: "✉️ Papelaria" },
  { v: "Display", l: "🌈 Display" }, { v: "Cestas Personalizadas", l: "🧺 Cestas" },
  { v: "Festas Temáticas", l: "🎡 Temáticas" }, { v: "Insufláveis", l: "🎀 Insufláveis" },
  { v: "Workshop", l: "🎨 Workshop" },
];
export function FiltroCategorias() {
  const router = useRouter(); const sp = useSearchParams(); const ativa = sp.get("categoria") ?? "";
  function sel(v: string) { const p = new URLSearchParams(sp.toString()); v ? p.set("categoria", v) : p.delete("categoria"); router.push(`/loja?${p}`); }
  return (
    <div className="flex flex-wrap gap-2">
      {cats.map(c => (
        <button key={c.v} onClick={() => sel(c.v)}
          className={cn("px-4 py-2 rounded-full text-xs font-titulo font-bold transition-all duration-200",
            ativa === c.v ? "bg-rosa text-white shadow-[0_2px_8px_rgba(255,133,162,0.4)]" : "bg-white text-titulo/60 border border-rosa/20 hover:border-rosa hover:text-rosa"
          )}>
          {c.l}
        </button>
      ))}
    </div>
  );
}
