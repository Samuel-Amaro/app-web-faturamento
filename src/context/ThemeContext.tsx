"use client";

import { Theme, ThemeContextType } from "@/types/theme";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const ThemeContext = React.createContext<null | ThemeContextType>(null);

type PropsProviderThemeContext = {
  children: React.ReactNode;
};

export function ThemeContextProvider({ children }: PropsProviderThemeContext) {
  const themeOption =
    /*window.localStorage.getItem("themeOption")*/ getLocalStorage<Theme>(
      "themeOption",
      "light"
    );
  const [theme, setTheme] = useState<Theme>(
    /*themeOption ? (themeOption as Theme) : "light"*/
    themeOption
  );

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    body.dataset.theme = theme;
    //window.localStorage.setItem("themeOption", theme);
    setLocalStorage("themeOption", theme);
  }, [theme]);

  const toggleTheme = useCallback((theme: Theme) => {
    setTheme(theme);
  }, []);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Error ao usar contexto do tema");
  }

  return themeContext;
}
