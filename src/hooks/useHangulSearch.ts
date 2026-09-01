import { disassemble, getChoseong } from 'es-hangul';
import { useMemo } from 'react';

/**
 * 배열 데이터에서 한글 초성 및 자모 검색 필터링을 실시간 지원하는 범용 커스텀 훅
 *
 * @template T - 배열 요소의 타입
 * @param items - 필터링할 대상 전체 배열
 * @param searchKeyword - 검색창에 입력된 검색 키워드
 * @param getText - 각 아이템에서 검색 대상이 될 문자열 필드를 추출하는 헬퍼 함수
 * @returns 필터링된 배열 데이터
 */
export function useHangulSearch<T>(
  items: T[],
  searchKeyword: string,
  getText: (item: T) => string
): T[] {
  return useMemo(() => {
    const cleanedKeyword = searchKeyword.trim().toLowerCase();
    if (!cleanedKeyword) return items;

    const disKeyword = disassemble(cleanedKeyword);
    const choKeyword = getChoseong(cleanedKeyword);
    const isOnlyChoseong = /^[ㄱ-ㅎ\s]+$/.test(cleanedKeyword);

    return items.filter((item) => {
      const text = getText(item).toLowerCase();
      if (text.includes(cleanedKeyword)) return true;
      if (disassemble(text).includes(disKeyword)) return true;
      if (isOnlyChoseong && getChoseong(text).includes(choKeyword)) return true;

      return false;
    });
  }, [items, searchKeyword, getText]);
}
