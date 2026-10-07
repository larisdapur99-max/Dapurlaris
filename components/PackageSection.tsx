import SmartImage from "./SmartImage";
import { WhatsAppIcon } from "./icons";
import { waLink, cardShadows, dx, bgStyle, fontClass } from "@/lib/defaults";
import type { CSSProperties } from "react";

type P = {
  id: number;
  nama: string;
  deskripsi: string;
  hargaLabel: string;
  image: string;
  hargaMulai: number;
};

export default function PackageSection({
  items,
  waNumber,
  s,
}: {
  items: P[];
  waNumber: string;
  s: Record<string, string>;
}) {
  const pad = Number(dx(s, "design_paket", "pad", "48"));
  const sh = cardShadows(dx(s, "design_paket", "card_shadow", "soft"));
  const cardStyle = {
    background: dx(s, "design_paket", "card_bg", "#FFFDF8"),
    borderRadius: `${Number(dx(s, "design_paket", "card_radius", "20")) + 4}px`,
    "--card-shadow": sh.normal,
    "--card-shadow-hover": sh.hover,
  } as CSSProperties;

  return (
    <section
      id="paket"
      className="border-y border-[#3E2723]/10"
      style={{ paddingTop: pad, paddingBottom: pad, ...bgStyle(s, "design_paket", "#F6ECDA") }}
    >
      <div className="mx-auto w-full px-5 md:px-10 xl:px-[10%]">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className={`${fontClass(dx(s, "design_paket", "kicker_font", "DM Sans"))} tracking-[0.25em] font-extrabold`}
            style={{ fontSize: `${Number(dx(s, "design_paket", "kicker_size", "14"))}px`, color: dx(s, "design_paket", "kicker_color", "#B85C38") }}
          >
            {s.paket_kicker || "PILIHAN PAKET"}
          </p>
          <h2
            className={`${fontClass(dx(s, "design_paket", "title_font", "Playfair Display"))} leading-tight font-bold mt-2`}
            style={{
              fontSize: `${Number(dx(s, "design_paket", "title_size", "30"))}px`,
              color: dx(s, "design_paket", "title_color", "#2E1B14"),
            }}
          >
            {s.paket_title || "Praktis untuk Segala Kebutuhan"}
          </h2>
          <p className="text-[15px] text-[#3E2723]/60 mt-2">
            {s.paket_subtitle || "Tersedia paket kue basah untuk berbagai acara, bisa custom sesuai kebutuhan."}
          </p>
        </div>

        <div className="mt-9 grid md:grid-cols-3 gap-5">
          {items.map((p) => (
            <article key={p.id} className="card-food flex flex-col" style={cardStyle}>
              <div className="overflow-hidden p-3 pb-0">
                <SmartImage
                  src={p.image}
                  alt={p.nama}
                  className="h-52 sm:h-60 w-full object-cover !rounded-[14px]"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3
                  className={`${fontClass(dx(s, "design_paket", "name_font", "Lora"))} font-semibold`}
                  style={{
                    fontSize: `${Number(dx(s, "design_paket", "name_size", "20"))}px`,
                    color: dx(s, "design_paket", "name_color", "#2E1B14"),
                  }}
                >
                  {p.nama}
                </h3>
                <p
                  className={`${fontClass(dx(s, "design_paket", "desc_font", "DM Sans"))} text-sm mt-1.5 leading-relaxed flex-1`}
                  style={{ color: dx(s, "design_paket", "desc_color", "#6B5D54") }}
                >
                  {p.deskripsi}
                </p>
                <p
                  className={`${fontClass(dx(s, "design_paket", "price_font", "DM Sans"))} mt-4 text-lg font-extrabold`}
                  style={{ color: dx(s, "design_paket", "price_color", "#55662F") }}
                >
                  {p.hargaLabel || "Hubungi Kami"}
                </p>
                <a
                  href={waLink(waNumber, `Halo Dapoer Manis! Saya ingin pesan ${p.nama}.`)}
                  target="_blank"
                  className="mt-4 inline-flex items-center justify-center gap-2 h-12 rounded-[10px] bg-[#55662F] text-white text-sm font-bold hover:bg-[#3F5222] transition"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Pesan {p.nama}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
