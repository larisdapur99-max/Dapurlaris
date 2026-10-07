"use client";
import { useEffect, useState } from "react";
import { FONT_OPTIONS } from "@/lib/defaults";

type AnyObj = Record<string, unknown>;

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((j as { error?: string }).error || `Upload gagal (${res.status})`);
  return (j as { url: string }).url;
}

function UploadInput({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <input className="flex-1 border rounded px-2 py-1.5 text-xs" value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/... atau hasil upload" />
      <label className="cursor-pointer rounded bg-[#343a40] px-3 py-1.5 text-xs font-bold text-white">
        {busy ? "..." : "Upload"}
        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setBusy(true);
          try { onChange(await uploadFile(f)); } catch (err) { alert((err as Error).message); } finally { setBusy(false); }
        }} />
      </label>
    </div>
  );
}

const MENUS = [
  { id: "dashboard", label: "Dashboard", icon: "◧" },
  { id: "hero", label: "Section Hero", icon: "🏠" },
  { id: "menu", label: "Section Menu", icon: "🍰" },
  { id: "paket", label: "Section Paket", icon: "📦" },
  { id: "tentang", label: "Section Tentang", icon: "📖" },
  { id: "kontak", label: "CTA & Kontak", icon: "📞" },
  { id: "kepercayaan", label: "Kepercayaan", icon: "✓" },
  { id: "galeri", label: "Galeri", icon: "🖼" },
  { id: "pesanan", label: "Pesanan", icon: "🧾" },
  { id: "pengaturan", label: "Pengaturan Umum", icon: "⚙" },
];

function TextField({
  k, label, rows = 1, settings, setSettings,
}: {
  k: string; label: string; rows?: number;
  settings: AnyObj; setSettings: (s: AnyObj) => void;
}) {
  return (
    <label className="text-sm block">
      <div className="font-bold mb-1">{label} <span className="font-normal text-slate-400">({k})</span></div>
      <textarea
        className="w-full border rounded px-3 py-2" rows={rows}
        value={String(settings[k] ?? "")}
        onChange={(e) => setSettings({ ...settings, [k]: e.target.value })}
      />
    </label>
  );
}

function DesignBox({
  prefix, title, settings, setSettings,
}: {
  prefix: string; title: string;
  settings: AnyObj; setSettings: (s: AnyObj) => void;
}) {
  const F: [string, string, "number" | "color" | "shadow" | "image" | "font"][] = [
    ["bg_color", "Warna background section", "color"],
    ["bg_image", "Gambar background section (kosongkan = warna saja)", "image"],
    ["kicker_size", "Ukuran font label (px)", "number"],
    ["kicker_color", "Warna label", "color"],
    ["kicker_font", "Jenis font label", "font"],
    ["title_size", "Ukuran font judul (px)", "number"],
    ["title_color", "Warna judul", "color"],
    ["title_font", "Jenis font judul", "font"],
    ["pad", "Padding atas-bawah section (px)", "number"],
    ["card_bg", "Warna background kartu", "color"],
    ["card_radius", "Radius sudut kartu (px)", "number"],
    ["card_shadow", "Shadow kartu", "shadow"],
    ["name_size", "Ukuran font nama (px)", "number"],
    ["name_color", "Warna nama", "color"],
    ["name_font", "Jenis font nama", "font"],
    ["desc_color", "Warna deskripsi", "color"],
    ["desc_font", "Jenis font deskripsi", "font"],
    ["price_color", "Warna harga/label harga", "color"],
    ["price_font", "Jenis font harga", "font"],
  ];
  return (
    <div className="rounded-lg bg-white border p-4 grid gap-3">
      <div className="font-bold">🎨 {title}</div>
      <p className="-mt-2 text-xs text-slate-500">Hanya berlaku untuk section ini. Tersimpan bersama tombol di bawah.</p>
      {F.map(([name, label, type]) => {
        const k = `${prefix}_${name}`;
        return (
          <label key={k} className="text-sm block">
            <div className="font-bold mb-1">{label} <span className="font-normal text-slate-400">({k})</span></div>
            {type === "color" ? (
              <div className="flex items-center gap-2">
                <input type="color" className="h-9 w-12 border rounded cursor-pointer" value={String(settings[k] || "#ffffff")} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} />
                <input className="flex-1 border rounded px-3 py-2" value={String(settings[k] ?? "")} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} placeholder="#..." />
              </div>
            ) : type === "shadow" ? (
              <select className="w-full border rounded px-3 py-2" value={String(settings[k] ?? "soft")} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })}>
                <option value="none">none — tanpa shadow</option>
                <option value="soft">soft — lembut</option>
                <option value="strong">strong — tebal 3D</option>
              </select>
            ) : type === "image" ? (
              <UploadInput value={String(settings[k] ?? "")} onChange={(url) => setSettings({ ...settings, [k]: url })} />
            ) : type === "font" ? (
              <select className="w-full border rounded px-3 py-2" value={String(settings[k] ?? FONT_OPTIONS[0])} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })}>
                {FONT_OPTIONS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-2">
                <input type="number" className="flex-1 border rounded px-3 py-2" value={String(settings[k] ?? "")} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} />
                <span className="text-slate-400 text-xs">px</span>
              </div>
            )}
          </label>
        );
      })}
    </div>
  );
}

