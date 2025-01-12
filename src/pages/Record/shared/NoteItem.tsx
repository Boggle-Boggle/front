import { CiShoppingTag } from 'react-icons/ci';
import { useNavigate, useParams } from 'react-router-dom';

import { formatDateTimeToDate } from 'utils/format';

import { Note } from 'types/record';

type NoteItemProps = {
  note: Note;
  readDateIndex: number;
};

const NoteItem = ({ note, readDateIndex }: NoteItemProps) => {
  const { title, content, tags, selectedDate, page, pages } = note;

  const navigate = useNavigate();
  const { recordId } = useParams();

  const handleGoToNote = () => {
    navigate(`/note/write`, { state: { recordId, note, readDateIndex }, replace: true });
  };

  return (
    <button className="w-full border-b-4 border-main p-7 text-center" type="button" onClick={handleGoToNote}>
      <p className="font-bold">{title}</p>
      <p className="pb-4 pt-2 text-xs opacity-50">
        {selectedDate && formatDateTimeToDate(selectedDate)}
        {'\r'}
        {page && `P.${page}`}
        {pages && `P.${pages.startPage}~P.${pages.endPage}`}
      </p>
      <p className="pb-[0.875rem] text-xs leading-5">{content}</p>

      {tags && tags.length > 0 && (
        <div className="border-t-[1px] border-main pt-[0.875rem] font-bold">
          <p>
            <CiShoppingTag style={{ width: '18px', height: '18px', display: 'inline', marginBottom: '3px' }} /> 태그
          </p>
          {tags.map((tag) => (
            <p className="mr-2 mt-1 inline-flex text-xs opacity-70">{`#${tag}`}</p>
          ))}
        </div>
      )}
    </button>
  );
};

export default NoteItem;
