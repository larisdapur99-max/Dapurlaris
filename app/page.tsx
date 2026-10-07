import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import MenuSection from "@/components/MenuSection";
import PackageSection from "@/components/PackageSection";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getSiteData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getSiteData();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Dapoer Manis",
    description: data.settings.seo_description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cirebon",
      addressCountry: "ID",
    },
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative">
        <Navbar s={data.settings} overlay />
        <Reveal>
          <Hero s={data.settings} />
        </Reveal>
      </div>
      <TrustBar s={data.settings} />
      <Reveal delay={60}>
        <MenuSection items={data.products} waNumber={data.settings.wa_number} s={data.settings} />
      </Reveal>
      <Reveal delay={60}>
        <PackageSection items={data.packages} waNumber={data.settings.wa_number} s={data.settings} />
      </Reveal>
      <Reveal delay={60}>
        <About s={data.settings} />
      </Reveal>
      <Reveal delay={60}>
        <CTA s={data.settings} />
      </Reveal>
      <Footer s={data.settings} />
    </main>
  );
}
