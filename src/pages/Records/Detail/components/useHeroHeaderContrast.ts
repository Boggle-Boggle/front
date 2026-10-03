import { RefObject, useEffect, useState } from 'react';

type UseHeroHeaderContrastProps = {
  cover: string;
  backgroundRef: RefObject<HTMLDivElement | null>;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  isOpaque: boolean;
};

const SAMPLE_SIZE = 32;
const BACKGROUND_COLOR = 48;
const IMAGE_OPACITY = 0.8;
const DARK_LUMINANCE_THRESHOLD = 0.179;

const linearize = (channel: number) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

export const useHeroHeaderContrast = (props: UseHeroHeaderContrastProps) => {
  const { cover, backgroundRef, scrollContainerRef, isOpaque } = props;
  const [contrast, setContrast] = useState<{ cover: string; isDark: boolean } | null>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!background || !scrollContainer) return;

    let disposed = false;
    let frame = 0;
    const image = new Image();
    // 표시용 이미지는 그대로 두고, 픽셀 분석용 이미지에만 CORS를 요청합니다.
    image.crossOrigin = 'anonymous';

    const sample = () => {
      if (disposed || !image.naturalWidth) return;
      const { width, height, top } = background.getBoundingClientRect();
      if (!width || !height) return;

      const canvas = document.createElement('canvas');
      canvas.width = SAMPLE_SIZE;
      canvas.height = SAMPLE_SIZE;
      const context = canvas.getContext('2d');
      if (!context) return;

      // object-cover와 scale-110의 중앙 크롭을 반영해 현재 헤더 뒤쪽만 분석합니다.
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * 1.1;
      const renderedWidth = image.naturalWidth * scale;
      const renderedHeight = image.naturalHeight * scale;
      const offset = Math.max(0, scrollContainer.getBoundingClientRect().top - top);
      const sampleHeight = Math.min(height / 4, Math.max(1, height - offset));
      context.fillStyle = `rgb(${BACKGROUND_COLOR}, ${BACKGROUND_COLOR}, ${BACKGROUND_COLOR})`;
      context.fillRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
      context.globalAlpha = IMAGE_OPACITY;
      context.drawImage(
        image,
        ((width - renderedWidth) / 2 / width) * SAMPLE_SIZE,
        (((height - renderedHeight) / 2 - offset) / sampleHeight) * SAMPLE_SIZE,
        (renderedWidth / width) * SAMPLE_SIZE,
        (renderedHeight / sampleHeight) * SAMPLE_SIZE,
      );

      try {
        const { data } = context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        let luminance = 0;
        for (let index = 0; index < data.length; index += 4) {
          // 기존 상단 그림자에 의한 어두워짐도 반영합니다.
          luminance +=
            0.2126 * linearize(data[index] * 0.84) +
            0.7152 * linearize(data[index + 1] * 0.84) +
            0.0722 * linearize(data[index + 2] * 0.84);
        }
        setContrast({ cover, isDark: luminance / (SAMPLE_SIZE * SAMPLE_SIZE) < DARK_LUMINANCE_THRESHOLD });
      } catch {
        // 이미지 서버가 픽셀 접근을 막으면 CSS의 배경 반전으로 대비를 유지합니다.
        setContrast(null);
      }
    };

    const scheduleSample = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sample);
    };
    image.onload = scheduleSample;
    image.onerror = () => {
      if (!disposed) setContrast(null);
    };
    image.src = cover;
    const observer = new ResizeObserver(scheduleSample);
    observer.observe(background);
    scrollContainer.addEventListener('scroll', scheduleSample, { passive: true });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      scrollContainer.removeEventListener('scroll', scheduleSample);
      image.onload = null;
      image.onerror = null;
    };
  }, [cover, backgroundRef, scrollContainerRef]);

  const currentContrast = contrast?.cover === cover ? contrast : null;
  const headerClassName = isOpaque
    ? 'text-black'
    : currentContrast
      ? currentContrast.isDark
        ? 'text-white'
        : 'text-black'
      : 'text-white mix-blend-difference';

  return { headerClassName };
};
