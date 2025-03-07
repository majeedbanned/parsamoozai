"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "English" },
    { code: "fa", label: "فارسی" },
    { code: "ar", label: "العربية" },
  ] as const;

  const nextLanguage =
    languages[
      (languages.findIndex((l) => l.code === language) + 1) % languages.length
    ].code;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(nextLanguage)}
      className="h-8 w-8"
      title={`Switch to ${
        languages.find((l) => l.code === nextLanguage)?.label
      }`}
    >
      <Languages className="h-4 w-4" />
    </Button>
  );
}
