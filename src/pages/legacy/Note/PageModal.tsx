import { useEffect, useReducer, useState } from 'react';

import Alert from 'components/Alert';
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
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);

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
        handleAlertActive();
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
    <>
      {isAlertActive && <Alert message="페이지 번호가 올바르지 않아요" onClose={handleAlertActive} />}

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
              단일 페이지 입력
            </button>
            <button
              className={`h-[5.5rem] w-1/2 rounded-r-xl border-2 ${selected === 'pages' ? 'border-accent bg-accent bg-opacity-10 text-accent' : 'border-l-0 border-main'}`}
              type="button"
              onClick={() => setSelected('pages')}
            >
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
    </>
  );
};

export default PageModal;
