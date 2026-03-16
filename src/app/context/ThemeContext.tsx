import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeMode = "light" | "dark";
export type ThemeStyle = "default" | "pastel" | "vibrant" | "warm" | "ocean";
export type WallpaperOption = "none" | "auto" | "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  style: ThemeStyle;
  wallpaper: WallpaperOption;
  toggleMode: () => void;
  setStyle: (style: ThemeStyle) => void;
  setWallpaper: (w: WallpaperOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const BASE = "/Second-Bridge";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() =>
    (localStorage.getItem("theme-mode") as ThemeMode) || "light"
  );
  const [style, setStyleState] = useState<ThemeStyle>(() =>
    (localStorage.getItem("theme-style") as ThemeStyle) || "default"
  );
  const [wallpaper, setWallpaperState] = useState<WallpaperOption>(() =>
    (localStorage.getItem("theme-wallpaper") as WallpaperOption) || "none"
  );

  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
    // Update favicon
    const fav = document.getElementById("favicon") as HTMLLinkElement | null;
    if (fav) fav.href = mode === "dark" ? `${BASE}/logo-dark.png` : `${BASE}/logo-light.png`;
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("theme-style", style);
    document.documentElement.setAttribute("data-theme", style);
  }, [style]);

  useEffect(() => {
    localStorage.setItem("theme-wallpaper", wallpaper);
    const html = document.documentElement;
    const getUrl = () => {
      if (wallpaper === "none") return "";
      if (wallpaper === "auto") return mode === "dark"
        ? `${BASE}/wallpaper-dark.jpg` : `${BASE}/wallpaper-light.jpg`;
      if (wallpaper === "light") return `${BASE}/wallpaper-light.jpg`;
      if (wallpaper === "dark") return `${BASE}/wallpaper-dark.jpg`;
      return "";
    };
    const url = getUrl();
    if (url) {
      html.style.backgroundImage = `url(${url})`;
      html.setAttribute("data-wallpaper", "active");
    } else {
      html.style.backgroundImage = "";
      html.removeAttribute("data-wallpaper");
    }
  }, [wallpaper, mode]);

  return (
    <ThemeContext.Provider value={{
      mode, style, wallpaper,
      toggleMode: () => setMode(p => p === "light" ? "dark" : "light"),
      setStyle: setStyleState,
      setWallpaper: setWallpaperState,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
