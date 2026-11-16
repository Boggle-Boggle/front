type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
};

export const initializeAnalytics = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || window.location.hostname !== 'bbaegok.com') return;

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer ??= [];

  const gtag = (...args: unknown[]) => analyticsWindow.dataLayer?.push(args);
  gtag('js', new Date());
  gtag('config', measurementId);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
};
