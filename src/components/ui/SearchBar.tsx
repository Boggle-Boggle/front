import { useState } from 'react';
import { BiX } from 'react-icons/bi';
import { FcSearch } from 'react-icons/fc';

type SearchBarProps = {
  placeholder: string;
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const [value, setValue] = useState<string>('');

  const handleClear = () => setValue('');

  const handleSubmit = () => {
    console.log('API 요청');
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-7 my-3 flex items-center rounded-xl border border-solid px-3"
    >
      <span className="mr-1">
        <FcSearch style={{ width: '28px', height: '28px' }} />
      </span>
      <input
        className="h-[36px] w-full focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button type="button" onClick={handleClear} aria-label="clear button" className="ml-1">
          <BiX style={{ width: '24px', height: '24px' }} />
        </button>
      )}
      <button type="submit" className="hidden" aria-label="submit button" />
    </form>
  );
};

export default SearchBar;
