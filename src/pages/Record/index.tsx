import { useQuery } from '@tanstack/react-query';

import { useCallback, useState } from 'react';
import { FiArrowLeft, FiMoreVertical, FiEdit } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

import Header from 'components/Header';
import Loading from 'pages/Loading';

import { getRecord } from 'services/record';

import NoteTab from './NoteTab';
import RecordTab from './RecordTab';
import ShelfSvg from './ShelfSvg';

const TABS = ['독서기록', '독서노트'] as const;
const Record = () => {
  const [hasHeaderBackground, setHasHeaderBackground] = useState<boolean>(false);
  const [selected, setSelected] = useState<(typeof TABS)[number]>('독서기록');
  const navigate = useNavigate();
  const { recordId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['record', recordId],
    queryFn: () => getRecord(recordId!),
  });

  const handleGoToNote = () => {
    navigate(`/note/write`, { state: { recordId } });
  };

  const setObserver = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const handleScroll = () => {
        setHasHeaderBackground(node.scrollTop > 200);
      };

      node.addEventListener('scroll', handleScroll);

      return () => {
        node.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  if (isLoading) return <Loading />;

  return (
    data && (
      <>
        <Header
          leftBtn={
            <FiArrowLeft
              style={{ width: '24px', height: '24px', color: hasHeaderBackground ? 'black' : 'white' }}
              onClick={() => navigate(-1)}
            />
          }
          rightBtn={
            <FiMoreVertical style={{ width: '24px', height: '24px', color: hasHeaderBackground ? 'black' : 'white' }} />
          }
          backgroundColor={hasHeaderBackground ? 'bg-white transition-colors' : 'bg-none transition-colors'}
        />

        <div
          className="height-without-footer relative flex-col overflow-y-auto overflow-x-hidden bg-white pt-header"
          ref={(node) => {
            setObserver(node);
          }}
        >
          <div
            style={{
              backgroundImage: `url(${data.bookData.cover})`,
            }}
            className="absolute inset-0 h-[22rem] w-full scale-110 bg-cover opacity-70 blur-sm"
          />
          <div className="absolute inset-0 h-[22rem] w-full overflow-hidden bg-black opacity-30" />

          <section className="relative flex h-72 justify-center">
            <img
              src={data.bookData.cover}
              alt={`${data.bookData.title} 책 표지`}
              className="absolute bottom-10 z-10 h-60 w-40 shadow-[3px_2px_5px_0_rgba(0,0,0,0.3)]"
            />
            <span className="absolute bottom-10 z-30 h-[14.9rem] w-[0.0625rem] -translate-x-[4.5rem] bg-black opacity-50 blur-[2px]" />
            <span className="absolute -bottom-10 w-full">
              <ShelfSvg />
            </span>
          </section>

          <section className="relative flex h-28 w-full flex-col justify-center bg-white px-7">
            <p className="text-center font-bold leading-tight">{data.bookData.title}</p>
            <p className="my-2 text-center text-xs opacity-50">{data.bookData.author}</p>
          </section>

          <section className="relative bg-white">
            <ul className="grid h-9 w-full grid-cols-2 items-center justify-center">
              {TABS.map((tab) => (
                <li key={tab}>
                  <button
                    className={`flex h-full w-full items-center justify-center border-b-[3px] pb-2 ${selected === tab ? 'border-black' : 'border-main'}`}
                    onClick={() => setSelected(tab)}
                    type="button"
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
            {selected === '독서기록' && <RecordTab book={data} />}
            {selected === '독서노트' && recordId && (
              <>
                <NoteTab recordId={recordId} />

                <button
                  type="button"
                  className="fixed bottom-[6rem] right-[1rem] flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg"
                  onClick={handleGoToNote}
                  aria-label="독서노트 작성하기"
                >
                  <FiEdit style={{ width: '24px', height: '24px', color: 'white' }} />
                </button>
              </>
            )}
          </section>
        </div>
      </>
    )
  );
};

export default Record;
