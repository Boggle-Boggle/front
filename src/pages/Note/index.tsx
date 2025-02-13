import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Alert from 'components/Alert';
import Header from 'components/Header';
import Icon from 'components/Icon';
import Memo from 'components/Memo';

import useDevice from 'hooks/useDevice';
import useModal from 'hooks/useModal';
import { addNote, deleteNote, getReadDates, updateNote } from 'services/record';
import { formatDate, formatDateAndTime, generateDate } from 'utils/format';

import { AddNoteParams, RecordDate } from 'types/record';

import { CommonBack, CommonUp, ReadingNotePageInput, ReadingNoteTags, ReadingNoteTrash } from 'assets/icons';
import bookmarkImg from 'assets/library/note_bookmark.png';

import DatePickModal from './DatePickModal';
import DeleteModal from './DeleteModal';
import PageModal from './PageModal';
import TagModal from './TagModal';

const MAX_TITLE = 50;
const MAX_CONTENT = 1024;

const Note = () => {
  const [noteId, setNoteID] = useState<number | null>(null);
  const [isMemoToggled, setIsMemoToggled] = useState<boolean>(false);

  const [readDateId, setReadDateId] = useState<(RecordDate & { readDateIndex: number }) | null>(null);
  const [selectedDate, setSelectedDate] = useState<[number, number, number]>(() => {
    const { year, month, day } = generateDate();

    return [year - 2000, month, day];
  });
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [page, setPage] = useState<number | null>(null);
  const [pages, setPages] = useState<AddNoteParams['pages']>(null);
  const [tags, setTags] = useState<string[]>([]);

  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  const [isEditTag, setIsEditTag] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isOpen: isDateModalOpen,
    open: openDateModal,
    close: closeDateModal,
    scrollPos: dateModalScrollPos,
  } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    open: openDeleteModal,
    close: closeDeleteModal,
    scrollPos: deleteModalScrollPos,
  } = useModal();
  const { isIOS } = useDevice();

  const { recordId, note, readDateIndex } = location.state;

  const { data: readDateIds, isFetched } = useQuery({
    queryKey: ['readDate', recordId],
    queryFn: () => getReadDates(recordId),
  });

  const handleSave = async () => {
    if (!recordId) return;

    if (!title && !content) {
      handleAlertActive();
      return;
    }

    if (note && noteId) {
      const newNote: Partial<AddNoteParams> = {};

      newNote.selectedDate = formatDate(...selectedDate);
      if (readDateId) newNote.readDateId = readDateId.readDateId;
      if (title !== note.title) newNote.title = title;
      if (content !== note.content) newNote.content = content;
      if (tags.toString() !== note?.tags.toString()) newNote.tags = tags;
      if (page) {
        newNote.page = page;
        newNote.pages = null;
      }
      if (pages) {
        newNote.page = null;
        newNote.pages = pages;
      }

      await updateNote(recordId, noteId, newNote);
    } //
    else
      await addNote(recordId, {
        readDateId: readDateId?.readDateId ?? null,
        selectedDate: formatDate(...selectedDate),
        title,
        content,
        page,
        pages,
        tags,
      });

    // 노트 작성 후 쿼리무효화
    queryClient.invalidateQueries({ queryKey: ['note', recordId] });
    navigate(`/record/${recordId}`, { state: '독서노트', replace: true });
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length > MAX_TITLE) return;

    setTitle(newTitle);
    adjustHeight();
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;

    if (newContent.length < MAX_CONTENT) setContent(newContent);
  };

  const handleDeleteNote = async () => {
    if (noteId) await deleteNote(recordId, noteId);

    navigate(`/record/${recordId}`, { state: '독서노트', replace: true });
  };

  // 첫 화면 렌더링 시 초기값을 세팅하는 이펙트
  useEffect(() => {
    // 수정일 경우 note 데이터가 있음
    if (note) {
      const { noteId, title, content, tags, page, pages, selectedDate } = note;

      setNoteID(noteId);

      if (selectedDate) {
        const { yy, mm, dd } = formatDateAndTime(selectedDate);

        setSelectedDate([+yy - 2000, +mm, +dd]);
      }
      if (title) setTitle(title);
      if (content) setContent(content);
      if (tags.length > 0) setTags([...tags]);
      if (page) setPage(page);
      if (pages) setPages({ ...pages });

      // 수정중인데 회독 정보가 있다. -> location에서 회독정보를 가져와 초기 세팅
      if (readDateIds && readDateIds.length) {
        setReadDateId(readDateIds[readDateIndex - 1]);
      }
      // 수정중인데 회독 정보가 없다. -> 회독정보가 널이여서 회독정보 없음을 띄워줘야함
    }
    // 수정이 아닌 경우 note 데이터가 없음
    // 첫 등록인데 회독 정보가 있다. -> 가장 마지막 회독을 자동으로 선택
    else if (!note && readDateIds) setReadDateId(readDateIds[readDateIds.length - 1]);
    // 첫 등록인데 회독 정보가 없다. -> 회독정보가 널이여서 회독정보 없음을 띄워줘야함

    setTimeout(() => {
      adjustHeight();
    }, 0);
  }, [note, readDateIds, readDateIndex]);

  return (
    isFetched && (
      <>
        {isAlertActive && <Alert message="제목이나 내용이 비어있어요" onClose={handleAlertActive} />}
        <div className="h-screen bg-gray">
          <Header
            title={
              <>
                <button
                  type="button"
                  aria-label="회독 선택"
                  className={`relative inline-flex ${readDateIds && readDateIds && readDateIds.length === 0 && 'opacity-50'} `}
                  onClick={() => setIsMemoToggled(true)}
                >
                  {readDateId ? `${readDateId.readDateIndex + 1}회독` : '회독정보없음'}
                  {readDateIds && readDateIds.length > 0 && (
                    <Icon Component={CommonUp} size="sm" style={{ marginLeft: '1px' }} />
                  )}
                </button>
                {isMemoToggled && (
                  <Memo handleClose={() => setIsMemoToggled(false)}>
                    <ul className="absolute left-1/2 z-30 flex max-h-80 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-auto rounded-lg bg-white shadow-lg">
                      {readDateIds &&
                        readDateIds.map((readDate, idx) => (
                          <li key={readDate.readDateId} className="mt-[1px] h-12 w-full border-b border-main">
                            <button
                              className="h-full w-full"
                              type="button"
                              onClick={() => {
                                setIsMemoToggled(false);
                                setReadDateId(readDate);
                              }}
                            >
                              {idx + 1}회독
                            </button>
                          </li>
                        ))}
                    </ul>
                  </Memo>
                )}
              </>
            }
            leftBtn={
              <button
                onClick={() => navigate(`/record/${recordId}`, { replace: true })}
                aria-label="뒤로가기"
                type="button"
              >
                <Icon Component={CommonBack} />
              </button>
            }
            rightBtn={
              <button className="font-black" onClick={handleSave} type="submit">
                저장
              </button>
            }
          />

          <section
            className={`border-mains ${isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd'} flex flex-col overflow-hidden rounded-tl-3xl border border-main bg-white`}
          >
            <img
              src={bookmarkImg}
              className={`${isIOS ? 'headerIOS top-headerIOS' : 'headerAnd top-headerAnd'} absolute right-10 block h-12 w-12`}
              alt=""
            />
            {page !== null && page !== 0 && <p className="absolute right-2 pt-2 opacity-50">{`p.${page}`}</p>}
            {pages !== null && (
              <p className="absolute right-2 pt-2 opacity-50">{`p.${pages.startPage}-p.${pages.endPage}`}</p>
            )}
            <button
              className="w-full px-5 py-3 text-start font-semibold opacity-50"
              type="button"
              onClick={openDateModal}
            >
              {`${selectedDate[0] + 2000}년 ${selectedDate[1]}월 ${selectedDate[2]}일`}
            </button>
            <textarea
              rows={1}
              className="w-full resize-none overflow-hidden border-b-[1px] border-main px-5 pb-3 font-bold"
              value={title}
              placeholder="제목을 작성해주세요"
              onChange={(e) => handleChangeTitle(e)}
              ref={textareaRef}
            />
            <textarea
              className="w-full flex-grow resize-none overflow-auto px-5 py-3"
              value={content}
              placeholder="내용을 작성해주세요"
              onChange={(e) => handleChangeContent(e)}
            />
            <div className="h-40 overflow-y-auto border-t border-main px-4 py-2">
              <p className="flex items-center">
                <Icon Component={ReadingNoteTags} size="sm" style={{ color: '#9B9999', marginRight: '4px' }} />
                태그
              </p>
              {tags.map((tag) => (
                <p className="inline-flex pr-2 text-sm opacity-70">{`#${tag}`}</p>
              ))}
            </div>
          </section>

          <div className="absolute bottom-1 flex h-12 w-full items-center justify-between bg-main px-2">
            <section className="flex">
              <button
                className="px-3 py-2"
                onClick={() => setIsEditPage(true)}
                type="button"
                aria-label="페이지 입력하기"
              >
                <Icon Component={ReadingNotePageInput} size="sm" style={{ color: '#9B9999' }} />
              </button>
              <button className="px-3 py-2" onClick={() => setIsEditTag(true)} type="button" aria-label="태그 추가하기">
                <Icon Component={ReadingNoteTags} size="sm" style={{ color: '#9B9999' }} />
              </button>
            </section>
            <button className="px-3 py-2" onClick={openDeleteModal} type="button" aria-label="독서노트 삭제하기">
              <Icon Component={ReadingNoteTrash} size="sm" style={{ color: '#9B9999' }} />
            </button>
            {/* TODO : 글자수 처리 로직 추후 구현 */}
            {/* <span className="pr-3 text-sm">{content?.length ?? 0}자/256자</span> */}
          </div>
          {isDateModalOpen && (
            <DatePickModal
              isOpen={isDateModalOpen}
              close={closeDateModal}
              scrollPos={dateModalScrollPos}
              setSelectedDate={setSelectedDate}
              initialDate={selectedDate}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteModal
              close={closeDeleteModal}
              isOpen={isDeleteModalOpen}
              scrollPos={deleteModalScrollPos}
              deleteNote={handleDeleteNote}
            />
          )}
          {isEditPage && (
            <PageModal
              close={() => setIsEditPage(false)}
              page={page}
              pages={pages}
              setPage={setPage}
              setPages={setPages}
            />
          )}
          {isEditTag && <TagModal close={() => setIsEditTag(false)} tags={tags} setTags={setTags} />}
        </div>
      </>
    )
  );
};

export default Note;
