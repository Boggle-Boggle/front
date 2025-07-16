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
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-7 flex items-center rounded-xl bg-white px-3">
      <input className="h-[36px] w-full text-sm" placeholder={placeholder} value={value} onChange={handleChange} />
      <button type="submit" className="hidden" aria-label="submit button" />
    </form>
  );
};

export default SearchBar;
