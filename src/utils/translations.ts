import { en } from './translations/en'
import { fa } from './translations/fa'
import { ar } from './translations/ar'

type Translation = typeof en

const translations: Record<string, Translation> = {
  en,
  fa,
  ar
}

export type TranslationKey = keyof typeof en.pages.students.form

export function getTranslation(key: string, language: string): string {
  console.log('Translation request:', { key, language })
  console.log('Available translations:', Object.keys(translations))
  
  const parts = key.split('.')
  let result: unknown = translations[language as keyof typeof translations]
  
  console.log('Initial result:', result)
  
  for (const part of parts) {
    if (result && typeof result === 'object') {
      result = (result as Record<string, unknown>)[part]
      console.log(`After ${part}:`, result)
    } else {
      console.log(`Translation not found for part: ${part}`)
      return key // Return the key if translation is not found
    }
  }
  
  const finalResult = typeof result === 'string' ? result : key
  console.log('Final result:', finalResult)
  return finalResult
}

export function t(key: string, language: string): string {
  return getTranslation(key, language)
} 