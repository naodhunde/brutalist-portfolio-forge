import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const html = document.documentElement;
    const isCurrentlyDark = html.classList.contains("dark");
    const nextTheme = isCurrentlyDark ? "light" : "dark";

    // Log for debugging across devices
    console.log("[ThemeToggle] Toggling theme", { isCurrentlyDark, nextTheme });

    // Optionally update next-themes state, but main source of truth is the html class
    try {
      setTheme(nextTheme);
    } catch (error) {
      console.warn("[ThemeToggle] setTheme failed, falling back to manual toggle only", error);
    }

    // Force class on <html> so it always works (desktop + mobile)
    if (nextTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // Persist preference
    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch (error) {
      console.warn("[ThemeToggle] Failed to persist theme in localStorage", error);
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-md border-2 border-foreground" />
    );
  }
 
  return (
    <button
      onClick={handleToggle}
      className="relative w-10 h-10 rounded-md border-2 border-foreground hover:bg-accent/10 transition-all duration-300 flex items-center justify-center group"
      aria-label="Toggle theme"
    >
      <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
    </button>
  );
};
