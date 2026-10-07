# Dapur Laris — Kue Basah Tradisional (Cirebon)
# Klon struktur PB.GPP, tema Dapoer Manis, DB Postgres lokal.

## 1. Syarat
# - Node 20+, Postgres 16 service Running
# - DB: buat database `dapurlaris` (via pgAdmin / psql)

## 2. Setup lokal
# npm install
# sesuaikan .env -> DATABASE_URL (password postgres kamu)
# npm run db:push
# npm run db:seed
# npm run dev:3011  -> http://127.0.0.1:3011
# Admin: http://127.0.0.1:3011/admin  (admin / dapurlaris-2026)

## Struktur meniru PB.GPP
# app/page.tsx -> Navbar+Hero+Highlights+Menu+Paket+About+CTA+Footer
# app/admin -> AdminShell ala AdminLTE (Tailwind, sidebar dark)
# app/api -> settings/products/packages/gallery/orders/upload/admin/login
# lib -> db.ts, auth.ts (cookie dapur_admin), site.ts, defaults.ts
# prisma -> SiteSetting, Product, Package, GalleryItem, Order
