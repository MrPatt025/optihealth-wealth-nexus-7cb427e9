import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useI18n } from '@/contexts/I18nContext';
import { Languages, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'button' | 'compact' | 'icon';
}

export function LanguageSelector({ className, variant = 'button' }: LanguageSelectorProps) {
  const { locale, setLocale } = useI18n();

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: '🇺🇸'
    },
    { 
      code: 'th', 
      name: 'Thai', 
      nativeName: 'ไทย',
      flag: '🇹🇭'
    },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  if (variant === 'icon') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-8 w-8 p-0", className)}
            title="Change language"
          >
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setLocale(language.code as any)}
              className="flex items-center gap-3"
            >
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm">{language.name}</span>
                <span className="text-xs text-muted-foreground">{language.nativeName}</span>
              </div>
              {locale === language.code && (
                <div className="w-2 h-2 bg-primary rounded-full ml-auto" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn("h-8 gap-2", className)}>
            <span className="text-base">{currentLanguage.flag}</span>
            <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setLocale(language.code as any)}
              className="flex items-center gap-3"
            >
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium">{language.name}</span>
                <span className="text-xs text-muted-foreground">{language.nativeName}</span>
              </div>
              {locale === language.code && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Languages className="h-4 w-4 text-muted-foreground" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 min-w-[120px] justify-start">
            <span className="text-base">{currentLanguage.flag}</span>
            <span>{currentLanguage.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setLocale(language.code as any)}
              className="flex items-center gap-3 py-3"
            >
              <span className="text-xl">{language.flag}</span>
              <div className="flex flex-col flex-1">
                <span className="font-medium">{language.name}</span>
                <span className="text-sm text-muted-foreground">{language.nativeName}</span>
              </div>
              {locale === language.code && (
                <div className="w-3 h-3 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}