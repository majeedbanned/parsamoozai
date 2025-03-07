import en from '@/locales/en.json'
import fa from '@/locales/fa.json'
import ar from '@/locales/ar.json'

const translations = {
  en,
  fa,
  ar
}

export type TranslationKey = keyof typeof en.menu.items | keyof typeof en.menu.categories

export function getTranslation(key: string, language: string): string {
  const parts = key.split('.')
  let result: any = translations[language as keyof typeof translations]
  
  for (const part of parts) {
    if (result && typeof result === 'object') {
      result = result[part]
    } else {
      return key // Return the key if translation is not found
    }
  }
  
  return result || key
}

export function t(key: string, language: string): string {
  return getTranslation(key, language)
} 