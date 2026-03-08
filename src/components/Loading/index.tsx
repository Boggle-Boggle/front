import Lottie from 'lottie-react';
import { useMemo } from 'react';

import loadingAnimationData from 'assets/loading.json';

type LoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  fullscreen?: boolean;
};

const LOADING_SIZE_CLASS = {
  sm: 'h-24 w-24',
  md: 'h-32 w-32',
  lg: 'h-40 w-40',
} as const;

const PRIMARY_COLOR_FALLBACK = '#8bcfa7';

const getPrimaryColorHex = () => {
  if (typeof window === 'undefined') {
    return PRIMARY_COLOR_FALLBACK;
  }

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
  return primaryColor || PRIMARY_COLOR_FALLBACK;
};

const convertHexToNormalizedRgba = (hex: string) => {
  const normalizedHex = hex.replace('#', '');
  const expandedHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalizedHex;

  if (!/^[0-9a-fA-F]{6}$/.test(expandedHex)) {
    return null;
  }

  const red = Number.parseInt(expandedHex.slice(0, 2), 16) / 255;
  const green = Number.parseInt(expandedHex.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(expandedHex.slice(4, 6), 16) / 255;

  return [red, green, blue, 1] as const;
};

const replaceAnimationColor = (source: unknown, nextColor: readonly [number, number, number, number]) => {
  if (!source || typeof source !== 'object') return source;

  const cloned = structuredClone(source) as Record<string, unknown>;

  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return;

    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    const objectNode = node as Record<string, unknown>;
    const color = objectNode.c;

    if (color && typeof color === 'object' && !Array.isArray(color)) {
      const { k } = color as Record<string, unknown>;

      if (Array.isArray(k) && k.length === 4) {
        (color as Record<string, unknown>).k = [...nextColor];
      }
    }

    Object.values(objectNode).forEach(walk);
  };

  walk(cloned);

  return cloned;
};

export const Loading = (props: LoadingProps) => {
  const { size = 'md', fullscreen = false } = props;

  const sizeClassName = LOADING_SIZE_CLASS[size];
  const containerClassName = fullscreen
    ? 'pointer-events-none fixed inset-0 z-layer flex items-center justify-center'
    : 'flex items-center justify-center';

  const primaryColorHex = getPrimaryColorHex();
  const animationData = useMemo(() => {
    const primaryColorRgba = convertHexToNormalizedRgba(primaryColorHex);

    if (!primaryColorRgba) {
      return loadingAnimationData;
    }

    return replaceAnimationColor(loadingAnimationData, primaryColorRgba);
  }, [primaryColorHex]);

  return (
    <section className={containerClassName} role="status" aria-live="polite" aria-label="loading">
      <Lottie animationData={animationData} loop className={sizeClassName} />
    </section>
  );
};
