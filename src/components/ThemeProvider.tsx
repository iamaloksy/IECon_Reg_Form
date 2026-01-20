import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Remove both classes from html and body
    document.documentElement.classList.remove("light", "dark");
    document.body.classList.remove("light", "dark");
    // Add the new theme class to both
    document.documentElement.classList.add(theme);
    document.body.classList.add(theme);
    // Debug log
    // eslint-disable-next-line no-console
    console.log("Theme set:", theme, document.documentElement.className, document.body.className);
    // Log computed background variable
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--background');
    // eslint-disable-next-line no-console
    console.log('Computed --background:', bg);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
