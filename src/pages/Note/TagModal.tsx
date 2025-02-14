import { useRef } from 'react';

import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import HalfScreenModal from 'components/HalfScreenModal';
import Icon from 'components/Icon';

import { CommonCancel } from 'assets/icons';

type TagModalProps = {
  close: () => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagModal = ({ close, tags, setTags }: TagModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = () => {
    if (!inputRef.current) return;
    const tag = inputRef.current.value;

    if (tag.length < 1 || tag.length > 8) return;
    if (!tags.includes(tag)) setTags([...tags, inputRef.current.value]);

    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const handleDelete = (keyword: string) => {
    const newTags = tags.filter((tag) => tag !== keyword);

    setTags([...newTags]);
  };

  return (
    <HalfScreenModal handleClose={close} hasCloseMark bgColor="bg-white">
      <section className="flex h-full w-full flex-col items-center px-10 py-6">
        <p className="pb-1 text-lg font-bold">태그 추가</p>
        <p className="mb-7 text-sm opacity-50">작성한 독서노트에 필요한 태그를 달아보세요</p>

        <div className="mb-4 flex h-9 w-full items-center justify-between">
          <input
            className="h-full w-[90%] rounded-md bg-main px-2 py-1"
            placeholder="추가하고 싶은 태그를 입력하세요"
            ref={inputRef}
          />
          <button type="button" aria-label="태그 추가" onClick={handleAdd}>
            <CheckBox type="plus" />
          </button>
        </div>

        <div className="my-1 h-40 w-full overflow-scroll">
          {tags.map((tag) => (
            <li
              className="my-[0.375rem] mr-3 inline-flex items-center justify-center rounded-full border border-accent px-2 py-1 text-sm font-semibold"
              key={tag}
            >
              {`#${tag}`}
              <button type="button" onClick={() => handleDelete(tag)} aria-label="태그 삭제하기">
                <Icon Component={CommonCancel} size="xs" style={{ color: '#E6B9A6', marginLeft: '3px' }} />
              </button>
            </li>
          ))}
        </div>
        <Button handleClick={close} className="mt-4 w-full text-white">
          완료
        </Button>
      </section>
    </HalfScreenModal>
  );
};

export default TagModal;
