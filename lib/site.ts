import { prisma, dbReady } from "./db";
import { DEFAULT_SETTINGS, DEFAULT_PRODUCTS, DEFAULT_PACKAGES, DEFAULT_GALLERY } from "./defaults";

export type SiteData = {
  settings: Record<string, string>;
  products: typeof DEFAULT_PRODUCTS;
  packages: typeof DEFAULT_PACKAGES;
  gallery: typeof DEFAULT_GALLERY;
  dbLive: boolean;
};

export async function getSiteData(): Promise<SiteData> {
  const live = await dbReady().catch(() => false);
  if (!live) {
    return {
      settings: DEFAULT_SETTINGS,
      products: DEFAULT_PRODUCTS,
      packages: DEFAULT_PACKAGES,
      gallery: DEFAULT_GALLERY,
      dbLive: false,
    };
  }
  try {
    const [rows, products, packages, gallery] = await Promise.all([
      prisma.siteSetting.findMany(),
      prisma.product.findMany({ where: { aktif: true }, orderBy: { urutan: "asc" } }),
      prisma.package.findMany({ where: { aktif: true }, orderBy: { urutan: "asc" } }),
      prisma.galleryItem.findMany({ orderBy: { urutan: "asc" } }),
    ]);
    const settings: Record<string, string> = { ...DEFAULT_SETTINGS };
    for (const r of rows) settings[r.key] = r.value;
    return {
      settings,
      products: (products.length ? products : DEFAULT_PRODUCTS) as SiteData["products"],
      packages: (packages.length ? packages : DEFAULT_PACKAGES) as SiteData["packages"],
      gallery: (gallery.length ? gallery : DEFAULT_GALLERY) as SiteData["gallery"],
      dbLive: true,
    };
  } catch {
    return {
      settings: DEFAULT_SETTINGS,
      products: DEFAULT_PRODUCTS,
      packages: DEFAULT_PACKAGES,
      gallery: DEFAULT_GALLERY,
      dbLive: false,
    };
  }
}
