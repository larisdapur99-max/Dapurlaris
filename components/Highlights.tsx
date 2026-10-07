import { LeafIcon, ChefIcon, HeartIcon } from "./icons";

const ITEMS = [
  { icon: LeafIcon, title: "Fresh", desc: "Setiap Hari" },
  { icon: ChefIcon, title: "Bahan", desc: "Berkualitas" },
  { icon: HeartIcon, title: "Cocok untuk", desc: "Berbagai Acara" },
];

export default function Highlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-8">
      <div className="flex flex-wrap gap-8">
        {ITEMS.map((it) => (
          <div key={it.title} className="flex items-center gap-3">
            <it.icon className="h-8 w-8 text-[#6D4C41]" />
            <div className="text-[13px] leading-tight">
              <div className="font-bold">{it.title}</div>
              <div className="text-[#3E2723]/70">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
