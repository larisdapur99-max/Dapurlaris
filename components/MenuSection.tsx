import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { rupiah, waLink, cardShadows, dx, bgStyle, fontClass } from "@/lib/defaults";
import type { CSSProperties } from "react";

type P = { id: number; nama: string; deskripsi: string; harga: number; image: string };

export default function MenuSection({
  items,
  waNumber,
  s,
}: {
  items: P[];
  waNumber: string;
  s: Record<string, string>;
}) {
  const pad = Number(dx(s, "design_menu", "pad", "88"));
  const sh = cardShadows(dx(s, "design_menu", "card_shadow", "soft"));
  const cardStyle = {
    background: dx(s, "design_menu", "card_bg", "#FFF9F0"),
    borderRadius: `${Number(dx(s, "design_menu", "card_radius", "16"))}px`,
    "--card-shadow": sh.normal,
    "--card-shadow-hover": sh.hover,
  } as CSSProperties;

  return (
    <section id="menu" style={{ paddingTop: pad, paddingBottom: pad, ...bgStyle(s, "design_menu", "#F7EFE2") }} className="relative overflow-hidden">
      {/* dekorasi botanical sage sangat samar di tepi */}
      <svg
        className="pointer-events-none absolute -left-16 top-0 h-80 w-80 text-[#7A8B5A]/[0.07]"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden
      >
        <path d="M50 95C25 95 8 75 8 48 8 20 32 5 62 5c-3 30-5 60-28 70 14-5 36-14 41-37" />
        <path d="M50 95c0-28 9-48 32-60" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
      <svg
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 text-[#7A8B5A]/[0.07] rotate-180"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden
      >
        <path d="M50 95C25 95 8 75 8 48 8 20 32 5 62 5c-3 30-5 60-28 70 14-5 36-14 41-37" />
      </svg>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className={`${fontClass(dx(s, "design_menu", "kicker_font", "DM Sans"))} font-semibold tracking-[3px] uppercase`}
              style={{
                fontSize: `${Number(dx(s, "design_menu", "kicker_size", "13"))}px`,
                color: dx(s, "design_menu", "kicker_color", "#C66A3D"),
              }}
            >
              {s.menu_kicker || "MENU KUE BASAH"}
            </p>
            <h2
              className={`${fontClass(dx(s, "design_menu", "title_font", "Playfair Display"))} leading-[1.15] font-semibold mt-2`}
              style={{
                fontSize: `${Number(dx(s, "design_menu", "title_size", "40"))}px`,
                color: dx(s, "design_menu", "title_color", "#3A241C"),
              }}
            >
              {s.menu_title || "Pilihan Kue Basah Terbaik"}
            </h2>
            <p className="text-base mt-2" style={{ color: "#75665E" }}>
              {s.menu_subtitle || "Kue tradisional dengan rasa autentik, dibuat fresh setiap hari."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block h-px w-16 bg-[#C66A3D]/50" />
            <a
              href={waLink(waNumber, "Halo Dapoer Manis! Saya ingin melihat daftar menu lengkap.")}
              target="_blank"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[#FFFDF8] border border-[#C66A3D]/60 text-[13px] font-bold text-[#3A241C] hover:bg-[#C66A3D]/10 transition"
            >
              Lihat Semua Menu <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="mt-10 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 270}>
            <article className="card-food flex flex-col h-full" style={cardStyle}>
              <div className="overflow-hidden rounded-t-[16px]">
                <SmartImage
                  src={p.image}
                  alt={p.nama}
                  className="h-32 sm:h-40 lg:h-[180px] w-full object-cover"
                />
              </div>
              <div className="p-2 sm:p-3 flex flex-col flex-1">
                <h3
                  className={`${fontClass(dx(s, "design_menu", "name_font", "Lora"))} font-semibold leading-snug`}
                  style={{
                    fontSize: `${Number(dx(s, "design_menu", "name_size", "21"))}px`,
                    color: dx(s, "design_menu", "name_color", "#3A241C"),
                  }}
                >
                  {p.nama}
                </h3>
                <p
                  className={`${fontClass(dx(s, "design_menu", "desc_font", "DM Sans"))} text-[13px] sm:text-[14px] mt-0.5 leading-snug flex-1 line-clamp-2`}
                  style={{ color: dx(s, "design_menu", "desc_color", "#75665E") }}
                >
                  {p.deskripsi}
                </p>
                {p.harga > 0 && (
                  <p
                    className={`${fontClass(dx(s, "design_menu", "price_font", "DM Sans"))} text-[15px] font-bold mt-1.5`}
                    style={{ color: dx(s, "design_menu", "price_color", "#C66A3D") }}
                  >
                    {rupiah(p.harga)}
                    <span className="text-xs font-semibold text-[#3E2723]/45"> / pcs</span>
                  </p>
                )}
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
