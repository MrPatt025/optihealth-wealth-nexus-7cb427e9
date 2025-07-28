import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'en' | 'th';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
}

// Translation keys and values
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.dashboard': 'Dashboard',
    'nav.plugins': 'Plugins',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'OptiHealth-Wealth Nexus',
    'hero.subtitle': 'Optimize Your Health & Wealth with AI-Powered Intelligence',
    'hero.description': 'Comprehensive platform that seamlessly integrates health monitoring and wealth management through advanced analytics and personalized insights.',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'Learn More',
    
    // Features
    'features.title': 'Powerful Features',
    'features.subtitle': 'Everything you need to optimize your health and wealth',
    'features.health.title': 'Health Optimization',
    'features.health.description': 'Advanced health monitoring with AI-powered insights and personalized recommendations.',
    'features.wealth.title': 'Wealth Management',
    'features.wealth.description': 'Intelligent financial planning with real-time market analysis and investment strategies.',
    'features.analytics.title': 'Advanced Analytics',
    'features.analytics.description': 'Deep insights through machine learning and predictive modeling for better decisions.',
    'features.security.title': 'Enterprise Security',
    'features.security.description': 'Bank-grade security with encryption and compliance standards.',
    
    // Dashboard
    'dashboard.title': 'Your Personal Dashboard',
    'dashboard.health.title': 'Health Overview',
    'dashboard.wealth.title': 'Wealth Overview',
    'dashboard.insights.title': 'AI Insights',
    'dashboard.goals.title': 'Goals Progress',
    
    // Plugins
    'plugins.title': 'Plugin Marketplace',
    'plugins.subtitle': 'Extend your OptiHealth-Wealth experience with powerful plugins',
    'plugins.install': 'Install',
    'plugins.installed': 'Installed',
    'plugins.settings': 'Settings',
    'plugins.featured': 'Featured',
    'plugins.all': 'All Plugins',
    'plugins.search.placeholder': 'Search plugins...',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.close': 'Close',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.continue': 'Continue',
    
    // Time
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.thisWeek': 'This Week',
    'time.thisMonth': 'This Month',
    'time.thisYear': 'This Year',
    
    // Units
    'units.currency': '$',
    'units.percentage': '%',
    'units.steps': 'steps',
    'units.calories': 'cal',
    'units.minutes': 'min',
    'units.hours': 'hrs',
  },
  
  th: {
    // Navigation
    'nav.home': 'หน้าแรก',
    'nav.features': 'คุณสมบัติ',
    'nav.dashboard': 'แดชบอร์ด',
    'nav.plugins': 'ปลั๊กอิน',
    'nav.about': 'เกี่ยวกับ',
    'nav.contact': 'ติดต่อ',
    
    // Hero Section
    'hero.title': 'ระบบเชื่อมโยงสุขภาพและทรัพย์สิน',
    'hero.subtitle': 'เพิ่มประสิทธิภาพสุขภาพและความมั่งคั่งด้วย AI',
    'hero.description': 'แพลตฟอร์มที่ครอบคลุมที่ผสานการติดตามสุขภาพและการจัดการทรัพย์สินผ่านการวิเคราะห์ขั้นสูงและข้อมูลเชิงลึกเฉพาะบุคคล',
    'hero.cta.primary': 'เริ่มต้นใช้งาน',
    'hero.cta.secondary': 'เรียนรู้เพิ่มเติม',
    
    // Features
    'features.title': 'คุณสมบัติที่ทรงพลัง',
    'features.subtitle': 'ทุกสิ่งที่คุณต้องการเพื่อเพิ่มประสิทธิภาพสุขภาพและความมั่งคั่ง',
    'features.health.title': 'การเพิ่มประสิทธิภาพสุขภาพ',
    'features.health.description': 'การติดตามสุขภาพขั้นสูงด้วยข้อมูลเชิงลึกจาก AI และคำแนะนำเฉพาะบุคคล',
    'features.wealth.title': 'การจัดการทรัพย์สิน',
    'features.wealth.description': 'การวางแผนทางการเงินอัจฉริยะด้วยการวิเคราะห์ตลาดแบบเรียลไทม์และกลยุทธ์การลงทุน',
    'features.analytics.title': 'การวิเคราะห์ขั้นสูง',
    'features.analytics.description': 'ข้อมูลเชิงลึกผ่านการเรียนรู้ของเครื่องและการสร้างแบบจำลองเชิงทำนายเพื่อการตัดสินใจที่ดีขึ้น',
    'features.security.title': 'ความปลอดภัยระดับองค์กร',
    'features.security.description': 'ความปลอดภัยระดับธนาคารด้วยการเข้ารหัสและมาตรฐานการปฏิบัติตาม',
    
    // Dashboard
    'dashboard.title': 'แดชบอร์ดส่วนตัวของคุณ',
    'dashboard.health.title': 'ภาพรวมสุขภาพ',
    'dashboard.wealth.title': 'ภาพรวมทรัพย์สิน',
    'dashboard.insights.title': 'ข้อมูลเชิงลึก AI',
    'dashboard.goals.title': 'ความคืบหน้าเป้าหมาย',
    
    // Plugins
    'plugins.title': 'ตลาดปลั๊กอิน',
    'plugins.subtitle': 'ขยายประสบการณ์ OptiHealth-Wealth ของคุณด้วยปลั๊กอินที่ทรงพลัง',
    'plugins.install': 'ติดตั้ง',
    'plugins.installed': 'ติดตั้งแล้ว',
    'plugins.settings': 'การตั้งค่า',
    'plugins.featured': 'แนะนำ',
    'plugins.all': 'ปลั๊กอินทั้งหมด',
    'plugins.search.placeholder': 'ค้นหาปลั๊กอิน...',
    
    // Common
    'common.loading': 'กำลังโหลด...',
    'common.error': 'ข้อผิดพลาด',
    'common.success': 'สำเร็จ',
    'common.cancel': 'ยกเลิก',
    'common.save': 'บันทึก',
    'common.edit': 'แก้ไข',
    'common.delete': 'ลบ',
    'common.view': 'ดู',
    'common.close': 'ปิด',
    'common.next': 'ถัดไป',
    'common.previous': 'ก่อนหน้า',
    'common.continue': 'ดำเนินการต่อ',
    
    // Time
    'time.today': 'วันนี้',
    'time.yesterday': 'เมื่อวาน',
    'time.thisWeek': 'สัปดาห์นี้',
    'time.thisMonth': 'เดือนนี้',
    'time.thisYear': 'ปีนี้',
    
    // Units
    'units.currency': '฿',
    'units.percentage': '%',
    'units.steps': 'ก้าว',
    'units.calories': 'แคลอรี่',
    'units.minutes': 'นาที',
    'units.hours': 'ชม.',
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_KEY = 'opti-locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  // Load locale from localStorage or browser preference
  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_KEY) as Locale;
    if (savedLocale && ['en', 'th'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'th') {
        setLocaleState('th');
      }
    }
  }, []);

  // Apply language changes to document
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_KEY, newLocale);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[locale][key as keyof typeof translations[typeof locale]] || key;
    
    // Handle parameter replacement
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{{${paramKey}}}`, String(paramValue));
      });
    }
    
    return translation;
  };

  const isRTL = false; // Thai is LTR, but this can be extended for RTL languages

  const value: I18nContextType = {
    locale,
    setLocale,
    t,
    isRTL,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Hook for translation only (convenience)
export function useTranslation() {
  const { t } = useI18n();
  return { t };
}