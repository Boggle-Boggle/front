import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

import Icon from 'components/Icon';

import { getSearchHistories, removeSearchHistory, removeAllSearchHistory } from 'services/search';

import { CommonCancel } from 'assets/icons';

// 최근 검색어
// 전체삭제를 누르면 최근검색어 전체 삭제, 각 검색어별로 삭제버튼을 가지고 삭제요청 가능
const SearchHistory = () => {
  const queryClient = useQueryClient();

  // 최근 검색어를 가져오는 쿼리
  const { data: histories } = useQuery({
    queryKey: ['searchHistory'],
    queryFn: getSearchHistories,
  });

  // 최근검색어 개별 삭제시 쿼리키 무효화
  const { mutate: deleteHistory } = useMutation({
    mutationFn: removeSearchHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    },
  });

  // 최근검색어 전체 삭제시 쿼리키 무효화
  const { mutate: deleteAllHistories } = useMutation({
    mutationFn: removeAllSearchHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    },
  });

  // 삭제버튼 클릭시 책 개별의 상세조회 페이지로 넘어가는 것을 방지하기 위해 preventDefault 적용 및 검색어 삭제 및 쿼리키 초기화
  const handleRemove = (e: React.MouseEvent, keyword: string) => {
    e.preventDefault();
    deleteHistory(keyword);
  };

  // ? 이 경우 histories 를 맨 위로 묶는게 나은지 ?
  return (
    <section className="relative mt-3 px-4 py-2 text-base font-semibold">
      최근검색어
      {histories && histories.length !== 0 && (
        <button
          className="absolute right-4 top-3 text-xs opacity-70"
          aria-label="clear button"
          type="button"
          onClick={() => deleteAllHistories()}
        >
          전체삭제
        </button>
      )}
      <ul className="scrollbar-hide mt-3 flex h-7 overflow-x-auto whitespace-nowrap">
        {histories &&
          histories.map((keyword) => (
            <li className="mr-3 inline-flex rounded-full border px-2 text-sm opacity-70" key={keyword}>
              <Link to={`?q=${keyword}`} className="flex items-center">
                <p className="mr-1">{keyword}</p>
                <button aria-label="remove button" type="button" onClick={(e) => handleRemove(e, keyword)}>
                  <Icon Component={CommonCancel} size="xs" />
                </button>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default SearchHistory;
