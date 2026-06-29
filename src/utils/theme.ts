import { STORAGE_KEY } from 'constants/storage';

export type ThemeColor =
  | 'red-grapefruit'
  | 'lemonade'
  | 'green-flower-garden'
  | 'calm-pistachio'
  | 'blue-toy'
  | 'romantic-purple'
  | 'peach-candy';

const DEFAULT_THEME_COLOR: ThemeColor = 'green-flower-garden';

const THEME_COLORS: ThemeColor[] = [
  'red-grapefruit',
  'lemonade',
  'green-flower-garden',
  'calm-pistachio',
  'blue-toy',
  'romantic-purple',
  'peach-candy',
];

const isThemeColor = (value: string | null): value is ThemeColor => {
  if (!value) return false;

  return THEME_COLORS.some((themeColor) => themeColor === value);
};

export const applyStoredThemeColor = () => {
  const storedThemeColor = window.localStorage.getItem(STORAGE_KEY.THEME_COLOR);
  const themeColor = isThemeColor(storedThemeColor) ? storedThemeColor : DEFAULT_THEME_COLOR;

  document.documentElement.dataset.theme = themeColor;

  return themeColor;
};

export const setStoredThemeColor = (themeColor: ThemeColor) => {
  window.localStorage.setItem(STORAGE_KEY.THEME_COLOR, themeColor);
  document.documentElement.dataset.theme = themeColor;
};
