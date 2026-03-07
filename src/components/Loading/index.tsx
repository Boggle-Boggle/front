import Lottie from 'lottie-react';
import { useMemo } from 'react';

import loadingAnimationData from 'assets/loading.json';

type LoadingProps = {
  loop?: boolean;
  className?: string;
  color?: string;
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
  const { loop = true, className = 'h-32 w-32', color = '#ffffff' } = props;

  const animationData = useMemo(() => {
    const rgbaColor = convertHexToNormalizedRgba(color);

    if (!rgbaColor) return loadingAnimationData;

    return replaceAnimationColor(loadingAnimationData, rgbaColor);
  }, [color]);

  return (
    <section className="flex items-center justify-center" role="status" aria-live="polite" aria-label="loading">
      <Lottie animationData={animationData} loop={loop} className={className} />
    </section>
  );
};
