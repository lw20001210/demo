import React from 'react';
import { Select, Space } from 'antd';
import { BulbOutlined, MoonOutlined, LaptopOutlined } from '@ant-design/icons';
import type { ThemeMode } from '../../types/Theme';

interface ThemeToggleProps {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
}

function ThemeToggle(props: ThemeToggleProps): React.ReactElement {
  const { theme, setTheme } = props;

  const handleChange = (value: ThemeMode) => setTheme(value);

  return (
    <Space>
      <Select
        value={theme}
        onChange={handleChange}
        style={{ width: 180 }}
        options={[
          {
            value: 'light',
            label: (
              <>
                <BulbOutlined /> 亮色
              </>
            ),
          },
          {
            value: 'dark',
            label: (
              <>
                <MoonOutlined /> 暗色
              </>
            ),
          },
          {
            value: 'auto',
            label: (
              <>
                <LaptopOutlined /> 跟随系统
              </>
            ),
          },
        ]}
      />
    </Space>
  );
}

export default ThemeToggle;
