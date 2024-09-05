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
    <section className="relative px-4 py-2 text-base font-semibold">
      최근검색어
      {histories.length !== 0 && (
        <button
          className="text-sub absolute right-4 top-3 text-xs"
          aria-label="clear button"
          type="button"
          onClick={handleClear}
        >
          전체삭제
        </button>
      )}
      <ul className="flex pt-4">
        {histories.map((history) => (
          // TODO : 검색 결과 페이지로 이동
          <li
            className="text-sub border-sub mr-2 inline-flex rounded-full border px-2 py-1 text-xs"
            key={history}
          >
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
