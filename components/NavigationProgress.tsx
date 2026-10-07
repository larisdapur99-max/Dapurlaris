"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationProgress() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [pathname, params]);

  if (!loading) return null;
  return <div className="nav-progress" />;
}
