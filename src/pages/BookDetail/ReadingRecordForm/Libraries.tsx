import { FiPlus } from 'react-icons/fi';

import CheckBox from 'components/CheckBox';

import { Library } from 'types/library';

import ButtonSet from './shared/ButtonSet';
import SubTitle from './shared/SubTitle';
import Title from './shared/Title';

type LibraryProps = {
  libraries: Library[];
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  onPrev: () => void;
  onNext: () => void;
};

const Libraries = ({ libraries, selected, setSelected, onPrev, onNext }: LibraryProps) => {
  const handleSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <>
      <Title message="책을 서재에 분류해 보세요!" />
      <SubTitle message="필요한 서재가 없다면 아래에서 추가해보세요" />

      <ul className="max-h-96 overflow-y-auto">
        {libraries.map(({ libraryId, libraryName }) => (
          <li key={libraryId}>
            <button
              className={`mb-4 box-border flex w-full justify-between rounded-[10px] border-2 bg-white p-4 text-[15px] shadow-md ${selected.includes(libraryId) ? 'border-accent' : 'border-transparent'}`}
              onClick={() => handleSelect(libraryId)}
              type="button"
            >
              {libraryName}
              <CheckBox isChecked={selected.includes(libraryId)} />
            </button>
          </li>
        ))}

        <li className="flex items-center justify-center rounded-[10px] bg-white p-4 text-[15px] shadow-md">
          <FiPlus style={{ width: '16px', height: '16px', marginRight: '4px' }} />
          서재 추가하기
        </li>
      </ul>

      <ButtonSet onPrev={onPrev} onNext={onNext} />
    </>
  );
};

export default Libraries;
