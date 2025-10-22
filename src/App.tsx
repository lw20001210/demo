import React, { useEffect, useState } from 'react';
import { ConfigProvider, Card, Button, theme as antdTheme } from 'antd';
import type { ThemeMode } from './types/Theme';
import './style/theme.less';
import ThemeToggle from '@/components/ThemeToggle';

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    (localStorage.getItem('theme') as ThemeMode) || 'auto'
  );
  const [isDark, setIsDark] = useState<boolean>(false);

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
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );
  }, [isDark]);

  // 当用户切换主题时保存到 localStorage
  const handleThemeChange = (mode: ThemeMode) => {
    localStorage.setItem('theme', mode);
    setThemeMode(mode);
    updateIsDark(mode);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <div className="container">
        <ThemeToggle theme={themeMode} setTheme={handleThemeChange} />
        <Card style={{ marginTop: 24, backgroundColor: 'var(--card-bg)' }}>
          <h2>🌗 企业级暗黑主题示例 (TSX)</h2>
          <p>
            当前模式：
            {themeMode === 'auto'
              ? isDark
                ? '🌙 暗黑 (跟随系统)'
                : '☀️ 亮色 (跟随系统)'
              : themeMode === 'dark'
              ? '🌙 暗黑'
              : '☀️ 亮色'}
          </p>
          <Button type="primary">AntD 按钮</Button>
          <button className="custom-btn" style={{ marginLeft: 16 }}>
            自定义按钮
          </button>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default App;
