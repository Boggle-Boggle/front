import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import MaintenanceModal from './MaintenanceModal';

const CHECK_INTERVAL_MS = 30_000;

const getBundlePath = (documentToCheck: Document) =>
  documentToCheck.querySelector<HTMLScriptElement>('script[type="module"][src^="/assets/"]')?.getAttribute('src');

const UpdateRequiredModal = () => {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();

    const currentBundlePath = getBundlePath(document);
    if (!currentBundlePath) return undefined;

    const checkForUpdate = async () => {
      try {
        const checkUrl = new URL('/', window.location.origin);
        checkUrl.searchParams.set('_update_check', String(Date.now()));

        const response = await fetch(checkUrl, { cache: 'no-store' });
        if (!response.ok) return;

        const latestDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
        const latestBundlePath = getBundlePath(latestDocument);
        if (!latestBundlePath || latestBundlePath === currentBundlePath) return;

        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set('_app_version', String(Date.now()));
        window.location.replace(nextUrl.toString());
      } catch {
        // 점검 중 네트워크 오류가 나면 다음 주기에 다시 확인한다.
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') checkForUpdate();
    };

    const intervalId = window.setInterval(checkForUpdate, CHECK_INTERVAL_MS);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    checkForUpdate();

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/60 px-6">
      <MaintenanceModal dialogRef={dialogRef} />
    </div>,
    document.body,
  );
};

export default UpdateRequiredModal;
