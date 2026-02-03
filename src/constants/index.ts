/**
 * 应用常量配置
 */

// 存储键名
export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
  TOKEN: 'token',
  USER_INFO: 'userInfo',
} as const;

// 主题模式
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const;

// 支持的语言
export const SUPPORTED_LANGUAGES = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
  JA_JP: 'ja-JP',
  KO_KR: 'ko-KR',
} as const;

// 默认配置
export const DEFAULT_CONFIG = {
  THEME: THEME_MODES.AUTO,
  LANGUAGE: SUPPORTED_LANGUAGES.ZH_CN,
} as const;
