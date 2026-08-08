/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import useLayerStore from 'stores/useLayerStore';

import IconButton from 'components/Button/IconButton';
import { TextButton } from 'components/Button/TextButton';
import { IconEdit, IconEllipsisVertical } from 'components/icons';

import { formatDateTime } from 'utils/format';

import { NoteMenuActionSheet } from './NoteMenuActionSheet';
import { getReadingLogNotes, PageResponse, ReadingNoteResponse } from './api';

type NoteTabProps = {
  readingLogId: string;
  bookTitle: string;
};

const MSG_NOTE_TAB_MORE_TEXT = '노트 전체보기';
const MSG_NOTE_TAB_LOADING = '노트를 불러오는 중입니다...';
const MSG_NOTE_TAB_COUNT_SUFFIX = '개의 독서 노트가 있습니다';
const MSG_NOTE_TAB_EMPTY = '등록된 독서 노트가 없습니다. 첫 노트를 작성해 보세요!';
const MSG_NOTE_TAB_CARD_MENU_ARIA_LABEL = '메모 더보기';
const MSG_NOTE_TAB_WRITE_ARIA_LABEL = '독서 노트 작성';

const formatNotePage = (page: PageResponse) => {
  return `P. ${page.endPage ? `${page.startPage} ~ ${page.endPage}` : page.startPage}`;
};

export const NoteTab = ({ readingLogId, bookTitle }: NoteTabProps) => {
  const navigate = useNavigate();
  const { push } = useLayerStore();

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['reading-log-notes', readingLogId],
    queryFn: () => getReadingLogNotes(readingLogId),
    enabled: !!readingLogId,
  });

  const handleMoreClick = () => {};
  const handleFloatingClick = () => navigate('/notes/new', { state: { readingLogId } });

  const handleCardMenuClick = (e: React.MouseEvent, note: ReadingNoteResponse) => {
    e.stopPropagation();
    push({
      id: `note-menu-action-sheet-${note.id}`,
      component: <NoteMenuActionSheet note={note} />,
    });
  };

  const handleCardClick = (note: ReadingNoteResponse) => {
    navigate(`/notes/${note.id}`, {
      state: {
        note,
        bookTitle,
      },
    });
  };

  const cardShadow = 'shadow-[0_2px_10px_rgba(0,0,0,0.16)]';

  if (isLoading)
    return <div className="flex justify-center py-20 text-body2 text-neutral-60">{MSG_NOTE_TAB_LOADING}</div>;

  return (
    <section className="pb-safe-bottom">
      <div className="flex items-center justify-between">
        <p className="text-caption1 text-neutral-60">{`${notes.length}${MSG_NOTE_TAB_COUNT_SUFFIX}`}</p>
        <TextButton onClick={handleMoreClick} text={MSG_NOTE_TAB_MORE_TEXT} size="md" variant="default" />
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-body2 text-neutral-60">
          {MSG_NOTE_TAB_EMPTY}
        </div>
      ) : (
        <ul className="mt-6">
          {notes.map((note) => {
            return (
              <li
                key={note.id}
                className={`mb-5 flex flex-col rounded-2xl px-4 pb-5 pt-2 ${cardShadow} cursor-pointer text-left`}
                onClick={() => handleCardClick(note)}
              >
                {/* 카드 헤더 */}
                <div className="flex items-center justify-between">
                  <p className="text-body1 font-medium text-neutral-60">{note.title}</p>
                  <IconButton
                    onClick={(e) => handleCardMenuClick(e, note)}
                    label={MSG_NOTE_TAB_CARD_MENU_ARIA_LABEL}
                    icon={IconEllipsisVertical}
                    size="sm"
                    align="right"
                  />
                </div>

                {/* 카드 본문 */}
                <p className="whitespace-pre-wrap break-words pb-3 pt-1 font-serif text-[14px] leading-[1.6]">
                  {note.body}
                </p>

                <p className="text-caption2 text-neutral-60">
                  {note.page
                    ? `${formatDateTime(note.createdAt)} | ${formatNotePage(note.page)}`
                    : formatDateTime(note.createdAt)}
                </p>

                {/* 카드 푸터 (태그 기능 - 잠시 주석 처리) */}
                {/* {note.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center rounded-full border border-primary px-2 py-0.5 text-caption1 text-primary"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )} */}
              </li>
            );
          })}
        </ul>
      )}

      {/* 독서노트 작성 플로팅 */}
      <div className="fixed bottom-6 right-mobile">
        <IconButton
          onClick={handleFloatingClick}
          label={MSG_NOTE_TAB_WRITE_ARIA_LABEL}
          icon={IconEdit}
          className="size-12 rounded-xl bg-primary text-neutral-0 shadow-[0px_4px_8px_0px_rgba(33,34,44,0.16)]"
        />
      </div>
    </section>
  );
};
export default NoteTab;
