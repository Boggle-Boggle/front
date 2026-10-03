import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useLayerStore from 'stores/useLayerStore';

import IconButton from 'components/Button/IconButton';
import { Empty } from 'components/Empty';
import { Header } from 'components/Header';
import { BackButton } from 'components/Header/BackButton';
import { Loading } from 'components/Loading';
import { ResourceFallback } from 'components/ResourceFallback';
import { Searchbar } from 'components/Searchbar';
import { IconEdit, IconSearch } from 'components/icons';
import { NoteMenuActionSheet } from 'pages/Notes/shared/NoteMenuActionSheet';
import { ReadingNoteCard } from 'pages/Notes/shared/ReadingNoteCard';
import type { ReadingNoteResponse } from 'pages/Notes/shared/api';
import { useReadingLogNotesQuery } from 'pages/Notes/shared/queries/useReadingLogNotesQuery';
import { useReadingLogTitleQuery } from 'pages/Notes/shared/queries/useReadingLogTitleQuery';

import { useScrollRestoration } from 'hooks/useScrollRestoration';

type RecordNotesLocationState = {
  bookTitle?: string;
};

const MSG_RECORD_NOTES_COUNT_SUFFIX = '개의 독서 노트가 있습니다';
const MSG_RECORD_NOTES_EMPTY = '등록된 독서 노트가 없어요.\n첫 노트를 작성해 보세요!';
const MSG_RECORD_NOTES_SEARCH_EMPTY = '검색 결과가 없어요.';
const MSG_RECORD_NOTES_SEARCH_ARIA_LABEL = '노트 검색';
const MSG_RECORD_NOTES_WRITE_ARIA_LABEL = '독서 노트 작성';
const MSG_RECORD_NOTES_SEARCH_PLACEHOLDER = '노트 검색';
const DEFAULT_RECORD_NOTES_TITLE = '독서 노트';

const RecordNotes = () => {
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const { recordId } = useParams();
  const { push } = useLayerStore();

  const locationState = location.state as RecordNotesLocationState | undefined;

  const {
    data: notes = [],
    isLoading: isReadingLogNotesLoading,
    isError: isReadingLogNotesError,
  } = useReadingLogNotesQuery(recordId);
  const scrollContainerRef = useScrollRestoration<HTMLElement>({
    isReady: !isReadingLogNotesLoading,
  });

  const { data: readingLogTitle } = useReadingLogTitleQuery({
    readingLogId: recordId,
    enabled: !locationState?.bookTitle,
  });

  const filteredNotes = useMemo(() => {
    const trimmedKeyword = searchKeyword.trim().toLowerCase();
    if (!trimmedKeyword) return notes;

    return notes.filter((note) => {
      const targetText = [note.title, note.body, ...note.tags.map((tag) => tag.name)].join(' ').toLowerCase();
      return targetText.includes(trimmedKeyword);
    });
  }, [notes, searchKeyword]);

  const bookTitle = locationState?.bookTitle || readingLogTitle || DEFAULT_RECORD_NOTES_TITLE;
  const notesCountText = `${filteredNotes.length}${MSG_RECORD_NOTES_COUNT_SUFFIX}`;
  const emptyText = searchKeyword.trim() ? MSG_RECORD_NOTES_SEARCH_EMPTY : MSG_RECORD_NOTES_EMPTY;

  const handleOpenSearchMode = () => setIsSearchMode(true);

  const handleCloseSearchMode = () => {
    setIsSearchMode(false);
    setSearchKeyword('');
  };

  const handleFloatingClick = () => navigate('/notes/new', { replace: true, state: { readingLogId: recordId } });

  const handleCardMenuClick = (event: React.MouseEvent, note: ReadingNoteResponse) => {
    event.stopPropagation();
    push({
      id: `note-menu-action-sheet-${note.id}`,
      component: <NoteMenuActionSheet note={note} readingLogId={recordId} />,
    });
  };

  if (isReadingLogNotesLoading) return <Loading fullscreen />;

  if (isReadingLogNotesError) return <ResourceFallback type="readingLogNotFound" />;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {isSearchMode ? (
        <div className="flex w-full items-center justify-start pr-mobile pt-safe-top">
          <BackButton onClick={handleCloseSearchMode} />
          <Searchbar
            value={searchKeyword}
            onChange={setSearchKeyword}
            placeholder={MSG_RECORD_NOTES_SEARCH_PLACEHOLDER}
            className="grow"
          />
        </div>
      ) : (
        <Header
          title={bookTitle}
          withBack
          rightBtn={
            <IconButton onClick={handleOpenSearchMode} label={MSG_RECORD_NOTES_SEARCH_ARIA_LABEL} icon={IconSearch} />
          }
        />
      )}

      <section ref={scrollContainerRef} className="min-h-0 flex-1 overflow-y-auto px-mobile pb-24 pt-6">
        <p className="mb-6 text-caption1 text-neutral-60">{notesCountText}</p>

        {filteredNotes.length === 0 ? (
          <Empty text={emptyText} />
        ) : (
          <ul>
            {filteredNotes.map((note) => (
              <ReadingNoteCard
                key={note.id}
                note={note}
                bookTitle={bookTitle}
                readingLogId={recordId}
                onMenuClick={handleCardMenuClick}
              />
            ))}
          </ul>
        )}
      </section>

      {/* 독서노트 작성 플로팅 */}
      <div className="fixed bottom-6 right-mobile">
        <IconButton
          onClick={handleFloatingClick}
          label={MSG_RECORD_NOTES_WRITE_ARIA_LABEL}
          icon={IconEdit}
          className="size-12 rounded-xl bg-primary text-neutral-0 shadow-[0px_4px_8px_0px_rgba(33,34,44,0.16)]"
        />
      </div>
    </div>
  );
};

export default RecordNotes;
