import { Empty } from 'components/Empty';
import { ReadingNoteCard } from 'pages/Notes/shared/ReadingNoteCard';
import type { ReadingNoteResponse } from 'pages/Notes/shared/api';

type NoteListContentProps = {
  notes: ReadingNoteResponse[];
  notesCountText: string;
  emptyText: string;
  bookTitle: string;
  readingLogId?: string;
  onCardMenuClick: (event: React.MouseEvent, note: ReadingNoteResponse) => void;
};

export const NoteListContent = (props: NoteListContentProps) => {
  const { notes, notesCountText, emptyText, bookTitle, readingLogId, onCardMenuClick } = props;

  return (
    <>
      <p className="mb-6 text-caption1 text-neutral-60">{notesCountText}</p>

      {notes.length === 0 ? (
        <Empty text={emptyText} />
      ) : (
        <ul>
          {notes.map((note) => (
            <ReadingNoteCard
              key={note.id}
              note={note}
              bookTitle={bookTitle}
              readingLogId={readingLogId}
              onMenuClick={onCardMenuClick}
            />
          ))}
        </ul>
      )}
    </>
  );
};
