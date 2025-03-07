"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const { direction, language } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <div className={`${direction === "rtl" ? "rtl" : ""}`}>{children}</div>
  );
}
