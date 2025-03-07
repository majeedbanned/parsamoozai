"use client";

import React, { createContext, useContext, useState } from "react";

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

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
