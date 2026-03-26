import { Monitor, Gamepad2, ShipWheel, Cpu } from "lucide-react";

export const THEMES = {
  BASIC: "basic",
  ARCADE: "arcade",
  ANIME: "anime",
  CYBERPUNK: "cyberpunk",
};

export const THEME_OPTIONS = [
  { id: THEMES.BASIC, icon: Monitor, label: "Basic" },
  { id: THEMES.ARCADE, icon: Gamepad2, label: "Arcade" },
  { id: THEMES.ANIME, icon: ShipWheel, label: "Anime" },
  { id: THEMES.CYBERPUNK, icon: Cpu, label: "Cyberpunk" },
];
