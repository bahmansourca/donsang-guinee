import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin";
const DEFAULT_PASSWORD = "admin123";

export function isAdmin(): boolean {
  const store = cookies();
  return store.get(ADMIN_COOKIE)?.value === "1";
}

export function shouldAllow(password: string | undefined | null): boolean {
  const target = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
  return (password || "").trim() === target;
}

export function loginCookie() {
  cookies().set(ADMIN_COOKIE, "1", { httpOnly: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
}

export function logoutCookie() {
  cookies().delete(ADMIN_COOKIE);
}


