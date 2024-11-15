import checked from 'assets/checked.png';
import { FiPlus } from 'react-icons/fi';

import Title from './shared/Title';
import SubTitle from './shared/SubTitle';
import ButtonSet from './shared/ButtonSet';
import { useState } from 'react';

type LibraryProps = {
  onPrev: () => void;
  onNext: () => void;
};

const Library = ({ onPrev, onNext }: LibraryProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const librarys = [
    {
      id: 1,
      libraryName: '윤아가 빌려줌',
      bookCount: 0,
    },
    {
      id: 2,
      libraryName: '고전문학',
      bookCount: 0,
    },
  ];

  const handleSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <>
      <Title message="책을 서재에 분류해 보세요!" />
      <SubTitle message="필요한 서재가 없다면 아래에서 추가해보세요" />
      <ul className="max-h-96 overflow-y-scroll">
        {librarys.map(({ id, libraryName }) => (
          <li
            className={`mb-4 flex justify-between rounded-[10px] bg-white p-4 text-[15px] shadow-md ${selected.includes(id) && `border-2 border-accent`}`}
            onClick={() => handleSelect(id)}
          >
            {libraryName}
            <span className={`h-6 w-6 rounded-md ${selected.includes(id) ? 'bg-accent' : 'bg-main'}`}>
              <img src={checked} />
            </span>
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
