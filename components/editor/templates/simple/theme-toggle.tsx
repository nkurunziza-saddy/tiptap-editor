"use client";

// --- UI Primitives ---
import { Button } from "@/components/editor/primitives/button";

// --- Icons ---
import { MoonStarIcon } from "@/components/editor/icons/moon-star-icon";
import { SunIcon } from "@/components/editor/icons/sun-icon";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode, mounted]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  if (!mounted) return null;

  return (
    <Button
      onClick={toggleDarkMode}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      data-style="ghost"
    >
      {isDarkMode ? (
        <MoonStarIcon className="size-4 shrink-0" />
      ) : (
        <SunIcon className="size-4 shrink-0" />
      )}
    </Button>
  );
}
