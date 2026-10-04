import { useLocation, useParams } from 'react-router-dom';
import useLayerStore from 'stores/useLayerStore';

import IconButton from 'components/Button/IconButton';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { ResourceFallback } from 'components/ResourceFallback';
import { IconEllipsisVertical } from 'components/icons';
import { NoteMenuActionSheet } from 'pages/Notes/shared/NoteMenuActionSheet';
import { useReadingLogTitleQuery } from 'pages/Notes/shared/queries/useReadingLogTitleQuery';
import { useReadingNoteQuery } from 'pages/Notes/shared/queries/useReadingNoteQuery';

import { NoteDetailContent } from './components/NoteDetailContent';

const MSG_NOTE_DETAIL_MORE = '노트 더보기';

type NoteDetailState = {
  bookTitle?: string;
  readingLogId?: string;
};

const NoteDetail = () => {
  const location = useLocation();
  const { noteId } = useParams();
  const { push } = useLayerStore();

  const { bookTitle: stateBookTitle, readingLogId: stateReadingLogId } = (location.state as NoteDetailState) || {};

  const { data: note, isLoading: isReadingNoteLoading, isError: isReadingNoteError } = useReadingNoteQuery(noteId);

  const readingLogId = stateReadingLogId ?? (note?.readingLogId ? String(note.readingLogId) : undefined);

  const { data: readingLogTitle } = useReadingLogTitleQuery({
    readingLogId,
    enabled: !stateBookTitle,
  });

  const bookTitle = stateBookTitle || readingLogTitle || '독서 노트';

  if (isReadingNoteLoading) return <Loading fullscreen />;

  if (isReadingNoteError || !note) return <ResourceFallback type="readingNoteNotFound" />;

  const handleMoreClick = () => {
    push({
      id: `note-menu-action-sheet-${note.id}`,
      component: <NoteMenuActionSheet note={note} readingLogId={readingLogId} />,
    });
  };

  return (
    <>
      <Header
        title={bookTitle}
        withBack
        rightBtn={<IconButton onClick={handleMoreClick} label={MSG_NOTE_DETAIL_MORE} icon={IconEllipsisVertical} />}
      />

      <NoteDetailContent title={note.title} body={note.body} createdAt={note.createdAt} />
    </>
  );
};

export default NoteDetail;
