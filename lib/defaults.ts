// Defaults Dapur Laris — fallback saat DB mati + bahan seed (pola PB.GPP)
// Foto: Wikimedia Commons (CC BY-SA) — lihat kredit di footer.
export const DEFAULT_SETTINGS: Record<string, string> = {
  brand: "Dapoer Manis",
  tagline: "KUE BASAH TRADISIONAL",
  hero_desc:
    "Dibuat setiap hari dengan bahan pilihan, untuk menemani momen istimewa anda dan keluarga.",
  hero_image: "/images/foto-hero.jpg",
  logo: "/images/logo-dapoer.svg",
  wa_number: "628581147026",
  wa_text: "Halo Dapoer Manis! Saya ingin pesan kue basah.",
  about_kicker: "TENTANG KAMI",
  about_title: "Rasa Rumahan, Fresh Setiap Hari",
  about_text:
    "Dapoer Manis menghadirkan berbagai pilihan kue basah tradisional dengan bahan pilihan dan rasa yang familiar seperti buatan rumah.",
  about_image: "/images/foto-about.jpg",
  cta_title: "Butuh kue untuk hari ini?",
  cta_desc: "Pesan sekarang dengan mudah melalui WhatsApp.",
  cta_image: "/images/foto-cta.jpg",
  alamat: "Jl. Contoh No. 123, Cirebon",
  telepon: "0858 1147 026",
  email: "padhi39@gmail.com",
  instagram: "https://instagram.com/",
  seo_title: "Dapoer Manis | Kue Basah Tradisional Fresh Setiap Hari - Cirebon",
  seo_description:
    "Dapoer Manis Cirebon — klepon, risoles, lemper, dadar gulung, nagasari, kue lapis, putu ayu, pastel. Paket snack box mulai Rp 15.000. Pesan via WhatsApp.",
  // ---- Teks konten per section (Admin > tiap menu section) ----
  hero_kicker: "KUE BASAH TRADISIONAL — CIREBON —",
  hero_title_a: "Kue Basah\nTradisional dengan",
  hero_title_b: "Rasa Rumahan",
  hero_btn_primary: "Pesan Sekarang",
  hero_btn_secondary: "Lihat Menu",
  hero_badge_a: "Fresh",
  hero_badge_b: "Setiap Hari",
  menu_kicker: "MENU KUE BASAH",
  menu_title: "Pilihan Kue Basah Terbaik",
  menu_subtitle: "Kue tradisional dengan rasa autentik, dibuat fresh setiap hari.",
  paket_kicker: "PILIHAN PAKET",
  paket_title: "Praktis untuk Segala Kebutuhan",
  paket_subtitle: "Tersedia paket kue basah untuk berbagai acara, bisa custom sesuai kebutuhan.",
  trust_1_title: "Bahan Berkualitas",
  trust_1_desc: "Pilihan & higienis",
  trust_2_title: "Dibuat Setiap Hari",
  trust_2_desc: "Fresh dari dapur",
  trust_3_title: "Rasa Rumahan",
  trust_3_desc: "Familiar di lidah",
  trust_4_title: "Cocok Berbagai Acara",
  trust_4_desc: "Rapat hingga hajatan",
  // Menu
  design_menu_kicker_size: "13",
  design_menu_kicker_color: "#C66A3D",
  design_menu_kicker_font: "DM Sans",
  design_menu_title_size: "40",
  design_menu_title_color: "#3A241C",
  design_menu_title_font: "Playfair Display",
  design_menu_pad: "88",
  design_menu_card_bg: "#FFF9F0",
  design_menu_card_radius: "16",
  design_menu_card_shadow: "soft", // none | soft | strong
  design_menu_name_size: "21",
  design_menu_name_color: "#3A241C",
  design_menu_name_font: "Lora",
  design_menu_desc_color: "#75665E",
  design_menu_desc_font: "DM Sans",
  design_menu_price_color: "#C66A3D",
  design_menu_price_font: "DM Sans",
  design_menu_bg_color: "#F7EFE2",
  design_menu_bg_image: "",
  // Paket
  design_paket_kicker_size: "14",
  design_paket_kicker_color: "#B85C38",
  design_paket_kicker_font: "DM Sans",
  design_paket_title_size: "30",
  design_paket_title_color: "#2E1B14",
  design_paket_title_font: "Playfair Display",
  design_paket_pad: "48",
  design_paket_card_bg: "#FFFDF8",
  design_paket_card_radius: "20",
  design_paket_card_shadow: "soft", // none | soft | strong
  design_paket_name_size: "20",
  design_paket_name_color: "#2E1B14",
  design_paket_name_font: "Lora",
  design_paket_desc_color: "#6B5D54",
  design_paket_desc_font: "DM Sans",
  design_paket_price_color: "#55662F",
  design_paket_price_font: "DM Sans",
  design_paket_bg_color: "#F6ECDA",
  design_paket_bg_image: "",
  // Tentang (background saja)
  design_tentang_bg_color: "#FBF5EA",
  design_tentang_bg_image: "",
  // CTA banner
  design_cta_bg_color: "#33411D",
  design_cta_bg_image: "",
  // Footer
  design_footer_bg_color: "#2A361B",
  design_footer_bg_image: "",
  footer_desc: "Kue basah tradisional dengan rasa rumahan, dibuat fresh setiap hari di Cirebon.",
  footer_instagram: "@dapoer.manis",
  // TrustBar
  design_trust_bg_color: "",
  design_trust_bg_image: "",
};

