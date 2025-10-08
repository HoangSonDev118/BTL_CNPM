// src/contexts/DarkModeContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Lấy giá trị từ localStorage khi component mount
    const saved = window.localStorage.getItem("darkMode");
    if (saved !== null) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Lưu vào localStorage và cập nhật class cho html element
    window.localStorage.setItem("darkMode", JSON.stringify(isDarkMode));

    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}