import { useState } from 'react';

import { Header } from 'components/Header';

import { applyStoredThemeColor, setStoredThemeColor, type ThemeColor } from 'utils/theme';

import { SectionHeader } from '../shared/SectionHeader';
import { SectionRadio } from '../shared/SectionRadio';
import { SectionToggle } from '../shared/SectionToggle';

const MSG_THEME_FONT_TITLE = '테마/폰트 변경하기';
const MSG_THEME_MODE_SECTION = '모드 선택하기';
const MSG_THEME_COLOR_SECTION = '테마 색상 변경하기';

const MODE_OPTIONS = [
  {
    key: 'dark',
    label: '다크모드 사용하기',
    colorClassName: 'bg-neutral-100',
  },
  {
    key: 'ebook',
    label: '이북모드 사용하기',
    colorClassName: 'bg-neutral-100',
  },
] as const;

const THEME_COLOR_OPTIONS = [
  { key: 'red-grapefruit', label: '레드 자몽', colorVariable: 'var(--theme-red-grapefruit-primary-light)' },
  { key: 'lemonade', label: '레몬 에이드', colorVariable: 'var(--theme-lemonade-primary-light)' },
  {
    key: 'green-flower-garden',
    label: '그린 플라워 가든 (기본)',
    colorVariable: 'var(--theme-green-flower-garden-primary-light)',
  },
  { key: 'calm-pistachio', label: '캄 피스타치오', colorVariable: 'var(--theme-calm-pistachio-primary-light)' },
  { key: 'blue-toy', label: '블루 키즈', colorVariable: 'var(--theme-blue-toy-primary-light)' },
  { key: 'romantic-purple', label: '로맨틱 퍼플', colorVariable: 'var(--theme-romantic-purple-primary-light)' },
  { key: 'peach-candy', label: '복숭아맛 캔디', colorVariable: 'var(--theme-peach-candy-primary-light)' },
] satisfies { key: ThemeColor; label: string; colorVariable: string }[];

const Appearance = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isEbookMode, setIsEbookMode] = useState<boolean>(false);
  const [selectedThemeColor, setSelectedThemeColor] = useState<ThemeColor>(() => applyStoredThemeColor());

  const handleThemeColorChange = (themeColor: ThemeColor) => {
    setSelectedThemeColor(themeColor);
    setStoredThemeColor(themeColor);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_THEME_FONT_TITLE} withBack />

      <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom">
        <SectionHeader title={MSG_THEME_MODE_SECTION} />
        <div className="flex flex-col gap-2 pb-10 pt-2">
          <SectionToggle
            label={MODE_OPTIONS[0].label}
            checked={isDarkMode}
            onChange={() => setIsDarkMode((prev) => !prev)}
            leading={<div className={`size-6 rounded-lg ${MODE_OPTIONS[0].colorClassName}`} />}
          />
          <SectionToggle
            label={MODE_OPTIONS[1].label}
            checked={isEbookMode}
            onChange={() => setIsEbookMode((prev) => !prev)}
            leading={<div className={`size-6 rounded-lg ${MODE_OPTIONS[1].colorClassName}`} />}
          />
        </div>

        <SectionHeader title={MSG_THEME_COLOR_SECTION} />
        <div className="flex flex-col gap-2 pt-2">
          {THEME_COLOR_OPTIONS.map((option) => (
            <SectionRadio
              key={option.key}
              name="theme-color"
              label={option.label}
              checked={selectedThemeColor === option.key}
              onChange={() => handleThemeColorChange(option.key)}
              leading={<div className="size-6 rounded-lg" style={{ backgroundColor: option.colorVariable }} />}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appearance;
