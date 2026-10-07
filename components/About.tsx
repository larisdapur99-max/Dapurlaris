import SmartImage from "./SmartImage";
import { bgStyle } from "@/lib/defaults";

const BENEFITS = ["Dibuat fresh setiap hari", "Bahan pilihan", "Cocok untuk berbagai acara"];

export default function About({ s }: { s: Record<string, string> }) {
  return (
    <section id="tentang" className="py-16 lg:py-24" style={bgStyle(s, "design_tentang", "#FBF5EA")}>
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative">
          <SmartImage
            src={s.about_image}
            alt="Kue basah tradisional Dapoer Manis"
            className="w-full h-[300px] sm:h-[420px] lg:h-[480px] object-cover rounded-[20px] shadow-[0_18px_44px_rgba(62,39,35,0.16)]"
          />
          <div className="absolute -top-5 -right-3 sm:-right-5 rounded-2xl bg-[#55662F] text-white px-5 py-4 shadow-lg">
            <div className="font-display font-bold text-2xl leading-none">8+</div>
            <div className="text-xs mt-1 opacity-80">Varian kue basah</div>
          </div>
        </div>
        <div className="lg:pl-2">
          <p className="text-[11px] tracking-[0.3em] font-bold text-[#B85C38]">{s.about_kicker}</p>
          <h2 className="font-display text-3xl sm:text-[40px] leading-tight font-bold mt-3">
            {s.about_title}
          </h2>
          <p className="text-[15px] text-[#3E2723]/70 mt-4 leading-relaxed max-w-lg">{s.about_text}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[15px] font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#55662F] text-white text-sm shrink-0">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
