import { BiX } from 'react-icons/bi';
import { FcSearch } from 'react-icons/fc';

type SearchBarProps = {
  placeholder: string;
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
  return (
    <div className="mx-5 my-3 flex items-center rounded-xl border border-solid px-3 py-1">
      <span className="mr-1">
        <FcSearch style={{ width: '28px', height: '28px' }} />
      </span>
      <input className="h-[36px] w-full focus:outline-none" placeholder={placeholder} />
      <span className="ml-1">
        <BiX style={{ width: '24px', height: '24px' }} />
      </span>
    </div>
  );
};

export default SearchBar;
