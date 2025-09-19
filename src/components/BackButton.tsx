"use client";
import { useRouter, usePathname } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <button onClick={() => router.back()} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white ring-1 ring-black/10 shadow text-sm">
      ← Retour
    </button>
  );
}


