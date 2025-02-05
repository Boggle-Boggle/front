import { useQueryClient } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Header from 'components/Header';
import Icon from 'components/Icon';
import SearchBar from 'components/SearchBar';

import { addSearchHistory } from 'services/search';

import { CommonBack } from 'assets/icons';
import searchBookImg from 'assets/img/search_book.png';

import SearchHistory from './SearchHistory';
import SearchResult from './SearchResult';

const Search = () => {
  const [value, setValue] = useState<string>('');
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';

  const fetchResult = () => {
    const params = new URLSearchParams({ q: value });
    navigate(`/search?${params.toString()}`);

    addSearchHistory(value);
    queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
  };

  const handleGoBack = () => {
    navigate('/search');
  };

  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <div className="relative h-screen overflow-hidden bg-main">
      {query ? (
        <Header
          title={<>도서 검색</>}
          leftBtn={
            <button aria-label="뒤로가기" onClick={handleGoBack} type="button">
              <Icon Component={CommonBack} />
            </button>
          }
        />
      ) : (
        <Header title={<>도서 검색</>} />
      )}
      {/* 검색바 */}
      <SearchBar
        placeholder="제목 및 저자로 검색이 가능해요"
        value={value}
        setValue={setValue}
        fetchResult={fetchResult}
        allowEmptyVal={false}
        hasDebounce={false}
      />
      {/* 쿼리가 있을 경우 검색결과를 로드 아니면 기본 화면 로드  */}
      {query ? (
        <SearchResult query={query} />
      ) : (
        <>
          {/* 최근검색어 */}
          <SearchHistory />
          <div className="flex flex-col items-center justify-center pt-28">
            <img src={searchBookImg} alt="" />
            {/* TODO : 2차배포
              오른쪽 상단의 아이콘을 클릭하면 <br />
              바코드 검색이 가능합니다. */}
            <p className="pt-4 text-center">읽고 싶은 책을 검색해 보세요!</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
