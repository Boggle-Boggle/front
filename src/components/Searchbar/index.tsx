import type { ChangeEvent, FormEvent } from 'react';

import Cancel from 'components/icons/Cancel';
import Search from 'components/icons/Search';

const MSG_SEARCH_PLACEHOLDER = '책 제목을 입력해주세요';

type SearchbarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
  isSearched?: boolean;
  ariaLabel?: string;
  onFocus?: () => void;
};

export const Searchbar = (props: SearchbarProps) => {
  const {
    value,
    onChange,
    onSubmit,
    placeholder = MSG_SEARCH_PLACEHOLDER,
    className = '',
    isSearched = false,
    ariaLabel = 'search',
    onFocus,
  } = props;

  const isEmpty = value.length === 0;
  const showSearchIcon = isEmpty || isSearched;
  const showClearButton = !isEmpty && !isSearched;

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
    <div className={`${className}`}>
      <form
        onSubmit={handleSubmit}
        className="flex h-10 w-full items-center justify-between rounded-[28px] border border-neutral-20 bg-neutral-0 px-4 py-2"
      >
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={onFocus}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-body1 text-neutral-100 outline-none placeholder:text-neutral-60"
          aria-label={ariaLabel}
        />
        {showSearchIcon && (
          <button type="submit" className="flex items-center justify-center" aria-label="search">
            <Search className="h-icon-md w-icon-md text-neutral-60" />
          </button>
        )}
        {showClearButton && (
          <button type="button" onClick={handleClear} className="flex items-center justify-center" aria-label="clear">
            <Cancel className="h-icon-sm w-icon-sm text-neutral-60" />
          </button>
        )}
      </form>
    </div>
  );
};
