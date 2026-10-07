import SmartImage from "./SmartImage";
import { PinIcon, PhoneIcon, MailIcon, InstagramIcon, WhatsAppIcon, LeafIcon } from "./icons";
import { bgStyle, waLink } from "@/lib/defaults";

const NAVS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Menu", href: "#menu" },
  { label: "Paket", href: "#paket" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export default function Footer({ s }: { s: Record<string, string> }) {
  const hasBgImg = !!((s.design_footer_bg_image || "").trim());
  return (
    <footer id="kontak" className="relative overflow-hidden text-white" style={bgStyle(s, "design_footer", "#2A361B")}>
      {hasBgImg && <div className="absolute inset-0 bg-[#1d2611]/70" />}
      {/* daun dekoratif tepi */}
      <svg className="pointer-events-none absolute -left-16 top-10 h-96 w-96 text-[#C68A4B]/15" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
        <path d="M50 95C25 95 8 75 8 48 8 20 32 5 62 5c-3 30-5 60-28 70 14-5 36-14 41-37" />
      </svg>
      <svg className="pointer-events-none absolute -right-14 -top-10 h-80 w-80 text-[#C68A4B]/15 rotate-[160deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <path d="M50 95C25 95 8 75 8 48 8 20 32 5 62 5c-3 30-5 60-28 70 14-5 36-14 41-37" />
      </svg>

      <div className="relative mx-auto w-full px-5 md:px-10 xl:px-[10%] pt-14 lg:pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_0.7fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <SmartImage src={s.logo} alt={s.brand} className="h-12 w-auto object-contain rounded" />
              <div className="leading-tight">
                <div className="font-display font-bold text-2xl italic text-white">{s.brand}</div>
                <div className="text-[10px] tracking-[0.28em] font-bold text-[#D9A45B]">
                  {s.tagline}
                </div>
              </div>
            </div>
            <p className="mt-5 text-[15px] text-white/70 leading-relaxed max-w-sm">
              {s.footer_desc || "Kue basah tradisional dengan rasa rumahan, dibuat fresh setiap hari di Cirebon."}
            </p>
          </div>

          {/* Kontak */}
          <div className="flex flex-col gap-5">
            {[
              { icon: PinIcon, label: "Alamat", value: s.alamat },
              { icon: PhoneIcon, label: "Telepon / WhatsApp", value: s.telepon, href: `https://wa.me/${s.wa_number}` },
              { icon: MailIcon, label: "Email", value: s.email },
              { icon: InstagramIcon, label: "Instagram", value: s.footer_instagram || "@dapoer.manis", href: s.instagram },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shrink-0">
                  <c.icon className="h-5 w-5 text-white/90" />
                </span>
                <div>
                  <div className="text-[15px] font-bold text-white">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target="_blank" className="text-sm text-white/65 hover:text-white transition">
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-sm text-white/65">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigasi */}
          <div className="md:border-l md:border-white/15 md:pl-10">
            <div className="font-display font-bold text-xl text-white">Navigasi</div>
            <nav className="mt-5 flex flex-col gap-3.5">
              {NAVS.map((n) => (
                <a key={n.label} href={n.href} className="flex items-center gap-2.5 text-[15px] text-white/75 hover:text-white transition">
                  <LeafIcon className="h-4 w-4 text-[#C68A4B]" /> {n.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/55">
            © {new Date().getFullYear()} {s.brand} — {s.tagline}
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[13px] text-white/55 hover:text-white transition">Privacy Policy</a>
            <span className="h-4 w-px bg-white/15" />
            <a href="#" className="text-[13px] text-white/55 hover:text-white transition">Terms & Conditions</a>
            <span className="h-4 w-px bg-white/15" />
            <a href={s.instagram} target="_blank" aria-label="Instagram" className="text-white/70 hover:text-white transition">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={waLink(s.wa_number, s.wa_text)} target="_blank" aria-label="WhatsApp" className="text-white/70 hover:text-white transition">
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] text-white/30">Foto: Wikimedia Commons (CC BY-SA) & Pexels</p>
      </div>
    </footer>
  );
}
