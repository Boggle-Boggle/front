/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import IconButton from 'components/Button/IconButton';
import { IconEllipsisVertical } from 'components/icons';
import type { PageResponse, ReadingNoteResponse } from 'pages/Records/Detail/api';

import { formatToDotDateTime } from 'utils/date';

type ReadingNoteCardProps = {
  note: ReadingNoteResponse;
  onClick: (note: ReadingNoteResponse) => void;
  onMenuClick: (event: React.MouseEvent, note: ReadingNoteResponse) => void;
};

const MSG_READING_NOTE_CARD_MENU_ARIA_LABEL = '메모 더보기';

const formatNotePage = (page: PageResponse) => {
  return `P. ${page.endPage ? `${page.startPage} ~ ${page.endPage}` : page.startPage}`;
};

export const ReadingNoteCard = (props: ReadingNoteCardProps) => {
  const { note, onClick, onMenuClick } = props;

  const cardShadow = 'shadow-[0_2px_10px_rgba(0,0,0,0.16)]';
  const noteMetaText = note.page
    ? `${formatToDotDateTime(note.createdAt)} | ${formatNotePage(note.page)}`
    : formatToDotDateTime(note.createdAt);

  return (
    <li
      className={`mb-5 flex cursor-pointer flex-col rounded-2xl px-4 pb-5 pt-2 text-left ${cardShadow}`}
      onClick={() => onClick(note)}
    >
      <div className="flex items-center justify-between">
        <p className="truncate text-body1 font-medium text-neutral-60">{note.title}</p>
        <IconButton
          onClick={(event) => onMenuClick(event, note)}
          label={MSG_READING_NOTE_CARD_MENU_ARIA_LABEL}
          icon={IconEllipsisVertical}
          size="sm"
          align="right"
        />
      </div>

      <p className="whitespace-pre-wrap break-words pb-3 pt-1 font-serif text-[14px] leading-[1.6] tracking-[-0.28px] text-neutral-80">
        {note.body}
      </p>

      <p className="text-caption2 text-neutral-60">{noteMetaText}</p>
    </li>
  );
};
