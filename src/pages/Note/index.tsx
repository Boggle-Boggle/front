import { useQueryClient } from '@tanstack/react-query';

import { useEffect, useRef, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { LuBookmarkPlus, LuTags, LuTrash2 } from 'react-icons/lu';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from 'components/Header';

import useKeyboardStatus from 'hooks/useKeyboardStatus';
import { addNote, updateNote } from 'services/record';

import { AddNoteParams } from 'types/record';

import bookmark from 'assets/bookmarkBig.png';

const MAX_TITLE = 30;
const MAX_CONTENT = 256;

const Note = () => {
  const [noteId, setNoteID] = useState<number>(null);

  const [readDateId, setReadDateId] = useState<number>(null);
  const [selectedDate, setSelectedDate] = useState<string>(Date());
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [page, setPage] = useState<number>(null);
  const [pages, setPages] = useState<AddNoteParams['pages']>(null);
  const [tags, setTags] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isKeyboardActive = useKeyboardStatus();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const { recordId, note } = location.state;

  useEffect(() => {
    if (note) {
      const { noteId, title, content, tags, selectedDate, page, pages } = note;

      setNoteID(noteId);

      if (title) setTitle(title);
      if (content) setContent(content);
      if (tags.length > 0) setTags([...tags]);
      if (page) setPage(page);
      if (pages) setPages({ ...pages });
      if (selectedDate) setSelectedDate(selectedDate);
    }
  }, [note]);

  const handleSave = () => {
    if (!recordId) return;

    if (!title && !content) {
      alert('제목이나 내용을 작성해주세요');
      return;
    }

    if (note && noteId) {
      const newNote: Partial<AddNoteParams> = {};

      // if (selectedDate !== note.selectedDate) newNote.selectedDate = selectedDate;
      if (title !== note.title) newNote.title = title;
      if (content !== note.content) newNote.content = content;
      if (tags.toString() !== note?.tags.toString()) newNote.tags = tags;
      // if (page) {
      //   newNote.page = page;
      //   newNote.pages = null;
      // }
      // if (pages) {
      //   newNote.page = null;
      //   newNote.pages = pages;
      // }

      updateNote(recordId, noteId, newNote);
    } //
    else addNote(recordId, { readDateId, selectedDate: null, title, content, page, pages, tags });

    queryClient.invalidateQueries({ queryKey: ['note', recordId] });
    navigate(`/record/${recordId}`);
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
        title={
          <button type="button" aria-label="회독 선택">
            회독정보없음
          </button>
        }
        leftBtn={<IoArrowBackOutline style={{ width: '24px', height: '24px' }} onClick={() => navigate(-1)} />}
        rightBtn={
          <button className="font-black" onClick={handleSave} type="submit">
            저장
          </button>
        }
      />
      <section className="height-without-footer border-mains flex flex-col overflow-hidden rounded-tl-3xl border border-main bg-white pb-header">
        <img src={bookmark} className="header absolute right-10 top-header block h-12 w-12" alt="" />
        <p className="w-full px-5 py-3 font-semibold opacity-50 focus:outline-none">{selectedDate}</p>
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
      <div
        className={`absolute ${isKeyboardActive ? 'bottom-0' : 'bottom-footer'} h-13 flex w-full items-center justify-between bg-main`}
      >
        <section className="flex">
          <button className="px-3 py-2" onClick={() => {}} type="button" aria-label="페이지 입력하기">
            <LuBookmarkPlus style={{ width: '20px', height: '20px', color: '#9B9999' }} />
          </button>
          <button className="px-3 py-2" onClick={() => {}} type="button" aria-label="태그 추가하기">
            <LuTags style={{ width: '20px', height: '20px', color: '#9B9999' }} />
          </button>
        </section>
        <button className="px-3 py-2" onClick={() => {}} type="button" aria-label="태그 추가하기">
          <LuTrash2 style={{ width: '20px', height: '20px', color: '#9B9999' }} />
        </button>
        {/* TODO : 글자수 처리 로직 추후 구현 */}
        {/* <span className="pr-3 text-sm">{content?.length ?? 0}자/256자</span> */}
      </div>
    </div>
  );
};

export default Note;
