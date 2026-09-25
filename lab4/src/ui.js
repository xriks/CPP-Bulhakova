import { useEffect } from "react";

export const wrap = "mx-auto max-w-5xl px-4 sm:px-8";
export const card = "rounded-3xl bg-bone p-5 sm:p-7";
export const label = "text-[11px] text-wine/80";
export const h2 = "text-xl font-bold text-wine sm:text-2xl";
export const input = "w-full rounded-xl border border-khaki bg-white/60 px-3 py-2 text-xs outline-none focus:border-wine";
const btn = "cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";
export const dark = `${btn} bg-olive text-bone hover:bg-olive/85`;
export const wine = `${btn} bg-wine text-bone hover:bg-wine/85`;
export const ghost = `${btn} border border-wine text-wine hover:bg-wine/10`;

// Закриття модального вікна / кошика клавішею Esc
export const useEsc = (fn) =>
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && fn();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fn]);
