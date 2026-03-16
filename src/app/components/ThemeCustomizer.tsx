import { useState } from "react";
import { Palette, Check, ImageIcon } from "lucide-react";
import { useTheme, ThemeStyle, WallpaperOption } from "../context/ThemeContext";

const BASE = "/Second-Bridge";

const themes: { id: ThemeStyle; name: string; preview: string }[] = [
  { id: "default", name: "Default", preview: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800" },
  { id: "pastel",  name: "Soft Pastel", preview: "bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100" },
  { id: "ocean",   name: "Ocean", preview: "bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-200" },
  { id: "warm",    name: "Warm Earth", preview: "bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100" },
  { id: "vibrant", name: "Vibrant", preview: "bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200" },
];

const wallpapers: { id: WallpaperOption; name: string; desc: string }[] = [
  { id: "none",  name: "None",  desc: "Solid background" },
  { id: "auto",  name: "Auto",  desc: "Matches light/dark mode" },
  { id: "light", name: "Light", desc: "Colourful burst, always" },
  { id: "dark",  name: "Dark",  desc: "Deep swirl, always" },
];

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"colour" | "wallpaper">("colour");
  const { style, setStyle, wallpaper, setWallpaper } = useTheme();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Customise appearance"
      >
        <Palette className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">

            {/* Tabs */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setTab("colour")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs transition-colors ${
                  tab === "colour" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Palette className="w-3.5 h-3.5" /> Colour
              </button>
              <button
                onClick={() => setTab("wallpaper")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs transition-colors ${
                  tab === "wallpaper" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" /> Wallpaper
              </button>
            </div>

            <div className="p-4">
              {/* Colour tab */}
              {tab === "colour" && (
                <div className="space-y-1.5">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setStyle(t.id); setIsOpen(false); }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-md border transition-all ${
                        style === t.id
                          ? "border-foreground/30 bg-muted"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-md shrink-0 ${t.preview}`} />
                      <span className="text-sm text-foreground flex-1 text-left">{t.name}</span>
                      {style === t.id && <Check className="w-4 h-4 text-foreground" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Wallpaper tab */}
              {tab === "wallpaper" && (
                <div className="space-y-1.5">
                  {wallpapers.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => { setWallpaper(w.id); setIsOpen(false); }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-md border transition-all ${
                        wallpaper === w.id
                          ? "border-foreground/30 bg-muted"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {w.id === "none" ? (
                        <div className="w-8 h-8 rounded-md shrink-0 bg-muted border border-border" />
                      ) : w.id === "light" || w.id === "auto" ? (
                        <img src={`${BASE}/wallpaper-light.jpg`} className="w-8 h-8 rounded-md object-cover shrink-0" />
                      ) : (
                        <img src={`${BASE}/wallpaper-dark.jpg`} className="w-8 h-8 rounded-md object-cover shrink-0" />
                      )}
                      <div className="flex-1 text-left">
                        <p className="text-sm text-foreground">{w.name}</p>
                        <p className="text-xs text-muted-foreground">{w.desc}</p>
                      </div>
                      {wallpaper === w.id && <Check className="w-4 h-4 text-foreground" />}
                    </button>
                  ))}
                  <p className="text-xs text-muted-foreground pt-2">
                    Wallpaper blurs the background under panels for readability.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
