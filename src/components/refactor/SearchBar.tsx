import { IconCancel, IconSearch } from 'components/icons';

type SearchBarProps = {
  icon: 'cancel' | 'search';
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const SearchBar = ({ icon, value, placeholder, onChange, onSubmit }: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit} className="relative h-10 w-full">
      <input
        className="size-full rounded-[28px] border border-neutral-20 px-4 py-[0.563rem] text-body1 placeholder:text-neutral-60"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {icon === 'cancel' ? (
        <IconCancel className="absolute right-0 top-0 mx-3 h-full w-icon-md text-neutral-60" />
      ) : (
        <IconSearch className="absolute right-0 top-0 mx-3 h-full w-icon-md text-neutral-60" />
      )}
      <button type="submit" className="hidden" aria-label="submit button" />
    </form>
  );
};

export default SearchBar;
