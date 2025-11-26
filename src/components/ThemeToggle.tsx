import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initialize from localStorage or system preference
    try {
      const stored = window.localStorage.getItem("theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = stored ?? (prefersDark ? "dark" : "light");
      const html = document.documentElement;

      if (initialTheme === "dark") {
        html.classList.add("dark");
        setIsDark(true);
      } else {
        html.classList.remove("dark");
        setIsDark(false);
      }
    } catch (error) {
      console.warn("[ThemeToggle] Failed to read initial theme", error);
    }
  }, []);

  const handleToggle = () => {
    const html = document.documentElement;
    const nextTheme = isDark ? "light" : "dark";

    if (nextTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    setIsDark(!isDark);

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
