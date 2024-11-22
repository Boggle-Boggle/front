import { FiPlus } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';

import { getLibrary } from 'services/record';

import Title from './shared/Title';
import SubTitle from './shared/SubTitle';
import ButtonSet from './shared/ButtonSet';
import CheckBox from './shared/CheckBox';

type LibraryProps = {
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  onPrev: () => void;
  onNext: () => void;
};

const Library = ({ selected, setSelected, onPrev, onNext }: LibraryProps) => {
  const { data } = useQuery({
    queryKey: ['library'],
    queryFn: () => getLibrary(),
  });

  const handleSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <>
      <Title message="책을 서재에 분류해 보세요!" />
      <SubTitle message="필요한 서재가 없다면 아래에서 추가해보세요" />
      <ul className="max-h-96 overflow-y-scroll">
        {data &&
          data.map(({ libraryId, libraryName }) => (
            <li
              className={`mb-4 flex justify-between rounded-[10px] bg-white p-4 text-[15px] shadow-md ${selected.includes(libraryId) && `border-2 border-accent`}`}
              onClick={() => handleSelect(libraryId)}
            >
              {libraryName}
              <CheckBox isChecked={selected.includes(libraryId)} />
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

export default Library;
