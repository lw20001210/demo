import React, { useEffect, useState } from 'react';
import { ConfigProvider, Card, Button, theme as antdTheme } from 'antd';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import jaJP from 'antd/locale/ja_JP';
import koKR from 'antd/locale/ko_KR';
import type { ThemeMode } from './types/Theme';
import type { Language } from './types/Language';
import './style/theme.less';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import Test from './components/ThemeToggle/Test/Test';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    (localStorage.getItem('theme') as ThemeMode) || 'auto'
  );
  const [isDark, setIsDark] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem('language') as Language) || 'zh-CN'
  );

  // Ant Design 语言映射
  const antdLocales = {
    'zh-CN': zhCN,
    'en-US': enUS,
    'ja-JP': jaJP,
    'ko-KR': koKR,
  };

  // 根据 themeMode 和系统设置更新 isDark
  const updateIsDark = (mode: ThemeMode) => {
    if (mode === 'light') setIsDark(false);
    else if (mode === 'dark') setIsDark(true);
    else setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  };

  // 初始化和监听系统主题变化
  useEffect(() => {
    updateIsDark(themeMode);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (themeMode === 'auto') setIsDark(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [themeMode]);

  // 更新 DOM data-theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // 当用户切换主题时保存到 localStorage
  const handleThemeChange = (mode: ThemeMode) => {
    localStorage.setItem('theme', mode);
    setThemeMode(mode);
    updateIsDark(mode);
  };

  // 当用户切换语言时保存到 localStorage
  const handleLanguageChange = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <ConfigProvider
      locale={antdLocales[language]}
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <ThemeToggle theme={themeMode} setTheme={handleThemeChange} />
          <LanguageToggle language={language} setLanguage={handleLanguageChange} />
        </div>
        <Card style={{ marginTop: 24, backgroundColor: 'var(--card-bg)' }}>
          <h2>🌗 {t('title')}</h2>
          <p>
            {t('currentMode')}
            {themeMode === 'auto'
              ? isDark
                ? `🌙 ${t('theme.autoDark')}`
                : `☀️ ${t('theme.autoLight')}`
              : themeMode === 'dark'
                ? `🌙 ${t('theme.dark')}`
                : `☀️ ${t('theme.light')}`}
          </p>
          <Button type="primary">{t('button.antd')}</Button>
          <button className="custom-btn" style={{ marginLeft: 16 }}>
            {t('button.custom')}
          </button>
        </Card>
        <div style={{ height: 500, overflow: 'auto' }}>
          {' '}
          <Test />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
