"use client";
import { useEffect, useState } from "react";

type Toast = { id: number; message: string; type?: "success" | "error" | "info" };

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let id = 0;
    function onToast(e: Event) {
      const detail = (e as CustomEvent).detail as { message: string; type?: Toast["type"] };
      id += 1;
      const toast: Toast = { id, message: detail?.message ?? "", type: detail?.type ?? "info" };
      setToasts(prev => [...prev, toast]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toast.id)), 3000);
    }
    window.addEventListener("toast", onToast as EventListener);
    return () => window.removeEventListener("toast", onToast as EventListener);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {toasts.map(t => (
        <div key={t.id} className={`px-4 py-2 rounded-lg shadow ring-1 ring-black/10 bg-white text-sm ${
          t.type === "success" ? "text-green-700" : t.type === "error" ? "text-red-700" : "text-black/80"
        }`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}


