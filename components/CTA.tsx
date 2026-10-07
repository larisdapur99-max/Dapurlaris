import SmartImage from "./SmartImage";
import { WhatsAppIcon } from "./icons";
import { waLink, bgStyle } from "@/lib/defaults";

export default function CTA({ s }: { s: Record<string, string> }) {
  const hasBgImg = !!((s.design_cta_bg_image || "").trim());
  return (
    <section className="px-5 md:px-10 lg:px-16 pb-16 lg:pb-20">
      <div
        className="relative overflow-hidden mx-auto max-w-[1280px] rounded-[24px] text-white"
        style={bgStyle(s, "design_cta", "#33411D")}
      >
        {hasBgImg && <div className="absolute inset-0 bg-[#1d2611]/60" />}
        {/* subtle botanical line art */}
        <svg
          className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 text-white/[0.07]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M50 95C25 95 8 75 8 48 8 20 32 5 62 5c-3 30-5 60-28 70 14-5 36-14 41-37" />
          <path d="M50 95c0-28 9-48 32-60" />
        </svg>
        <svg
          className="pointer-events-none absolute -left-20 -bottom-24 h-96 w-96 text-white/[0.05]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M50 95C25 95 8 75 8 48 8 20 32 5 62 5c-3 30-5 60-28 70 14-5 36-14 41-37" />
        </svg>

        <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center p-7 sm:p-10 lg:p-14">
          <SmartImage
            src={s.cta_image}
            alt="Klepon gula merah Dapoer Manis"
            className="w-full h-64 sm:h-80 lg:h-[380px] object-cover rounded-[20px] shadow-[0_18px_44px_rgba(0,0,0,0.35)]"
          />
          <div>
            <h2 className="font-display text-3xl sm:text-[40px] leading-tight font-bold">{s.cta_title}</h2>
            <p className="text-[15px] text-white/70 mt-3">{s.cta_desc}</p>
            <a
              href={waLink(s.wa_number, s.wa_text)}
              target="_blank"
              className="mt-7 inline-flex items-center gap-2 h-12 px-7 rounded-[10px] bg-[#FBF5EA] text-[#33411D] text-[15px] font-bold hover:bg-white transition"
            >
              <WhatsAppIcon className="h-5 w-5" /> Pesan via WhatsApp
            </a>
            <p className="mt-4 text-[13px] text-white/55">
              Fast respon setiap hari · bisa custom untuk acara
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
