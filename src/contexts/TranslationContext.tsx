import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, getTranslation, getLanguageName } from '@/lib/translations';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof import('@/lib/translations').Translations) => string;
  getLanguageName: (code: Language) => string;
  availableLanguages: Language[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('he');
  
  const availableLanguages: Language[] = ['he', 'ar', 'en', 'si', 'ta'];
  
  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('agriculture-connect-language') as Language;
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem('agriculture-connect-language', language);
  }, [language]);
  
  const t = (key: keyof import('@/lib/translations').Translations): string => {
    return getTranslation(language, key);
  };
  
  const value: TranslationContextType = {
    language,
    setLanguage,
    t,
    getLanguageName,
    availableLanguages
  };
  
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