export default function AdminShell() {
  const [menu, setMenu] = useState("dashboard");
  const [settings, setSettings] = useState<AnyObj>({});
  const [products, setProducts] = useState<AnyObj[]>([]);
  const [packages, setPackages] = useState<AnyObj[]>([]);
  const [gallery, setGallery] = useState<AnyObj[]>([]);
  const [orders, setOrders] = useState<AnyObj[]>([]);
  const [dbLive, setDbLive] = useState(false);
  const [msg, setMsg] = useState("");
  const [sideOpen, setSideOpen] = useState(false);

  async function load() {
    const [s, pr, pa, g, o] = await Promise.all([
      fetch("/api/settings").then((r) => r.json()).catch(() => ({})),
      fetch("/api/products").then((r) => r.json()).catch(() => ({})),
      fetch("/api/packages").then((r) => r.json()).catch(() => ({})),
      fetch("/api/gallery").then((r) => r.json()).catch(() => ({})),
      fetch("/api/orders").then((r) => r.json()).catch(() => ({})),
    ]);
    setSettings(s.settings || {});
    setProducts(pr.items || []);
    setPackages(pa.items || []);
    setGallery(g.items || []);
    setOrders(o.items || []);
    setDbLive(!!s.dbLive);
  }

  useEffect(() => { load(); }, []);

  function toast(t: string) {
    setMsg(t);
    setTimeout(() => setMsg(""), 2500);
  }

  async function crud(base: string, method: string, body?: AnyObj, id?: number) {
    const res = await fetch(id ? `${base}/${id}` : base, {
      method, headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) { const j = await res.json().catch(() => ({})); alert(j.error || "Gagal"); return; }
    toast(method === "DELETE" ? "Terhapus ✓" : method === "POST" ? "Ditambahkan ✓" : "Tersimpan ✓");
    load();
  }

  async function saveSettings() {
    const res = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    const j = await res.json().catch(() => ({}));
    toast(res.ok ? "Pengaturan tersimpan ✓" : j.error || "Gagal");
  }

  const stats = [
    { label: "Produk Aktif", value: products.length, color: "bg-[#4A6B2A]", sub: "8 menu kue basah" },
    { label: "Paket Aktif", value: packages.length, color: "bg-[#C68A4B]", sub: "snack box & acara" },
    { label: "Pesanan Masuk", value: orders.length, color: "bg-[#6D4C41]", sub: `${orders.filter((o) => o.status === "BARU").length} baru` },
    { label: "Database", value: dbLive ? "LIVE" : "OFF", color: dbLive ? "bg-emerald-600" : "bg-red-500", sub: dbLive ? "Postgres lokal konek" : "cek .env / Postgres" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 flex">
      {/* Sidebar ala AdminLTE */}
      <aside className={`fixed lg:static z-40 w-64 shrink-0 bg-[#343a40] text-white min-h-screen flex flex-col transition-transform ${sideOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="px-4 py-4 border-b border-white/10">
          <div className="font-bold text-xl">Dapur<span className="text-[#9DBE7D]">Laris</span></div>
          <div className="text-[11px] text-white/50">Administrator Panel</div>
        </div>
        <nav className="p-3 flex flex-col gap-1 text-sm">
          {MENUS.map((m) => (
            <button key={m.id} onClick={() => { setMenu(m.id); setSideOpen(false); }}
              className={`flex items-center gap-3 rounded px-3 py-2.5 text-left ${menu === m.id ? "bg-[#4A6B2A] text-white" : "text-white/70 hover:bg-white/10"}`}>
              <span className="w-5 text-center">{m.icon}</span> {m.label}
              {m.id === "pesanan" && orders.filter((o) => o.status === "BARU").length > 0 && (
                <span className="ml-auto rounded-full bg-red-500 px-2 text-[11px] font-bold">{orders.filter((o) => o.status === "BARU").length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="mt-auto p-3 flex flex-col gap-2">
          <a href="/" target="_blank" className="rounded bg-white/10 px-3 py-2 text-sm text-center hover:bg-white/20">Lihat Website →</a>
          <button onClick={async () => { await fetch("/api/admin/login", { method: "DELETE" }); location.href = "/admin/login"; }} className="rounded bg-red-600/80 px-3 py-2 text-sm font-bold">Keluar</button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <div className="bg-white border-b px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button className="lg:hidden text-xl" onClick={() => setSideOpen(!sideOpen)}>☰</button>
          <div className="font-bold capitalize">{MENUS.find((m) => m.id === menu)?.label}</div>
          <div className="ml-auto text-xs flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${dbLive ? "bg-emerald-500" : "bg-red-500"}`} />
            {dbLive ? "DB Live" : "DB Offline"}
            <button onClick={load} className="rounded border px-2 py-1 text-xs">Refresh</button>
          </div>
        </div>

        <div className="p-4 lg:p-6 max-w-6xl w-full mx-auto">
          {!dbLive && (
            <div className="mb-4 rounded border border-amber-300 bg-amber-50 p-3 text-sm">
              <b>Database offline.</b> Pastikan service <b>postgresql-x64-16</b> Running, database <b>dapurlaris</b> sudah dibuat, dan <b>DATABASE_URL</b> di <b>.env</b> benar. Lalu jalankan <code>npm run db:push</code> + <code>npm run db:seed</code>.
            </div>
          )}

          {menu === "dashboard" && (
            <div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className={`${s.color} text-white rounded-lg p-4 shadow`}>
                    <div className="text-3xl font-black">{String(s.value)}</div>
                    <div className="font-bold text-sm">{s.label}</div>
                    <div className="text-xs opacity-80">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-white border p-4">
                <div className="font-bold mb-2">Pesanan terbaru</div>
                {orders.length === 0 ? <div className="text-sm text-slate-500">Belum ada pesanan.</div> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="text-left text-slate-500 border-b"><th className="py-2">Nama</th><th>Paket</th><th>Status</th></tr></thead>
                      <tbody>{orders.slice(0, 5).map((o: AnyObj) => (
                        <tr key={String(o.id)} className="border-b"><td className="py-2">{String(o.nama)}</td><td>{String(o.paket)}</td><td>{String(o.status)}</td></tr>
                      ))}</tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {menu === "hero" && (
            <div className="rounded-lg bg-white border p-4 grid gap-3">
              <div className="font-bold">Section Hero (bagian atas website)</div>
              <TextField k="hero_kicker" label="Label pil atas" settings={settings} setSettings={setSettings} />
              <TextField k="hero_title_a" label="Headline baris gelap (Enter = baris baru)" rows={3} settings={settings} setSettings={setSettings} />
              <TextField k="hero_title_b" label="Headline baris aksen terracotta" settings={settings} setSettings={setSettings} />
              <TextField k="hero_desc" label="Kalimat deskripsi hero" rows={2} settings={settings} setSettings={setSettings} />
              <TextField k="hero_btn_primary" label="Teks tombol utama" settings={settings} setSettings={setSettings} />
              <TextField k="hero_btn_secondary" label="Teks tombol kedua" settings={settings} setSettings={setSettings} />
              <TextField k="hero_badge_a" label="Badge baris 1" settings={settings} setSettings={setSettings} />
              <TextField k="hero_badge_b" label="Badge baris 2" settings={settings} setSettings={setSettings} />
              <div className="text-sm">
                <div className="font-bold mb-1">Foto hero (tampah)</div>
                <UploadInput value={String(settings.hero_image ?? "")} onChange={(url) => setSettings({ ...settings, hero_image: url })} />
              </div>
              <button onClick={saveSettings} className="rounded bg-[#4A6B2A] py-2.5 text-sm font-bold text-white">Simpan Section Hero</button>
            </div>
          )}

          {menu === "menu" && (
            <div className="grid gap-4">
            <div className="rounded-lg bg-white border p-4 grid gap-3">
              <div className="font-bold">Konten Section Menu</div>
              <TextField k="menu_kicker" label="Label" settings={settings} setSettings={setSettings} />
              <TextField k="menu_title" label="Judul" settings={settings} setSettings={setSettings} />
              <TextField k="menu_subtitle" label="Subjudul" settings={settings} setSettings={setSettings} />
              <button onClick={saveSettings} className="rounded bg-[#4A6B2A] py-2 text-sm font-bold text-white">Simpan Konten Section Menu</button>
            </div>
            <div className="rounded-lg bg-white border">
              <div className="p-4 border-b flex items-center gap-2">
                <div className="font-bold">Data Produk / Menu</div>
                <button onClick={() => crud("/api/products", "POST", { nama: "Kue Baru", deskripsi: "", harga: 0, image: "/images/kue-klepon.svg", kategori: "Kue Basah", urutan: products.length + 1 })} className="ml-auto rounded bg-[#4A6B2A] px-3 py-1.5 text-xs font-bold text-white">+ Tambah</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-slate-500 border-b"><th className="p-3">Nama</th><th className="p-3">Harga</th><th className="p-3">Gambar</th><th className="p-3">Aksi</th></tr></thead>
                  <tbody>
                    {products.map((it: AnyObj, i: number) => (
                      <tr key={String(it.id)} className="border-b align-top">
                        <td className="p-3 min-w-52">
                          <input className="border rounded px-2 py-1 w-full font-bold" value={String(it.nama ?? "")} onChange={(e) => { const v = [...products]; v[i] = { ...v[i], nama: e.target.value }; setProducts(v); }} />
                          <textarea className="border rounded px-2 py-1 w-full mt-1 text-xs" rows={2} value={String(it.deskripsi ?? "")} onChange={(e) => { const v = [...products]; v[i] = { ...v[i], deskripsi: e.target.value }; setProducts(v); }} />
                        </td>
                        <td className="p-3"><input type="number" className="border rounded px-2 py-1 w-28" value={Number(it.harga ?? 0)} onChange={(e) => { const v = [...products]; v[i] = { ...v[i], harga: Number(e.target.value) }; setProducts(v); }} /></td>
                        <td className="p-3 min-w-64"><UploadInput value={String(it.image ?? "")} onChange={(url) => { const v = [...products]; v[i] = { ...v[i], image: url }; setProducts(v); }} /></td>
                        <td className="p-3 whitespace-nowrap">
                          <button onClick={() => crud("/api/products", "PUT", it, Number(it.id))} className="rounded bg-[#343a40] text-white px-3 py-1 text-xs font-bold mr-1">Simpan</button>
                          <button onClick={() => { if (confirm("Hapus?")) crud("/api/products", "DELETE", undefined, Number(it.id)); }} className="rounded bg-red-100 text-red-700 px-3 py-1 text-xs font-bold">Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <DesignBox prefix="design_menu" title="Desain Section Menu" settings={settings} setSettings={setSettings} />
            <button onClick={saveSettings} className="rounded-lg bg-[#4A6B2A] py-2.5 text-sm font-bold text-white">Simpan Desain Section Menu</button>
            </div>
          )}

          {menu === "paket" && (
            <div className="grid gap-4">
            <div className="rounded-lg bg-white border p-4 grid gap-3">
              <div className="font-bold">Konten Section Paket</div>
              <TextField k="paket_kicker" label="Label" settings={settings} setSettings={setSettings} />
              <TextField k="paket_title" label="Judul" settings={settings} setSettings={setSettings} />
              <TextField k="paket_subtitle" label="Subjudul" settings={settings} setSettings={setSettings} />
              <button onClick={saveSettings} className="rounded bg-[#4A6B2A] py-2 text-sm font-bold text-white">Simpan Konten Section Paket</button>
            </div>
            <div className="rounded-lg bg-white border">
              <div className="p-4 border-b flex items-center gap-2">
                <div className="font-bold">Data Paket</div>
                <button onClick={() => crud("/api/packages", "POST", { nama: "Paket Baru", deskripsi: "", hargaMulai: 0, hargaLabel: "Hubungi Kami", image: "/images/paket-snackbox.svg", urutan: packages.length + 1 })} className="ml-auto rounded bg-[#4A6B2A] px-3 py-1.5 text-xs font-bold text-white">+ Tambah</button>
              </div>
              <div className="grid gap-3 p-4">
                {packages.map((it: AnyObj, i: number) => (
                  <div key={String(it.id)} className="rounded border p-3 grid gap-2 text-sm">
                    <div className="grid sm:grid-cols-3 gap-2">
                      <input className="border rounded px-2 py-1 font-bold" value={String(it.nama ?? "")} onChange={(e) => { const v = [...packages]; v[i] = { ...v[i], nama: e.target.value }; setPackages(v); }} />
                      <input className="border rounded px-2 py-1" value={String(it.hargaLabel ?? "")} onChange={(e) => { const v = [...packages]; v[i] = { ...v[i], hargaLabel: e.target.value }; setPackages(v); }} placeholder="Label harga" />
                      <input type="number" className="border rounded px-2 py-1" value={Number(it.hargaMulai ?? 0)} onChange={(e) => { const v = [...packages]; v[i] = { ...v[i], hargaMulai: Number(e.target.value) }; setPackages(v); }} placeholder="Harga mulai (0=custom)" />
                    </div>
                    <textarea className="border rounded px-2 py-1" rows={2} value={String(it.deskripsi ?? "")} onChange={(e) => { const v = [...packages]; v[i] = { ...v[i], deskripsi: e.target.value }; setPackages(v); }} />
                    <UploadInput value={String(it.image ?? "")} onChange={(url) => { const v = [...packages]; v[i] = { ...v[i], image: url }; setPackages(v); }} />
                    <div className="flex gap-2">
                      <button onClick={() => crud("/api/packages", "PUT", it, Number(it.id))} className="rounded bg-[#343a40] text-white px-3 py-1 text-xs font-bold">Simpan</button>
                      <button onClick={() => { if (confirm("Hapus?")) crud("/api/packages", "DELETE", undefined, Number(it.id)); }} className="rounded bg-red-100 text-red-700 px-3 py-1 text-xs font-bold">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DesignBox prefix="design_paket" title="Desain Section Paket" settings={settings} setSettings={setSettings} />
            <button onClick={saveSettings} className="rounded-lg bg-[#4A6B2A] py-2.5 text-sm font-bold text-white">Simpan Desain Section Paket</button>
            </div>
          )}

          {menu === "tentang" && (
            <div className="rounded-lg bg-white border p-4 grid gap-3">
              <div className="font-bold">Section Tentang Kami</div>
              <TextField k="about_kicker" label="Label kecil" settings={settings} setSettings={setSettings} />
              <TextField k="about_title" label="Judul" settings={settings} setSettings={setSettings} />
              <TextField k="about_text" label="Deskripsi" rows={3} settings={settings} setSettings={setSettings} />
              <div className="text-sm">
                <div className="font-bold mb-1">Foto tentang</div>
                <UploadInput value={String(settings.about_image ?? "")} onChange={(url) => setSettings({ ...settings, about_image: url })} />
              </div>
              <div className="font-bold mt-2 border-t pt-3">🎨 Background Section Tentang</div>
              <label className="text-sm block">
                <div className="font-bold mb-1">Warna background <span className="font-normal text-slate-400">(design_tentang_bg_color)</span></div>
                <div className="flex items-center gap-2">
                  <input type="color" className="h-9 w-12 border rounded cursor-pointer" value={String(settings.design_tentang_bg_color || "#FBF5EA")} onChange={(e) => setSettings({ ...settings, design_tentang_bg_color: e.target.value })} />
                  <input className="flex-1 border rounded px-3 py-2" value={String(settings.design_tentang_bg_color ?? "")} onChange={(e) => setSettings({ ...settings, design_tentang_bg_color: e.target.value })} />
                </div>
              </label>
              <div className="text-sm">
                <div className="font-bold mb-1">Gambar background <span className="font-normal text-slate-400">(design_tentang_bg_image)</span></div>
                <UploadInput value={String(settings.design_tentang_bg_image ?? "")} onChange={(url) => setSettings({ ...settings, design_tentang_bg_image: url })} />
              </div>
              <button onClick={saveSettings} className="rounded bg-[#4A6B2A] py-2.5 text-sm font-bold text-white">Simpan Section Tentang</button>
            </div>
          )}

          {menu === "kontak" && (
            <div className="rounded-lg bg-white border p-4 grid gap-3">
              <div className="font-bold">Banner CTA + Kontak (bagian bawah website)</div>
              <TextField k="cta_title" label="Judul banner" settings={settings} setSettings={setSettings} />
              <TextField k="cta_desc" label="Deskripsi banner" settings={settings} setSettings={setSettings} />
              <div className="text-sm">
                <div className="font-bold mb-1">Foto banner</div>
                <UploadInput value={String(settings.cta_image ?? "")} onChange={(url) => setSettings({ ...settings, cta_image: url })} />
              </div>
              <div className="font-bold mt-2 border-t pt-3">🎨 Background Banner CTA</div>
              <label className="text-sm block">
                <div className="font-bold mb-1">Warna background <span className="font-normal text-slate-400">(design_cta_bg_color)</span></div>
                <div className="flex items-center gap-2">
                  <input type="color" className="h-9 w-12 border rounded cursor-pointer" value={String(settings.design_cta_bg_color || "#33411D")} onChange={(e) => setSettings({ ...settings, design_cta_bg_color: e.target.value })} />
                  <input className="flex-1 border rounded px-3 py-2" value={String(settings.design_cta_bg_color ?? "")} onChange={(e) => setSettings({ ...settings, design_cta_bg_color: e.target.value })} />
                </div>
              </label>
              <div className="text-sm">
                <div className="font-bold mb-1">Gambar background <span className="font-normal text-slate-400">(design_cta_bg_image)</span></div>
                <UploadInput value={String(settings.design_cta_bg_image ?? "")} onChange={(url) => setSettings({ ...settings, design_cta_bg_image: url })} />
              </div>
              <TextField k="alamat" label="Alamat" settings={settings} setSettings={setSettings} />
              <TextField k="telepon" label="Telepon tampil" settings={settings} setSettings={setSettings} />
              <TextField k="email" label="Email" settings={settings} setSettings={setSettings} />
              <TextField k="instagram" label="Instagram URL" settings={settings} setSettings={setSettings} />
              <button onClick={saveSettings} className="rounded bg-[#4A6B2A] py-2.5 text-sm font-bold text-white">Simpan CTA & Kontak</button>
            </div>
          )}

          {menu === "kepercayaan" && (
            <div className="rounded-lg bg-white border p-4 grid gap-3">
              <div className="font-bold">Strip Kepercayaan (di bawah hero)</div>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="grid sm:grid-cols-2 gap-3 border-b pb-3">
                  <TextField k={`trust_${n}_title`} label={`Item ${n} — judul`} settings={settings} setSettings={setSettings} />
                  <TextField k={`trust_${n}_desc`} label={`Item ${n} — deskripsi`} settings={settings} setSettings={setSettings} />
                </div>
              ))}
              <div className="font-bold mt-2 border-t pt-3">🎨 Background Strip</div>
              <label className="text-sm block">
                <div className="font-bold mb-1">Warna background (kosongkan = transparan) <span className="font-normal text-slate-400">(design_trust_bg_color)</span></div>
                <div className="flex items-center gap-2">
                  <input type="color" className="h-9 w-12 border rounded cursor-pointer" value={String(settings.design_trust_bg_color || "#F5EAD3")} onChange={(e) => setSettings({ ...settings, design_trust_bg_color: e.target.value })} />
                  <input className="flex-1 border rounded px-3 py-2" value={String(settings.design_trust_bg_color ?? "")} onChange={(e) => setSettings({ ...settings, design_trust_bg_color: e.target.value })} placeholder="kosongkan = transparan" />
                </div>
              </label>
              <div className="text-sm">
                <div className="font-bold mb-1">Gambar background <span className="font-normal text-slate-400">(design_trust_bg_image)</span></div>
                <UploadInput value={String(settings.design_trust_bg_image ?? "")} onChange={(url) => setSettings({ ...settings, design_trust_bg_image: url })} />
              </div>
              <button onClick={saveSettings} className="rounded bg-[#4A6B2A] py-2.5 text-sm font-bold text-white">Simpan Strip Kepercayaan</button>
            </div>
          )}

          {menu === "galeri" && (
            <div className="rounded-lg bg-white border p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="font-bold">Galeri</div>
                <button onClick={() => crud("/api/gallery", "POST", { image: "/images/kue-klepon.svg", caption: "Foto baru", urutan: gallery.length + 1 })} className="ml-auto rounded bg-[#4A6B2A] px-3 py-1.5 text-xs font-bold text-white">+ Tambah</button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {gallery.map((it: AnyObj) => (
                  <div key={String(it.id)} className="rounded border p-3 text-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={String(it.image)} alt="" className="h-32 w-full object-cover rounded bg-slate-100" />
                    <div className="mt-2"><UploadInput value={String(it.image ?? "")} onChange={async (url) => { await crud("/api/gallery", "PUT", { ...it, image: url }, Number(it.id)); }} /></div>
                    <input className="mt-2 w-full border rounded px-2 py-1" defaultValue={String(it.caption ?? "")} placeholder="Caption" id={`cap-${it.id}`} />
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => { const el = document.getElementById(`cap-${it.id}`) as HTMLInputElement; crud("/api/gallery", "PUT", { caption: el.value }, Number(it.id)); }} className="rounded bg-[#343a40] text-white px-3 py-1 text-xs font-bold">Simpan</button>
                      <button onClick={() => { if (confirm("Hapus?")) crud("/api/gallery", "DELETE", undefined, Number(it.id)); }} className="rounded bg-red-100 text-red-700 px-3 py-1 text-xs font-bold">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {menu === "pesanan" && (
            <div className="rounded-lg bg-white border">
              <div className="p-4 border-b font-bold">Data Pesanan</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-slate-500 border-b"><th className="p-3">Tanggal</th><th className="p-3">Nama/WA</th><th className="p-3">Paket</th><th className="p-3">Status</th><th className="p-3">Aksi</th></tr></thead>
                  <tbody>
                    {orders.map((o: AnyObj) => (
                      <tr key={String(o.id)} className="border-b">
                        <td className="p-3 text-xs">{new Date(String(o.createdAt)).toLocaleString("id-ID")}</td>
                        <td className="p-3"><b>{String(o.nama)}</b><br /><span className="text-xs">{String(o.wa)} {o.jumlah ? `· ${String(o.jumlah)} pcs` : ""}</span></td>
                        <td className="p-3 text-xs">{String(o.paket)}<br />{String(o.catatan || "")}</td>
                        <td className="p-3">
                          <select className="border rounded px-2 py-1 text-xs" value={String(o.status)} onChange={async (e) => { await crud("/api/orders", "PUT", { status: e.target.value }, Number(o.id)); }}>
                            <option>BARU</option><option>DIPROSES</option><option>SELESAI</option><option>BATAL</option>
                          </select>
                        </td>
                        <td className="p-3"><button onClick={() => { if (confirm("Hapus?")) crud("/api/orders", "DELETE", undefined, Number(o.id)); }} className="rounded bg-red-100 text-red-700 px-3 py-1 text-xs font-bold">Hapus</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && <div className="p-4 text-sm text-slate-500">Belum ada pesanan.</div>}
              </div>
            </div>
          )}

          {menu === "pengaturan" && (
            <div className="rounded-lg bg-white border p-4 grid gap-3">
              <div className="font-bold">Pengaturan Umum (berlaku global)</div>
              <TextField k="brand" label="Nama Brand" settings={settings} setSettings={setSettings} />
              <TextField k="tagline" label="Tagline" settings={settings} setSettings={setSettings} />
              <div className="text-sm">
                <div className="font-bold mb-1">Logo</div>
                <UploadInput value={String(settings.logo ?? "")} onChange={(url) => setSettings({ ...settings, logo: url })} />
              </div>
              <TextField k="wa_number" label="Nomor WA (628...)" settings={settings} setSettings={setSettings} />
              <TextField k="wa_text" label="Pesan WA otomatis" settings={settings} setSettings={setSettings} />
              <TextField k="seo_title" label="Judul SEO" settings={settings} setSettings={setSettings} />
              <TextField k="seo_description" label="Deskripsi SEO" rows={2} settings={settings} setSettings={setSettings} />
              <div className="font-bold mt-2 border-t pt-3">📝 Teks Footer</div>
              <TextField k="footer_desc" label="Deskripsi brand di footer" rows={2} settings={settings} setSettings={setSettings} />
              <TextField k="footer_instagram" label="Username Instagram tampil" settings={settings} setSettings={setSettings} />
              <div className="font-bold mt-2 border-t pt-3">🎨 Background Footer</div>
              <label className="text-sm block">
                <div className="font-bold mb-1">Warna background <span className="font-normal text-slate-400">(design_footer_bg_color)</span></div>
                <div className="flex items-center gap-2">
                  <input type="color" className="h-9 w-12 border rounded cursor-pointer" value={String(settings.design_footer_bg_color || "#F6ECDA")} onChange={(e) => setSettings({ ...settings, design_footer_bg_color: e.target.value })} />
                  <input className="flex-1 border rounded px-3 py-2" value={String(settings.design_footer_bg_color ?? "")} onChange={(e) => setSettings({ ...settings, design_footer_bg_color: e.target.value })} />
                </div>
              </label>
              <div className="text-sm">
                <div className="font-bold mb-1">Gambar background <span className="font-normal text-slate-400">(design_footer_bg_image)</span></div>
                <UploadInput value={String(settings.design_footer_bg_image ?? "")} onChange={(url) => setSettings({ ...settings, design_footer_bg_image: url })} />
              </div>
              <button onClick={saveSettings} className="rounded bg-[#4A6B2A] py-2.5 text-sm font-bold text-white">Simpan Pengaturan Umum</button>
            </div>
          )}
        </div>
      </div>

      {msg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-[#343a40] px-6 py-3 text-sm font-bold text-white shadow-xl">{msg}</div>
      )}
    </div>
  );
}
