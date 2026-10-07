import { LeafIcon, ChefIcon, HeartIcon, GiftIcon } from "./icons";
import { bgStyle } from "@/lib/defaults";

const ITEMS = [
  { icon: LeafIcon, tk: "trust_1_title", dk: "trust_1_desc", title: "Bahan Berkualitas", desc: "Pilihan & higienis" },
  { icon: ChefIcon, tk: "trust_2_title", dk: "trust_2_desc", title: "Dibuat Setiap Hari", desc: "Fresh dari dapur" },
  { icon: HeartIcon, tk: "trust_3_title", dk: "trust_3_desc", title: "Rasa Rumahan", desc: "Familiar di lidah" },
  { icon: GiftIcon, tk: "trust_4_title", dk: "trust_4_desc", title: "Cocok Berbagai Acara", desc: "Rapat hingga hajatan" },
];

export default function TrustBar({ s }: { s: Record<string, string> }) {
  return (
    <section className="mx-auto w-full px-5 md:px-10 xl:px-[10%] pb-6">
      <div className="rounded-2xl px-5 sm:px-8 py-4" style={bgStyle(s, "design_trust", "")}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 py-2">
        {ITEMS.map((t, i) => (
          <div
            key={t.tk}
            className={`flex lg:flex-row flex-col items-center lg:items-center text-center lg:text-left gap-2 lg:gap-3 ${i > 0 ? "lg:border-l lg:border-[#3E2723]/10 lg:pl-6" : ""}`}
          >
            <t.icon className="h-8 w-8 text-[#B85C38] shrink-0" />
            <div className="leading-tight">
              <div className="text-[13px] sm:text-sm font-bold text-[#3E2723]">{s[t.tk] || t.title}</div>
              <div className="text-[11px] sm:text-xs text-[#3E2723]/55 mt-0.5">{s[t.dk] || t.desc}</div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
