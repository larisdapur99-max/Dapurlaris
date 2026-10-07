"use client";
import { useState } from "react";

const FALLBACK = "/images/kue-klepon.svg";

export default function SmartImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [err, setErr] = useState(false);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={err ? FALLBACK : src || FALLBACK} alt={alt} className={className} onError={() => setErr(true)} loading="lazy" />;
}
