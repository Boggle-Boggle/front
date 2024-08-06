import { useState, MouseEvent } from 'react';
import { BiX } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const SearchHistory = () => {
  const [histories, setHistories] = useState<string[]>([
    '구병모',
    '그많던싱아는',
    '위저드베이커리',
  ]);
  const handleClear = () => setHistories([]);

  const handleRemove = (e: MouseEvent<HTMLButtonElement>, history: string) => {
    const newHistories = histories.filter((h) => h !== history);
    setHistories(newHistories);
    e.preventDefault();
  };

  return (
    <section className="relative px-4 py-2 text-base">
      최근검색어
      <button
        className="absolute right-2 text-xs"
        aria-label="clear button"
        type="button"
        onClick={handleClear}
      >
        전체삭제
      </button>
      <ul className="flex pt-4">
        {histories.map((history) => (
          // TODO : 검색 결과 페이지로 이동
          <li className="mr-2 inline-flex rounded-full border px-2 text-[11px]" key={history}>
            <Link to="/" className="flex items-center">
              {history}
              <button
                aria-label="remove button"
                type="button"
                className="focus:outline-none"
                onClick={(e) => handleRemove(e, history)}
              >
                <BiX style={{ width: '14px', height: '14px', marginLeft: '4px' }} />
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchHistory;
