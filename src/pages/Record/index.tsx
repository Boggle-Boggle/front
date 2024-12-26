import { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiMoreVertical } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import Header from 'components/Header';

import NoteTab from './NoteTab';
import RecordTab from './RecordTab';
import ShelfSvg from './ShelfSvg';

const TABS = ['독서기록', '독서노트'] as const;
const Record = () => {
  const [hasHeaderBackground, setHasHeaderBackground] = useState<boolean>(false);
  const [selected, setSelected] = useState<(typeof TABS)[number]>('독서기록');
  const observer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // TODO : 독서노트 이동 로직
  // const { recordId } = useParams();
  // const handleGoToNote = () => {
  //   navigate(`/note/write`, { state: { recordId } });
  // };

  useEffect(() => {
    const container = observer.current;
    if (!container) return undefined;

    const handleScroll = () => {
      setHasHeaderBackground(container.scrollTop > 200);
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
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

      <div className="height-without-footer relative flex-col overflow-y-auto bg-white pt-header" ref={observer}>
        <div className="absolute inset-0 h-[22rem] w-full overflow-hidden bg-[url('https://image.aladin.co.kr/product/11644/49/cover500/8965962285_2.jpg')] bg-cover opacity-70 blur-sm" />
        <div className="absolute inset-0 h-[22rem] w-full overflow-hidden bg-black opacity-30" />

        <section className="relative flex h-72 justify-center">
          <img
            src="https://image.aladin.co.kr/product/11644/49/cover500/8965962285_2.jpg"
            alt="책 커버"
            className="absolute bottom-10 z-10 h-60 w-40 shadow-[3px_2px_5px_0_rgba(0,0,0,0.3)]"
          />
          <span className="absolute -bottom-10 w-full">
            <ShelfSvg />
          </span>
        </section>

        <section className="relative flex h-28 w-full flex-col bg-white px-7" ref={observer}>
          <p className="text-center font-bold leading-tight">
            파과(구병모 장편소설) 파과(구병모 장편소설) 파과(구병모 장편소설) 파과(구병모 장편소설) 파과(구병모
            장편소설)
          </p>
          <p className="my-2 text-center text-xs opacity-50">
            흔한남매 (원작),김희목,정현철,권경아,최진수 (기획),이현진,닥터 스코 (글),김덕영 (그림),김희목 (감수)
          </p>
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
          {selected === '독서기록' && <RecordTab />}
          {selected === '독서노트' && <NoteTab />}
        </section>
      </div>
    </>
  );
};

export default Record;
