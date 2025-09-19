"use client";
import { useRouter, usePathname } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <button onClick={() => router.back()} className="fixed top-20 left-5 z-40 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white ring-1 ring-black/10 shadow">
      ← Retour
    </button>
  );
}


