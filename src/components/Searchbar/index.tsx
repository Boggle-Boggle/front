import type { ChangeEvent, FormEvent } from 'react';

import Cancel from 'components/icons/Cancel';
import Search from 'components/icons/Search';

type SearchbarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
  isSearched?: boolean;
  ariaLabel?: string;
};

export const Searchbar = (props: SearchbarProps) => {
  const {
    value,
    onChange,
    onSubmit,
    placeholder = '책 제목을 입력해주세요',
    className = '',
    isSearched = false,
    ariaLabel = 'search',
  } = props;

  const isEmpty = value.length === 0;
  const showSearchIcon = isEmpty || isSearched;
  const showClearButton = !isEmpty && !isSearched;

  const containerClassName =
    'flex h-10 w-full items-center justify-between rounded-[28px] border border-neutral-20 bg-neutral-0 px-4 py-2';
  const inputClassName = 'flex-1 bg-transparent text-body1 text-neutral-100 outline-none placeholder:text-neutral-60';
  const searchIconClassName = 'h-icon-md w-icon-md text-neutral-60';
  const clearButtonClassName = 'flex items-center justify-center';
  const clearIconClassName = 'h-icon-sm w-icon-sm text-neutral-60';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <form onSubmit={handleSubmit} className={`${containerClassName} ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={inputClassName}
        aria-label={ariaLabel}
      />
      {showSearchIcon && (
        <button type="submit" className={clearButtonClassName} aria-label="search">
          <Search className={searchIconClassName} />
        </button>
      )}
      {showClearButton && (
        <button type="button" onClick={handleClear} className={clearButtonClassName} aria-label="clear">
          <Cancel className={clearIconClassName} />
        </button>
      )}
    </form>
  );
};
