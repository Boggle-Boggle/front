import CheckBox from 'components/CheckBox';

import { RecordLibraries } from 'types/record';

type EditLibrariesProps = {
  libraries: (RecordLibraries & { selected: boolean })[];
  setLibraries: React.Dispatch<React.SetStateAction<(RecordLibraries & { selected: boolean })[]>>;
};

const EditLibraries = ({ libraries, setLibraries }: EditLibrariesProps) => {
  const handleClick = (libraryId: number) => {
    const newLibraries = libraries.map((library) =>
      library.libraryId === libraryId ? { ...library, selected: !library.selected } : library,
    );
    setLibraries(newLibraries);
  };
  return (
    <div className="border-t-[3px] border-main">
      <p className="relative flex h-14 items-center justify-between px-6 font-semibold">
        서재구분
        <button className="text-sm font-normal opacity-50" type="button" aria-label="독서기간 추가">
          편집
        </button>
      </p>
      <ul>
        {libraries.map(({ libraryId, libraryName, selected }) => (
          <li key={libraryId}>
            <button
              className="relative flex h-14 w-full items-center justify-between border-t-[1px] border-main px-6"
              type="button"
              onClick={() => handleClick(libraryId)}
            >
              {libraryName}
              <CheckBox isChecked={selected} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditLibraries;
