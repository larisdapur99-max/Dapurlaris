"use client";
import { useState } from "react";
import SmartImage from "./SmartImage";
import { WhatsAppIcon } from "./icons";
import { waLink } from "@/lib/defaults";

const MENUS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Menu", href: "#menu" },
  { label: "Paket", href: "#paket" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar({
  s,
  overlay = false,
  light = false,
}: {
  s: Record<string, string>;
  overlay?: boolean;
  light?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const linkActive = light
    ? "text-white border-b-2 border-white/90 pb-1"
    : "text-[#3E2723] border-b-2 border-[#B85C38] pb-1";
  const linkIdle = light
    ? "text-white/70 hover:text-white transition"
    : "text-[#3E2723]/65 hover:text-[#3E2723] transition";
  return (
    <header
      className={
        overlay
          ? "sticky top-0 z-50 bg-[#FBF5EA] lg:absolute lg:inset-x-0 lg:z-40 lg:bg-transparent"
          : "relative z-20 bg-transparent"
      }
    >
      <div
        className={
          light
            ? "w-full px-6 sm:px-10 lg:px-14 flex items-center justify-between h-[76px]"
            : overlay
              ? "mx-auto w-full px-5 md:px-10 xl:px-[10%] flex items-center justify-between h-[76px]"
              : "mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 flex items-center justify-between h-[76px]"
        }
      >
        <a href="#beranda" className="flex items-center gap-3">
          <SmartImage src={s.logo} alt={s.brand} className="h-12 w-auto object-contain rounded" />
          <div className="leading-tight">
            <div className={`font-display font-bold text-[22px] italic ${light ? "text-white" : ""}`}>
              {s.brand}
            </div>
            <div
              className={`text-[9px] tracking-[0.28em] font-bold ${light ? "text-white/60" : "text-[#6D4C41]"}`}
            >
              {s.tagline}
            </div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          {MENUS.map((m, i) => (
            <a key={m.label} href={m.href} className={i === 0 ? linkActive : linkIdle}>
              {m.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a
            href={waLink(s.wa_number, s.wa_text)}
            target="_blank"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-[10px] bg-[#55662F] text-white text-sm font-bold hover:bg-[#3F5222] transition"
          >
            <WhatsAppIcon className="h-4 w-4" /> Pesan Sekarang
          </a>
        </div>
        <button
          className={`lg:hidden text-2xl h-11 w-11 flex items-center justify-center rounded-full backdrop-blur ${
            light ? "bg-white/15 text-white" : "bg-[#3E2723]/5 lg:bg-white/15 lg:text-white"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="lg:hidden absolute left-4 right-4 top-[76px] z-30 rounded-2xl shadow-xl bg-[#FBF5EA] px-5 py-4 flex flex-col gap-3 text-sm font-bold text-[#3E2723]">
          {MENUS.map((m) => (
            <a key={m.label} href={m.href} onClick={() => setOpen(false)}>
              {m.label}
            </a>
          ))}
          <a
            href={waLink(s.wa_number, s.wa_text)}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 h-11 rounded-[10px] bg-[#55662F] text-white text-center"
          >
            <WhatsAppIcon className="h-4 w-4" /> Pesan Sekarang
          </a>
        </div>
      )}
    </header>
  );
}
