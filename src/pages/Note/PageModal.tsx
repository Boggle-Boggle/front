import { useRef, useState } from 'react';
import { ImFileEmpty, ImFilesEmpty } from 'react-icons/im';

import Button from 'components/Button';
import HalfScreenModal from 'components/HalfScreenModal';

import { AddNoteParams } from 'types/record';

type PageModalProps = {
  close: () => void;
  setPage: React.Dispatch<React.SetStateAction<number | null>>;
  setPages: React.Dispatch<React.SetStateAction<AddNoteParams['pages']>>;
};
const PageModal = ({ close, setPage, setPages }: PageModalProps) => {
  const [selected, setSelected] = useState<'page' | 'pages'>('page');
  const pageRef = useRef<HTMLInputElement | null>(null);
  const pagesStartRef = useRef<HTMLInputElement | null>(null);
  const pagesEndRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (selected === 'page' && pageRef.current) {
      const page = parseInt(pageRef.current.value, 10);

      if (Number.isInteger(page) && page > 0) {
        setPage(page);
        setPages(null);
        close();
      } else alert('페이지 번호가 올바르지 않아요');
    }

    if (selected === 'pages' && pagesStartRef.current && pagesEndRef.current) {
      const startPage = parseInt(pagesStartRef.current.value, 10);
      const endPage = parseInt(pagesEndRef.current.value, 10);

      if (
        Number.isInteger(startPage) &&
        startPage > 0 &&
        Number.isInteger(endPage) &&
        endPage > 0 &&
        startPage < endPage
      ) {
        setPages({
          startPage,
          endPage,
        });
        setPage(null);
        close();
      } else alert('페이지 번호가 올바르지 않아요');
    }
  };

  return (
    <HalfScreenModal handleClose={close} hasCloseMark bgColor="bg-white">
      <section className="relative flex h-full w-full flex-col items-center px-10 py-6">
        <p className="pb-1 text-lg font-bold">페이지 입력</p>
        <p className="text-sm opacity-50">함께 기재하고 싶은 페이지 번호를 입력해주세요</p>
        <section className="my-8 w-full">
          <button
            className={`h-[5.5rem] w-1/2 rounded-l-xl border-2 ${selected === 'page' ? 'border-accent bg-accent bg-opacity-10 text-accent' : 'border-r-0 border-main'}`}
            type="button"
            onClick={() => setSelected('page')}
          >
            <ImFileEmpty
              style={{
                width: '24px',
                height: '24px',
                color: selected === 'page' ? '#E6B9A6' : '#2F3645',
                margin: '0 auto',
                marginBottom: '4px',
              }}
            />
            단일 페이지 입력
          </button>
          <button
            className={`h-[5.5rem] w-1/2 rounded-r-xl border-2 ${selected === 'pages' ? 'border-accent bg-accent bg-opacity-10 text-accent' : 'border-l-0 border-main'}`}
            type="button"
            onClick={() => setSelected('pages')}
          >
            <ImFilesEmpty
              style={{
                width: '24px',
                height: '24px',
                color: selected === 'pages' ? '#E6B9A6' : '#2F3645',
                margin: '0 auto',
                marginBottom: '4px',
              }}
            />
            페이지 범위 입력
          </button>
        </section>
        {selected === 'page' ? (
          <span className="relative">
            <p className="absolute top-0 text-xl font-bold">P.</p>
            <input
              className="border-b-4 border-main text-center font-medium"
              placeholder="페이지 입력"
              ref={pageRef}
              type="number"
            />
          </span>
        ) : (
          <div className="flex">
            <span className="relative">
              <p className="absolute top-0 text-xl font-bold">P.</p>
              <input
                className="w-full border-b-4 border-main text-center font-medium"
                maxLength={5}
                placeholder="페이지 입력"
                ref={pagesStartRef}
                type="number"
              />
            </span>
            <span className="text mx-6 mt-3 flex h-[2px] w-6 items-center justify-center bg-text font-bold opacity-50" />
            <span className="relative">
              <p className="absolute top-0 text-xl font-bold">P.</p>
              <input
                className="w-full border-b-4 border-main text-center font-medium"
                maxLength={5}
                placeholder="페이지 입력"
                ref={pagesEndRef}
                type="number"
              />
            </span>
          </div>
        )}
        <Button handleClick={handleClick} className="mt-8 w-full text-white">
          완료
        </Button>
      </section>
    </HalfScreenModal>
  );
};

export default PageModal;
