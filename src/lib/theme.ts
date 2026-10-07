"use client";

const THEME_CHANGE_EVENT = "casanostra-theme-change";

export function isDarkTheme(): boolean {
  return document.documentElement.classList.contains("dark");
}

export function subscribeToTheme(callback: () => void): () => void {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function toggleTheme(): void {
  const dark = !isDarkTheme();
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}
