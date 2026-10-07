import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, Lora, DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import NavigationProgress from "@/components/NavigationProgress";
import { getSiteData } from "@/lib/site";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  let title = "Dapoer Manis | Kue Basah Tradisional Fresh Setiap Hari - Cirebon";
  let desc =
    "Klepon, risoles, lemper, dadar gulung, nagasari, kue lapis, putu ayu, pastel. Paket snack box mulai Rp 15.000. Pesan via WhatsApp.";
  let icon = "/images/logo-dapoer.svg";
  try {
    const d = await getSiteData();
    if (d.settings.seo_title) title = d.settings.seo_title;
    if (d.settings.seo_description) desc = d.settings.seo_description;
    if (d.settings.logo) icon = d.settings.logo;
  } catch {
    // fallback
  }
  return {
    title,
    description: desc,
    icons: { icon },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: "Dapoer Manis",
      title,
      description: desc,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${lora.variable} ${dmSans.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FFF8ED] text-[#3E2723]">
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
