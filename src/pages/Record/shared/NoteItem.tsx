import { CiShoppingTag } from 'react-icons/ci';

import { formatDateTimeToDate } from 'utils/format';

import { Note } from 'types/record';

type NoteItemProps = {
  note: Note;
};

const NoteItem = ({ note }: NoteItemProps) => {
  const { title, content, tags, selectedDate, page, pages } = note;
  return (
    <section className="border-b-4 border-main p-7 text-center">
      <p className="font-bold">{title}</p>
      <p className="pb-4 pt-2 text-xs opacity-50">
        {selectedDate && formatDateTimeToDate(selectedDate)}
        {page && `p.${page}`}
        {pages && `p.${pages.startPage}~p.${pages.endPage}`}
      </p>
      <p className="pb-[0.875rem] text-xs leading-5">{content}</p>
      <div className="border-t-[1px] border-main pt-[0.875rem] font-bold">
        {tags && (
          <>
            <p>
              <CiShoppingTag style={{ width: '18px', height: '18px', display: 'inline', marginBottom: '3px' }} /> 태그
            </p>
            {tags.map((tag) => (
              <p className="mt-1 text-xs opacity-70">{tag}</p>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default NoteItem;
