type MyInfoHeaderProps = {
  isEdit: boolean;
  onToggleEdit: () => void;
};

const MSG_MY_READING_INFO = '내가 기록한 독서 정보';
const MSG_EDIT_COMPLETE = '완료하기';
const MSG_EDIT_START = '수정하기';

export const MyInfoHeader = ({ isEdit, onToggleEdit }: MyInfoHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <span className="text-caption1 text-neutral-60">{MSG_MY_READING_INFO}</span>
      <button type="button" onClick={onToggleEdit} className="text-body2 text-information outline-none">
        {isEdit ? MSG_EDIT_COMPLETE : MSG_EDIT_START}
      </button>
    </div>
  );
};
