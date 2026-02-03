import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';
import jaJP from './locales/ja-JP.json';
import koKR from './locales/ko-KR.json';

const resources = {
  'zh-CN': { translation: zhCN },
  'en-US': { translation: enUS },
  'ja-JP': { translation: jaJP },
  'ko-KR': { translation: koKR },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'zh-CN',
  fallbackLng: 'zh-CN',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
