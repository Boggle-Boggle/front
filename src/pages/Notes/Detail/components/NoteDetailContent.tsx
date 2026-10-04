import { formatToDotDateTime } from 'utils/date';

type NoteDetailContentProps = {
  title: string;
  body: string;
  createdAt: string;
};

const DEFAULT_NOTE_TITLE = '등록된 제목이 없습니다.';
const DEFAULT_NOTE_BODY = '등록된 내용이 없습니다.';

export const NoteDetailContent = (props: NoteDetailContentProps) => {
  const { title, body, createdAt } = props;

  return (
    <div className="flex h-full flex-col px-mobile">
      <h1 className="pb-3 pt-5 text-title3 text-neutral-80">{title || DEFAULT_NOTE_TITLE}</h1>
      <p className="whitespace-pre-wrap text-left font-serif text-[14px] leading-[1.6] tracking-[-0.28px] text-neutral-80">
        {body || DEFAULT_NOTE_BODY}
      </p>
      <p className="pt-4 text-caption2 text-neutral-60">{formatToDotDateTime(createdAt)}</p>
    </div>
  );
};
