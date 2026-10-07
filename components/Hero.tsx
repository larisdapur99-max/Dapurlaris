import { WhatsAppIcon, LeafIcon } from "./icons";
import SmartImage from "./SmartImage";
import { waLink } from "@/lib/defaults";
import Link from "next/link";

export default function Hero({ s }: { s: Record<string, string> }) {
  return (
    <section id="beranda" className="relative overflow-hidden">
      {/* FOTO mobile: bingkai rounded di bawah navbar solid */}
      <div className="lg:hidden relative mx-5 mt-3 h-[340px] sm:h-[440px]">
        <SmartImage
          src={s.hero_image}
          alt="Tampah kue basah tradisional"
          className="absolute inset-0 h-full w-full object-cover rounded-[20px] shadow-[0_16px_40px_rgba(62,39,35,0.2)]"
        />
        <div className="absolute top-4 right-4 z-10 -rotate-3">
          <div className="bg-[#FFFDF6] px-6 py-3 shadow-[0_12px_30px_rgba(62,39,35,0.18)] [border-radius:58%_42%_55%_45%/48%_55%_45%_52%]">
            <div className="flex items-center gap-1.5 font-display italic font-bold text-[#B85C38] text-xl leading-tight text-center">
              <span>
                {s.hero_badge_a || "Fresh"}
                <br />
                {s.hero_badge_b || "Setiap Hari"}
              </span>
              <LeafIcon className="h-6 w-6 -mt-3" />
            </div>
          </div>
        </div>
      </div>

      {/* FOTO desktop: full-bleed kanan + atas, blend natural */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[52%]">
        <SmartImage
          src={s.hero_image}
          alt="Tampah kue basah tradisional"
          className="h-full w-full object-cover [mask-image:linear-gradient(to_right,transparent_0,black_32%),linear-gradient(to_bottom,transparent_0,black_12%),linear-gradient(to_top,transparent_0,black_92%)] [mask-composite:intersect] [-webkit-mask-composite:source-in] [-webkit-mask-image:linear-gradient(to_right,transparent_0,black_32%),linear-gradient(to_bottom,transparent_0,black_12%),linear-gradient(to_top,transparent_0,black_92%)]"
        />
      </div>

      {/* bayangan daun samar di tepi kiri */}
      <svg
        className="pointer-events-none absolute -left-14 top-40 h-72 w-72 text-[#55662F]/10"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden
      >
        <path d="M50 95C25 95 8 75 8 48 8 20 32 5 62 5c-3 30-5 60-28 70 14-5 36-14 41-37" />
      </svg>

      <div className="relative z-10 mx-auto w-full px-5 md:px-10 xl:px-[10%] pt-6 lg:pt-[150px] pb-10 lg:pb-14">
        <div className="max-w-xl">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#B85C38]">
            {s.hero_kicker || "KUE BASAH TRADISIONAL — CIREBON —"}
          </p>
          <h1 className="font-display font-bold text-[#2E1B14] text-[40px] sm:text-6xl xl:text-[64px] leading-[1.06] mt-4 whitespace-pre-line">
            {s.hero_title_a || "Kue Basah\nTradisional dengan"}
            <br />
            <span className="text-[#B85C38]">{s.hero_title_b || "Rasa Rumahan"}</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#3E2723]/70">
            {s.hero_desc}
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={waLink(s.wa_number, s.wa_text)}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 h-[50px] px-7 rounded-full bg-[#3F5222] text-white text-[15px] font-bold hover:bg-[#33411D] transition shadow-[0_10px_24px_rgba(63,82,34,0.35)] w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" /> {s.hero_btn_primary || "Pesan Sekarang"}
            </a>
            <Link
              href="#menu"
              className="inline-flex items-center justify-center h-[50px] px-7 rounded-full bg-[#FFFDF8] text-[#3E2723] text-[15px] font-bold border border-[#3E2723]/25 hover:border-[#3E2723] transition w-full sm:w-auto"
            >
              {s.hero_btn_secondary || "Lihat Menu"}
            </Link>
          </div>
        </div>

        {/* badge kuas */}
        <div className="hidden lg:block absolute z-20 left-[42%] top-[150px] -rotate-3">
          <div className="bg-[#FFFDF6] px-9 py-4 shadow-[0_12px_30px_rgba(62,39,35,0.18)] [border-radius:58%_42%_55%_45%/48%_55%_45%_52%]">
            <div className="flex items-center gap-1.5 font-display italic font-bold text-[#B85C38] text-2xl leading-tight text-center">
              <span>
                {s.hero_badge_a || "Fresh"}
                <br />
                {s.hero_badge_b || "Setiap Hari"}
              </span>
              <LeafIcon className="h-6 w-6 -mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
