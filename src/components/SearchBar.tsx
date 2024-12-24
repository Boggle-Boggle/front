import { BiX } from 'react-icons/bi';
import { FcSearch } from 'react-icons/fc';

type SearchBarProps = {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  fetchResult: () => void;
  allowEmptyVal: boolean;
};

const SearchBar = ({ placeholder, value, setValue, fetchResult, allowEmptyVal }: SearchBarProps) => {
  const handleClear = () => setValue('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setValue(searchValue);

    if (searchValue.length === 0 && !allowEmptyVal) return;
    fetchResult();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (value.length === 0 && !allowEmptyVal) return;

    fetchResult();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-7 flex items-center rounded-xl bg-white px-3">
      <span className="mr-1">
        <FcSearch style={{ width: '28px', height: '28px' }} />
      </span>
      <input
        className="h-[36px] w-full text-sm focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
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
