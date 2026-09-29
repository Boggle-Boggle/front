import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import useLayerStore from 'stores/useLayerStore';

import IconButton from 'components/Button/IconButton';
import { TextButton } from 'components/Button/TextButton';
import { Empty } from 'components/Empty';
import { IconEdit } from 'components/icons';
import { ReadingNoteCard } from 'pages/Records/shared/ReadingNoteCard';

import { NoteMenuActionSheet } from './NoteMenuActionSheet';
import { getReadingLogNotes, ReadingNoteResponse } from './api';

type NoteTabProps = {
  readingLogId: string;
  bookTitle: string;
};

const MSG_NOTE_TAB_MORE_TEXT = '노트 전체보기';
const MSG_NOTE_TAB_LOADING = '노트를 불러오는 중입니다...';
const MSG_NOTE_TAB_COUNT_SUFFIX = '개의 독서 노트가 있습니다';
const MSG_NOTE_TAB_EMPTY = '등록된 독서 노트가 없어요.\n첫 노트를 작성해 보세요!';
const MSG_NOTE_TAB_WRITE_ARIA_LABEL = '독서 노트 작성';

export const NoteTab = ({ readingLogId, bookTitle }: NoteTabProps) => {
  const navigate = useNavigate();
  const { push } = useLayerStore();

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['reading-log-notes', readingLogId],
    queryFn: () => getReadingLogNotes(readingLogId),
    enabled: !!readingLogId,
  });

  const handleMoreClick = () => {
    navigate(`/records/${readingLogId}/notes`, { state: { bookTitle } });
  };
  const handleFloatingClick = () => navigate('/notes/new', { replace: true, state: { readingLogId } });

  const handleCardMenuClick = (e: React.MouseEvent, note: ReadingNoteResponse) => {
    e.stopPropagation();
    push({
      id: `note-menu-action-sheet-${note.id}`,
      component: <NoteMenuActionSheet note={note} readingLogId={readingLogId} />,
    });
  };

  if (isLoading)
    return <div className="flex justify-center py-20 text-body2 text-neutral-60">{MSG_NOTE_TAB_LOADING}</div>;

  return (
    <section className="pb-safe-bottom">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-caption1 text-neutral-60">{`${notes.length}${MSG_NOTE_TAB_COUNT_SUFFIX}`}</p>
        <TextButton onClick={handleMoreClick} text={MSG_NOTE_TAB_MORE_TEXT} size="md" variant="default" />
      </div>

      {notes.length === 0 ? (
        <Empty text={MSG_NOTE_TAB_EMPTY} />
      ) : (
        <ul>
          {notes.map((note) => (
            <ReadingNoteCard
              key={note.id}
              note={note}
              bookTitle={bookTitle}
              readingLogId={readingLogId}
              onMenuClick={handleCardMenuClick}
            />
          ))}
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
