import { CommonCancel, CommonSearch } from 'assets/icons';

import Icon from './Icon';

type SearchBarProps = {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  fetchResult: () => void;
  allowEmptyVal: boolean;
  hasDebounce?: boolean;
};

const SearchBar = ({
  placeholder,
  value,
  setValue,
  fetchResult,
  allowEmptyVal,
  hasDebounce = true,
}: SearchBarProps) => {
  const handleClear = () => setValue('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    if (searchValue.length > 100) return;

    setValue(searchValue);

    if (searchValue.length === 0 && !allowEmptyVal) return;
    if (hasDebounce) fetchResult();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (value.length === 0 && !allowEmptyVal) return;

    fetchResult();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-7 flex items-center rounded-xl bg-white px-3">
      <span className="mr-1">
        <Icon Component={CommonSearch} size="xs" />
      </span>
      <input className="h-[36px] w-full text-sm" placeholder={placeholder} value={value} onChange={handleChange} />
      {value && (
        <button type="button" onClick={handleClear} aria-label="clear button" className="ml-1">
          <Icon Component={CommonCancel} size="xs" />
        </button>
      )}
      <button type="submit" className="hidden" aria-label="submit button" />
    </form>
  );
};

export default SearchBar;
