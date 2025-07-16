import { useQueryClient } from '@tanstack/react-query';

import { useReducer, useState } from 'react';

import Alert from 'components/Alert';
import Button from 'components/Button';
import CheckBox from 'components/CheckBox';

import { addLibrary } from 'services/library';

import { CustomLibrary } from 'types/library';

import ButtonSet from './shared/ButtonSet';
import SubTitle from './shared/SubTitle';
import Title from './shared/Title';

type LibraryProps = {
  libraries: CustomLibrary[];
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  onPrev: () => void;
  onNext: () => void;
};
const Libraries = ({ libraries, selected, setSelected, onPrev, onNext }: LibraryProps) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [addLibraries, setAddLibraries] = useState<string[]>([]);
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);

  const queryClient = useQueryClient();

  const handleSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value.trimStart();
    if (newInputValue.length > 12) return;

    setInputValue(newInputValue);
  };

  const handleAdd = async () => {
    if (inputValue === '') return;
    let isDuplicate = false;
    const newInputValue = inputValue.trimEnd();

    libraries.forEach((library) => {
      if (library.libraryName === newInputValue) isDuplicate = true;
    });

    addLibraries.forEach((library) => {
      if (library === newInputValue) isDuplicate = true;
    });

    if (isDuplicate) {
      handleAlertActive();

      return;
    }

    setAddLibraries([...addLibraries, newInputValue]);
    setInputValue('');
  };

  const handleDelete = (deleteLibrary: string) => {
    const newLibraries = addLibraries.filter((library) => library !== deleteLibrary);
    setAddLibraries(newLibraries);
  };

  const handleSave = async () => {
    await Promise.all(addLibraries.map((library) => addLibrary(library)));
    await queryClient.invalidateQueries({ queryKey: ['libraries'] });
    setIsAdding(false);
  };

  return !isAdding ? (
    <>
      <Title message="책을 서재에 분류해 보세요!" />
      <SubTitle message="필요한 서재가 없다면 아래에서 추가해보세요" />

      <ul className="max-h-96 overflow-y-auto">
        <li>
          <button
            className="mb-4 flex w-full items-center justify-center rounded-[10px] bg-white p-4 text-[15px] shadow-md"
            type="button"
            onClick={() => setIsAdding(true)}
          >
            서재 추가하기
          </button>
        </li>

        {libraries.map(({ libraryId, libraryName }) => (
          <li key={libraryId}>
            <button
              className={`mb-4 box-border flex w-full items-center justify-between rounded-[10px] border-2 bg-white p-4 text-[15px] shadow-md ${selected.includes(libraryId) ? 'border-accent' : 'border-transparent'}`}
              onClick={() => handleSelect(libraryId)}
              type="button"
            >
              {libraryName}
              <CheckBox isChecked={selected.includes(libraryId)} />
            </button>
          </li>
        ))}
      </ul>

      <ButtonSet onPrev={onPrev} onNext={onNext} />
    </>
  ) : (
    <>
      {isAlertActive && <Alert message="서재가 이미 존재해요" onClose={handleAlertActive} />}
      <Title message="서재를 추가해보세요!" />
      <SubTitle message="" />

      <div className="relative mb-4 box-border flex w-full justify-center rounded-[10px] bg-white p-4 shadow-md">
        <input
          className="h-full w-full"
          placeholder="추가하고 싶은 서재명을 입력하세요"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className="absolute right-4 top-0 translate-y-[12px]"
          type="button"
          aria-label="서재 추가하기"
          onClick={handleAdd}
        >
          <CheckBox type="plus" />
        </button>
      </div>
      <ul className="h-48 overflow-y-auto">
        {addLibraries.map((library) => (
          <li className="mb-2 flex w-full justify-between rounded-[10px] bg-white p-4 text-[15px] shadow-md">
            {library}
            <button type="button" onClick={() => handleDelete(library)} aria-label={`${library} 서재 삭제`}>
              <CheckBox type="minus" color="red" />
            </button>
          </li>
        ))}
      </ul>

      <section className="mt-6 flex justify-between">
        <Button handleClick={onPrev} className="w-2/5 bg-main text-black shadow-sm">
          이전
        </Button>
        <Button handleClick={handleSave} className="w-2/5 text-white shadow-sm">
          저장
        </Button>
      </section>
    </>
  );
};

export default Libraries;
