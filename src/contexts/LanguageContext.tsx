"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Direction = "ltr" | "rtl";
type Language = "en" | "fa" | "ar";

interface LanguageContextType {
  direction: Direction;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const LANGUAGE_STORAGE_KEY = "app_language";
const DEFAULT_LANGUAGE: Language = "fa";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      LANGUAGE_STORAGE_KEY
    ) as Language;
    if (savedLanguage && ["en", "fa", "ar"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const direction: Direction =
    language === "fa" || language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ direction, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
