import { useQuery } from '@tanstack/react-query';

import { useLocation } from 'react-router-dom';
import useLayerStore from 'stores/useLayerStore';
import useToastStore from 'stores/useToastStore';

import IconButton from 'components/Button/IconButton';
import { Header } from 'components/Header';
import { IconEllipsisVertical } from 'components/icons';
import { NoteMenuActionSheet } from 'pages/Records/Detail/NoteMenuActionSheet';
import { getReadingLogDetail, ReadingNoteResponse } from 'pages/Records/Detail/api';

import { formatDateTime } from 'utils/date';

const MSG_NOTE_DETAIL_MORE = '노트 더보기';
// const MSG_NOTE_DETAIL_TAG = '태그';

type NoteDetailState = {
  note?: ReadingNoteResponse;
  bookTitle?: string;
};

const NoteDetail = () => {
  const location = useLocation();
  const { push } = useLayerStore();
  const { addToast } = useToastStore();

  const { note, bookTitle: stateBookTitle } = (location.state as NoteDetailState) || {};

  // React Query를 사용하여 상위 독서기록상세에서 책 제목을 비동기 조회 (Prop Drilling 소거)
  const { data: readingLogData } = useQuery({
    queryKey: ['reading-log', note?.readingLogId],
    queryFn: () => getReadingLogDetail(note!.readingLogId!),
    enabled: !stateBookTitle && !!note?.readingLogId,
  });

  const bookTitle = stateBookTitle || readingLogData?.book.title || '독서 노트';

  const handleMoreClick = () => {
    if (!note) {
      addToast({ type: 'info', description: '노트 정보가 존재하지 않습니다.' });
      return;
    }

    push({
      id: `note-menu-action-sheet-${note.id}`,
      component: <NoteMenuActionSheet note={note} />,
    });
  };
  if (!note) return <div>dd</div>;

  return (
    <>
      <Header
        title={bookTitle}
        withBack
        rightBtn={<IconButton onClick={handleMoreClick} label={MSG_NOTE_DETAIL_MORE} icon={IconEllipsisVertical} />}
      />

      <div className="flex h-full flex-col px-mobile">
        <h1 className="pb-3 pt-5 text-title3 text-neutral-80">{note.title || '등록된 제목이 없습니다.'}</h1>
        <p className="whitespace-pre-wrap text-left font-serif text-[14px] leading-[1.6] tracking-[-0.28px] text-neutral-80">
          {note.body || '등록된 내용이 없습니다.'}
        </p>
        <p className="text-caption2 text-neutral-60">{formatDateTime(note.createdAt)}</p>

        {/* 태그 영역
          {note?.tags && (
            <div className="flex items-center gap-3">
              <p className="shrink-0 font-pretendard text-[14px] font-medium leading-[1.4] text-neutral-80">
                {MSG_NOTE_DETAIL_TAG} :
              </p>
              <div className="flex flex-wrap gap-1">
                {note.tags.length > 0 ? (
                  note.tags.map((tag: { id: number; name: string }) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center rounded-full border border-primary bg-neutral-0 px-2 py-0.5 text-caption1 font-medium text-primary"
                    >
                      {tag.name}
                    </span>
                  ))
                ) : (
                  <span className="text-caption2 font-light text-neutral-60">등록된 태그가 없습니다.</span>
                )}
              </div>
            </div>
          )} */}
      </div>
    </>
  );
};

export default NoteDetail;
