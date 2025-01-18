import { useEffect, useState } from 'react';
import { ImFileEmpty, ImFilesEmpty } from 'react-icons/im';

import Button from 'components/Button';
import HalfScreenModal from 'components/HalfScreenModal';

import { AddNoteParams } from 'types/record';

type PageModalProps = {
  page: number | null;
  pages: AddNoteParams['pages'];
  setPage: React.Dispatch<React.SetStateAction<number | null>>;
  setPages: React.Dispatch<React.SetStateAction<AddNoteParams['pages']>>;
  close: () => void;
};
const PageModal = ({ page, pages, setPage, setPages, close }: PageModalProps) => {
  const [selected, setSelected] = useState<'page' | 'pages'>('page');
  const [pageValue, setPageValue] = useState<string>('');
  const [startPageValue, setStartPageValue] = useState<string>('');
  const [endPageValue, setEndPageValue] = useState<string>('');

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'page' | 'startPage' | 'endPage') => {
    const { value } = e.target;

    const numericValue = Number(value);

    if (numericValue > 99999 || numericValue < 0) return;

    if (type === 'page') setPageValue(value);
    if (type === 'startPage') setStartPageValue(value);
    if (type === 'endPage') setEndPageValue(value);
  };

  const handleClick = () => {
    if (selected === 'page') {
      setPage(Number(pageValue));
      setPages(null);
      close();
    }

    if (selected === 'pages') {
      if (startPageValue === '' || endPageValue === '' || Number(startPageValue) > Number(endPageValue)) {
        alert('페이지번호가 올바르지 않아요');
        return;
      }

      const newPages = {
        startPage: Number(startPageValue),
        endPage: Number(endPageValue),
      };

      setPages(newPages);
      setPage(null);
      close();
    }
  };

  useEffect(() => {
    if (page) {
      setPageValue(page.toString());

      return;
    }

    if (!pages) return;
    setSelected('pages');
    const startPage = pages?.startPage;
    const endPages = pages?.endPage;

    setStartPageValue(startPage.toString());
    setEndPageValue(endPages.toString());
  }, [page, pages, setPage]);

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
              value={pageValue}
              onChange={(e) => handlePageChange(e, 'page')}
              type="number"
              inputMode="numeric"
              aria-label="페이지 입력"
            />
          </span>
        ) : (
          <div className="flex">
            <span className="relative">
              <p className="absolute top-0 text-xl font-bold">P.</p>
              <input
                className="w-full border-b-4 border-main text-center font-medium"
                placeholder="페이지 입력"
                value={startPageValue}
                onChange={(e) => handlePageChange(e, 'startPage')}
                type="number"
                inputMode="numeric"
                aria-label="페이지 입력"
              />
            </span>
            <span className="text mx-6 mt-3 flex h-[2px] w-6 items-center justify-center bg-text font-bold opacity-50" />
            <span className="relative">
              <p className="absolute top-0 text-xl font-bold">P.</p>
              <input
                className="w-full border-b-4 border-main text-center font-medium"
                placeholder="페이지 입력"
                value={endPageValue}
                onChange={(e) => handlePageChange(e, 'endPage')}
                type="number"
                inputMode="numeric"
                aria-label="페이지 입력"
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
