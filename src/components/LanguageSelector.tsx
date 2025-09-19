import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Language, getLanguageName } from '@/lib/translations';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = ['he', 'ar', 'en', 'si', 'ta'];

  const getLanguageFlag = (lang: Language): string => {
    const flags: Record<Language, string> = {
      he: '🇮🇱',
      ar: '🇸🇦',
      en: '🇺🇸',
      si: '🇱🇰',
      ta: '🇱🇰'
    };
    return flags[lang];
  };

  const getLanguageDirection = (lang: Language): 'rtl' | 'ltr' => {
    return ['he', 'ar'].includes(lang) ? 'rtl' : 'ltr';
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
    
    // Update document direction and language
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = getLanguageDirection(newLanguage);
    
    // Store language preference
    localStorage.setItem('agriconnect-language', newLanguage);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          className="flex items-center gap-2 bg-white/80 hover:bg-white/90 border border-gray-200 px-3 py-2 text-sm"
        >
          <Globe className="h-4 w-4" />
          <span className="text-lg">{getLanguageFlag(language)}</span>
          <span className="hidden sm:inline text-sm font-medium">
            {getLanguageName(language)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{getLanguageFlag(lang)}</span>
              <span className="font-medium">{getLanguageName(lang)}</span>
            </div>
            {language === lang && (
              <Check className="h-4 w-4 text-emerald-600" />
            )}
          </DropdownMenuItem>
        ))}
        
        <div className="border-t pt-2 mt-2">
          <div className="px-2 py-1">
            <Badge className="text-xs">
              🌍 {languages.length} שפות זמינות
            </Badge>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
