import { useQueryClient } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { TbCameraSearch } from 'react-icons/tb';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Header from 'components/Header';
import SearchBar from 'components/SearchBar';

import { addSearchHistory } from 'services/search';

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
    <div className="relative h-screen bg-main">
      {query ? (
        <Header
          title={{ text: '도서 검색' }}
          leftBtn={{
            icon: <IoArrowBackOutline style={{ width: '24px', height: '24px' }} />,
            handleLeftBtnClick: handleGoBack,
          }}
        />
      ) : (
        <Header title={{ text: '도서 검색' }} />
      )}
      <SearchBar
        placeholder="제목 및 저자로 검색이 가능해요"
        value={value}
        setValue={setValue}
        fetchResult={fetchResult}
      />

      {query ? (
        <SearchResult query={query} />
      ) : (
        <>
          <SearchHistory />
          <div className="flex flex-col items-center justify-center pt-28 text-sub">
            <TbCameraSearch style={{ width: '137px', height: '137px', opacity: '30%' }} />
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
