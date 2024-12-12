import { useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from 'components/ui/Header';

import { addNote } from 'services/record';

import bookmark from 'assets/bookmarkBig.png';

const MAXTITLE = 30;
const MAXCONTENT = 256;

const Note = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    if (newTitle.length < MAXTITLE) setTitle(newTitle);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;

    if (newContent.length < MAXCONTENT) setContent(newContent);
  };

  return (
    <div className="relative h-screen bg-gray">
      <Header
        title={{ text: '독서 노트' }}
        leftBtn={{
          icon: <IoArrowBackOutline style={{ width: '24px', height: '24px' }} />,
          handleLeftBtnClick: handleGoBack,
        }}
        rightBtn={{
          icon: <span>저장</span>,
          handleRightBtnClick: handleSave,
        }}
      />
      <section className="height-without-footer flex flex-col overflow-hidden rounded-tl-3xl bg-white pb-header">
        <img src={bookmark} className="h-13 header absolute left-10 top-[63px] block w-12" alt="" />
        <input
          className="w-full p-4 text-center font-semibold focus:outline-none"
          value={title}
          placeholder="제목을 작성해주시핑"
          onChange={(e) => handleChangeTitle(e)}
        />
        <textarea
          className="w-full flex-grow resize-none overflow-auto p-3 focus:outline-none"
          value={content}
          placeholder="내용을 작성해주시핑"
          onChange={(e) => handleChangeContent(e)}
        />
        <div className="flex h-10 items-center justify-between bg-main">
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
      </section>
    </div>
  );
};

export default Note;