export const DEFAULT_PRODUCTS = [
  { id: 1, nama: "Klepon", deskripsi: "Ketan lembut dengan isi gula merah, dibalur kelapa parut.", harga: 2000, image: "/images/foto-klepon.jpg", kategori: "Kue Basah", urutan: 1, aktif: true },
  { id: 2, nama: "Risoles", deskripsi: "Kulit lembut dengan isian ragout ayam sayur yang gurih.", harga: 3000, image: "/images/foto-risoles.jpg", kategori: "Kue Basah", urutan: 2, aktif: true },
  { id: 3, nama: "Lemper", deskripsi: "Ketan gurih dengan isian ayam berbumbu khas.", harga: 3000, image: "/images/foto-lemper.jpg", kategori: "Kue Basah", urutan: 3, aktif: true },
  { id: 4, nama: "Dadar Gulung", deskripsi: "Kulit pandan lembut dengan isian kelapa manis.", harga: 2500, image: "/images/foto-dadar.jpg", kategori: "Kue Basah", urutan: 4, aktif: true },
  { id: 5, nama: "Nagasari", deskripsi: "Kue lembut dengan pisang pilihan.", harga: 2500, image: "/images/foto-nagasari.jpg", kategori: "Kue Basah", urutan: 5, aktif: true },
  { id: 6, nama: "Kue Lapis", deskripsi: "Tekstur lembut dengan rasa manis yang pas.", harga: 2000, image: "/images/foto-lapis.jpg", kategori: "Kue Basah", urutan: 6, aktif: true },
  { id: 7, nama: "Putu Ayu", deskripsi: "Kue lembut dengan kelapa parut di atasnya.", harga: 2000, image: "/images/foto-putu.jpg", kategori: "Kue Basah", urutan: 7, aktif: true },
  { id: 8, nama: "Pastel", deskripsi: "Kulit renyah dengan isian kentang wortel ayam.", harga: 3000, image: "/images/foto-pastel.jpg", kategori: "Kue Basah", urutan: 8, aktif: true },
];

export const DEFAULT_PACKAGES = [
  { id: 1, nama: "Paket Snack Box", deskripsi: "Cocok untuk rapat, arisan, atau acara kantor.", hargaMulai: 15000, hargaLabel: "Mulai dari Rp 15.000", image: "/images/foto-paket1.jpg", urutan: 1, aktif: true },
  { id: 2, nama: "Paket 20 pcs", deskripsi: "Pilihan ekonomis untuk acara keluarga.", hargaMulai: 50000, hargaLabel: "Mulai dari Rp 50.000", image: "/images/foto-paket2.jpg", kategori: "", urutan: 2, aktif: true },
  { id: 3, nama: "Paket Acara", deskripsi: "Bisa custom sesuai kebutuhan (ulang tahun, pengajian, dll).", hargaMulai: 0, hargaLabel: "Hubungi Kami", image: "/images/foto-paket3.jpg", urutan: 3, aktif: true },
];

export const DEFAULT_GALLERY = [
  { id: 1, image: "/images/foto-hero.jpg", caption: "Aneka jajan pasar", urutan: 1 },
  { id: 2, image: "/images/foto-lapis.jpg", caption: "Kue lapis legit", urutan: 2 },
  { id: 3, image: "/images/foto-dadar.jpg", caption: "Dadar gulung pandan", urutan: 3 },
];

export function waLink(number: string, text: string) {
  const n = (number || "").replace(/[^0-9]/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
}

export function rupiah(n: number) {
  if (!n) return "";
  return "Rp " + n.toLocaleString("id-ID");
}

// Pilihan font yang tersedia di website (ditambah via layout.tsx bila perlu)
export const FONT_OPTIONS = ["Playfair Display", "Lora", "DM Sans", "Poppins"];

export function fontClass(family: string): string {
  if (family === "Lora") return "font-lora";
  if (family === "Poppins") return "font-poppins";
  if (family === "DM Sans") return "font-sans";
  return "font-display";
}

// Ambil nilai desain per section: dx(settings, "design_menu", "pad", "16")
export function dx(s: Record<string, string>, prefix: string, name: string, fb: string): string {
  const v = s[`${prefix}_${name}`];
  return v === undefined || v === null || v === "" ? fb : v;
}

// Style background section dari admin: warna + gambar (gambar menimpa warna)
export function bgStyle(
  s: Record<string, string>,
  prefix: string,
  fallbackColor: string
): Record<string, string> {
  const color = dx(s, prefix, "bg_color", fallbackColor);
  const img = (s[`${prefix}_bg_image`] || "").trim();
  const style: Record<string, string> = { backgroundColor: color };
  if (img) {
    style.backgroundImage = `url("${img}")`;
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
  }
  return style;
}

// Shadow kartu 3D berlapis berdasarkan setting design_card_shadow
export function cardShadows(preset: string): { normal: string; hover: string } {
  if (preset === "none") return { normal: "none", hover: "none" };
  if (preset === "strong")
    return {
      normal: "0 4px 12px rgba(62,39,35,.10), 0 22px 55px rgba(62,39,35,.24)",
      hover: "0 8px 18px rgba(62,39,35,.14), 0 34px 70px rgba(62,39,35,.32)",
    };
  return {
    normal: "0 2px 8px rgba(62,39,35,.06), 0 12px 30px rgba(62,39,35,.12)",
    hover: "0 6px 14px rgba(62,39,35,.10), 0 26px 55px rgba(62,39,35,.22)",
  };
}
