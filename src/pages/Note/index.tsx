import { useRef, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from 'components/Header';

import { addNote } from 'services/record';

import bookmark from 'assets/bookmarkBig.png';

const MAX_TITLE = 30;
const MAX_CONTENT = 256;

const Note = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { recordId } = location.state;
  console.log(`${recordId} 번 독서노트 작성중`);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    if (title.length === 0) {
      alert('제목을 적어주세요');
      return;
    }

    if (content.length === 0) {
      alert('내용을 적어주세요');
      return;
    }
    const { recordId } = location.state;

    if (recordId) {
      addNote(recordId, { title, content });
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;

    if (newTitle.length > MAX_TITLE) return;

    setTitle(newTitle);

    if (textareaRef.current) {
      const textArea = textareaRef.current;

      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;

    if (newContent.length < MAX_CONTENT) setContent(newContent);
  };

  return (
    <div className="relative h-screen bg-gray">
      <Header
        title={<>독서 노트</>}
        leftBtn={<IoArrowBackOutline style={{ width: '24px', height: '24px' }} onClick={handleGoBack} />}
        rightBtn={
          <button className="font-black" onClick={handleSave} type="submit">
            저장
          </button>
        }
      />
      <section className="height-without-footer border-mains flex flex-col overflow-hidden rounded-tl-3xl border border-main bg-white pb-header">
        <img src={bookmark} className="header absolute right-10 top-header block h-12 w-12" alt="" />
        <p className="w-full px-5 py-3 font-semibold opacity-50 focus:outline-none">2024년 12월 21일</p>
        <textarea
          rows={1}
          className="w-full resize-none overflow-hidden border-b-[1px] border-main px-5 pb-3 font-bold focus:outline-none"
          value={title}
          placeholder="제목을 작성해주시핑"
          onChange={(e) => handleChangeTitle(e)}
          ref={textareaRef}
        />

        <textarea
          className="w-full flex-grow resize-none overflow-auto px-5 py-3 focus:outline-none"
          value={content}
          placeholder="내용을 작성해주시핑"
          onChange={(e) => handleChangeContent(e)}
        />
      </section>
      {/* 키보드 활성화 여부에 따라 top-범위 지정 */}
      <div className="absolute bottom-footer flex h-10 w-full items-center justify-between bg-main">
        <section>
          {/* TODO : 2차 배포에 포함. 노트추가 부가기능 */}
          {/* <button className="px-3 py-2" onClick={() => {}} type="button">
      <PiBooksDuotone style={{ width: '24px', height: '24px', color: '#9B9999' }} />
    </button>
    <button className="px-3 py-2" onClick={() => {}} type="button">
      <PiBooksDuotone style={{ width: '24px', height: '24px', color: '#9B9999' }} />
    </button>
    <button className="px-3 py-2" onClick={() => {}} type="button">
      <PiBooksDuotone style={{ width: '24px', height: '24px', color: '#9B9999' }} />
    </button>
    <button className="px-3 py-2" onClick={() => {}} type="button">
      <PiBooksDuotone style={{ width: '24px', height: '24px', color: '#9B9999' }} />
    </button> */}
        </section>

        <span className="pr-3 text-sm">{content?.length ?? 0}자/256자</span>
      </div>
    </div>
  );
};

export default Note;
