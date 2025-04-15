"use client"

import React, { createContext, useContext, useState } from 'react'
import { translations } from './translations'

type Language = 'cn' | 'en'

type LanguageContextType = {
  language: Language
  t: typeof translations[Language]
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('cn')

  const value = {
    language,
    t: translations[language],
    setLanguage,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 