export const isAppleDevice = () => {
  const isAppleMobileUserAgent = /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
  const isIPadDesktopMode = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;

  return isAppleMobileUserAgent || isIPadDesktopMode;
};
