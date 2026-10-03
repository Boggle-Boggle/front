import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

import { STORAGE_KEY } from 'constants/storage';

interface ScrollRestorationOptions {
  customKey?: string;
  isReady?: boolean;
}

const RESTORE_RETRY_DURATION_MS = 500;
const RESTORE_RETRY_INTERVAL_MS = 50;

export const useScrollRestoration = <T extends HTMLElement>({
  customKey,
  isReady = true,
}: ScrollRestorationOptions = {}) => {
  const containerRef = useRef<T>(null);
  const location = useLocation();
  const navigationType = useNavigationType();

  // 히스토리 엔트리별로 고유한 key를 발급받아 사용하거나, 별도의 customKey 사용
  const scrollKey = `${STORAGE_KEY.SCROLL_POSITION_PREFIX}${customKey || location.key}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isReady) return;

    // 뒤로가기(POP)로 진입한 경우에만 스크롤 위치 복원
    if (navigationType === 'POP') {
      const savedPosition = sessionStorage.getItem(scrollKey);
      if (savedPosition) {
        const targetScrollTop = parseInt(savedPosition, 10);
        let timer: ReturnType<typeof setTimeout> | undefined;
        const startedAt = Date.now();

        const restoreScrollTop = () => {
          container.scrollTop = targetScrollTop;

          const maxScrollTop = container.scrollHeight - container.clientHeight;
          const restoredScrollTop = Math.min(targetScrollTop, maxScrollTop);
          const isRestored = targetScrollTop <= 0 || container.scrollTop >= restoredScrollTop;

          if (!isRestored && Date.now() - startedAt < RESTORE_RETRY_DURATION_MS) {
            timer = setTimeout(restoreScrollTop, RESTORE_RETRY_INTERVAL_MS);
          }
        };

        restoreScrollTop();

        return () => {
          if (timer) clearTimeout(timer);
        };
      }
    } else {
      // 새로운 페이지 진입(PUSH/REPLACE) 시에는 스크롤 초기화
      container.scrollTop = 0;
    }
  }, [scrollKey, navigationType, isReady]);

  // 스크롤 이벤트 발생 시 현재 위치 저장
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      sessionStorage.setItem(scrollKey, container.scrollTop.toString());
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      sessionStorage.setItem(scrollKey, container.scrollTop.toString());
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollKey]);

  return containerRef;
};
