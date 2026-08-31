import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

interface ScrollRestorationOptions {
  customKey?: string;
  isReady?: boolean;
}

export const useScrollRestoration = <T extends HTMLElement>({
  customKey,
  isReady = true,
}: ScrollRestorationOptions = {}) => {
  const containerRef = useRef<T>(null);
  const location = useLocation();
  const navigationType = useNavigationType();

  // 히스토리 엔트리별로 고유한 key를 발급받아 사용하거나, 별도의 customKey 사용
  const scrollKey = `scroll_pos:${customKey || location.key}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isReady) return;

    // 뒤로가기(POP)로 진입한 경우에만 스크롤 위치 복원
    if (navigationType === 'POP') {
      const savedPosition = sessionStorage.getItem(scrollKey);
      if (savedPosition) {
        const targetScrollTop = parseInt(savedPosition, 10);
        container.scrollTop = targetScrollTop;

        // 자식 컴포넌트 렌더링 및 레이아웃 잡히는 지연 시간 대비 안전 장치
        const timer = setTimeout(() => {
          if (container) {
            container.scrollTop = targetScrollTop;
          }
        }, 50);
        return () => clearTimeout(timer);
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
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollKey]);

  return containerRef;
};
