import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import type { Language } from '@/types/Language';

interface LanguageToggleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  const { t } = useTranslation();

  const options = [
    { value: 'zh-CN', label: t('language.zh-CN'), icon: '🇨🇳' },
    { value: 'en-US', label: t('language.en-US'), icon: '🇺🇸' },
    { value: 'ja-JP', label: t('language.ja-JP'), icon: '🇯🇵' },
    { value: 'ko-KR', label: t('language.ko-KR'), icon: '🇰🇷' },
  ];

  return (
    <Select
      value={language}
      onChange={setLanguage}
      style={{ width: 180 }}
      options={options.map((opt) => ({
        value: opt.value,
        label: `${opt.icon} ${opt.label}`,
      }))}
    />
  );
};

export default LanguageToggle;
