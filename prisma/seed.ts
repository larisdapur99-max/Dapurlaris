import "dotenv/config";
import { prisma } from "../lib/db";
import { DEFAULT_SETTINGS, DEFAULT_PRODUCTS, DEFAULT_PACKAGES, DEFAULT_GALLERY } from "../lib/defaults";

async function main() {
  // Settings: hanya tambah key yang belum ada — JANGAN timpa kustom admin
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  for (const p of DEFAULT_PRODUCTS) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: { nama: p.nama, deskripsi: p.deskripsi, harga: p.harga, image: p.image, kategori: p.kategori, urutan: p.urutan, aktif: true },
    });
  }
  for (const p of DEFAULT_PACKAGES) {
    await prisma.package.upsert({
      where: { id: p.id },
      update: {},
      create: { nama: p.nama, deskripsi: p.deskripsi, hargaMulai: p.hargaMulai, hargaLabel: p.hargaLabel, image: p.image, urutan: p.urutan, aktif: true },
    });
  }
  for (const g of DEFAULT_GALLERY) {
    await prisma.galleryItem.upsert({
      where: { id: g.id },
      update: {},
      create: { image: g.image, caption: g.caption, urutan: g.urutan },
    });
  }
  console.log("Seed OK - Dapur Laris");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
