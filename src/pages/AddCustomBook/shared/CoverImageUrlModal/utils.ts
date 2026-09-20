import { TIME_MS } from 'constants/time';

export type ImageUrlValidationResult = 'valid' | 'invalid-url' | 'load-failed';

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const canLoadImage = (imageUrl: string) =>
  new Promise<boolean>((resolve) => {
    const image = new Image();
    const timeout = window.setTimeout(() => {
      image.onload = null;
      image.onerror = null;
      resolve(false);
    }, TIME_MS.SECOND_8);

    image.onload = () => {
      window.clearTimeout(timeout);
      resolve(image.naturalWidth > 0 && image.naturalHeight > 0);
    };
    image.onerror = () => {
      window.clearTimeout(timeout);
      resolve(false);
    };
    image.src = imageUrl;
  });

export const validateImageUrl = async (imageUrl: string): Promise<ImageUrlValidationResult> => {
  if (!imageUrl) return 'valid';
  if (!isHttpUrl(imageUrl)) return 'invalid-url';

  return (await canLoadImage(imageUrl)) ? 'valid' : 'load-failed';
};
