"use client";
export default function LogoutButton() {
  async function onClick() {
    try {
      await fetch("/admin/session", { method: "DELETE" });
    } finally {
      window.location.href = "/";
    }
  }
  return (
    <button onClick={onClick} className="mt-6 btn" style={{ border: "1px solid rgba(0,0,0,0.1)" }}>
      Se déconnecter
    </button>
  );
}


