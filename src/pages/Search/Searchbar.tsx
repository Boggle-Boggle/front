import Cancel from 'components/icons/Cancel';
import Search from 'components/icons/Search';

type SearchbarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
};

const Searchbar = ({ value, onChange, onSubmit, placeholder, className }: SearchbarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={'flex h-10 w-full rounded-[28px] border border-neutral-20 px-4 py-2' + className}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-body1 outline-none placeholder:text-neutral-40"
        aria-label="search"
      />
      <Search className="h-icon-md w-icon-md text-neutral-60" />
      {value && (
        <button type="button" onClick={handleClear} className="flex items-center justify-center" aria-label="clear">
          <Cancel className="h-icon-sm w-icon-sm text-neutral-60" />
        </button>
      )}
    </form>
  );
};

export default Searchbar;
