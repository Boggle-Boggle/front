import { useQuery } from '@tanstack/react-query';

import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Header from 'components/Header';
import Memo from 'components/Memo';
import Loading from 'pages/Loading';

import useDevice from 'hooks/useDevice';
import useModal from 'hooks/useModal';
import { deleteRecord, getRecord } from 'services/record';

import DeleteModal from './DeleteModal';
import NoteTab from './NoteTab';
import RecordTab from './RecordTab';
import ShelfSvg from './ShelfSvg';

const TABS = ['독서기록', '독서노트'] as const;
const Record = () => {
  const [hasHeaderBackground, setHasHeaderBackground] = useState<boolean>(false);
  const [selected, setSelected] = useState<(typeof TABS)[number]>('독서기록');
  const [isMemoToggled, setIsMemoToggled] = useState<boolean>(false);
  const { isOpen, open, close, scrollPos } = useModal();

  const { isIOS } = useDevice();
  const navigate = useNavigate();
  const location = useLocation();
  const { recordId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['record', recordId],
    queryFn: () => getRecord(recordId!),
  });

  const handleGoToNote = () => {
    navigate(`/note/write`, { state: { recordId } });
  };

  const handleDeleteNote = async () => {
    await deleteRecord(Number(recordId));
    navigate(`/library`);
  };

  const handleModalOpen = () => {
    setIsMemoToggled(false);
    open();
  };

  const setObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        const handleScroll = () => {
          if (isIOS) {
            setHasHeaderBackground(node.scrollTop > 460);
            return;
          }
          setHasHeaderBackground(node.scrollTop > 380);
        };

        node.addEventListener('scroll', handleScroll);

        return () => {
          node.removeEventListener('scroll', handleScroll);
        };
      }
    },
    [isIOS],
  );

  useEffect(() => {
    if (location.state === '독서노트') setSelected(location.state);
  }, [location.state]);

  if (isLoading) return <Loading />;

  return (
    data && (
      <>
        <Header
          withSpacer={false}
          title={
            hasHeaderBackground ? (
              <p className={`${data.bookData.title.length > 20 ? 'text-sm' : 'text-base'}`}>{data.bookData.title}</p>
            ) : (
              ''
            )
          }
          rightBtn={
            <>
              <button aria-label="수정/삭제하기" onClick={() => setIsMemoToggled(true)} type="button" />
              {isMemoToggled && (
                <Memo handleClose={() => setIsMemoToggled(false)}>
                  <div className="absolute right-3 z-30 flex h-20 w-24 flex-col rounded-[4px] bg-main text-sm shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                    <button
                      type="button"
                      className="flex-grow"
                      onClick={() =>
                        navigate(`/edit/${recordId}`, { state: { title: data.bookData.title }, replace: true })
                      }
                    >
                      수정하기
                    </button>
                    <button
                      type="button"
                      className="flex-grow border-t border-text border-opacity-30"
                      onClick={handleModalOpen}
                    >
                      삭제하기
                    </button>
                  </div>
                </Memo>
              )}
            </>
          }
        />

        <div
          className={`${isIOS ? 'height-without-footerIOS' : 'height-without-footerAnd'} relative flex-col overflow-y-auto overflow-x-hidden`}
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

          <section className={`${isIOS ? 'mt-headerIOS' : 'mt-headerAnd'} relative flex h-72 justify-center`}>
            <img
              src={data.bookData.cover}
              alt={`${data.bookData.title} 책 표지`}
              className="absolute bottom-10 z-10 h-60 w-40 shadow-[3px_2px_5px_0_rgba(0,0,0,0.3)]"
            />
            <span className="absolute bottom-10 z-30 h-[14.9rem] w-[0.0625rem] -translate-x-[4.5rem] bg-black opacity-50 blur-[2px]" />
            <span className="absolute -bottom-10 z-[1] w-full bg-white">
              <ShelfSvg />
            </span>
          </section>

          <section className="relative flex h-28 w-full flex-col justify-center bg-white px-7">
            <p className="z-20 text-center font-bold leading-tight">{data.bookData.title}</p>
            <p className="my-2 text-center text-xs opacity-50">{data.bookData.author}</p>
          </section>

          <section className="relative max-w-screen-sm">
            <ul className="grid h-9 w-full grid-cols-2 items-center justify-center">
              {TABS.map((tab) => (
                <li key={tab} className="border-t border-white bg-white">
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
                <div className="h-20" />
                <div className="fixed bottom-0 h-footerIOS w-full max-w-screen-sm">
                  <button
                    type="button"
                    className="absolute bottom-[6.5rem] right-[1rem] flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg"
                    onClick={handleGoToNote}
                    aria-label="독서노트 작성하기"
                  />
                </div>
              </>
            )}
          </section>
        </div>

        {isOpen && <DeleteModal close={close} isOpen={isOpen} scrollPos={scrollPos} deleteNote={handleDeleteNote} />}
      </>
    )
  );
};

export default Record;
