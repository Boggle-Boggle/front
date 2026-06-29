import { ChangeEvent, useState } from 'react';

import { Button } from 'components/Button';
import { ContentModal } from 'components/Layer/ContentModal';

type DateSelectModalProps = {
  title: string;
  onClose: () => void;
};

const MSG_DATE_SELECT_LABEL = '날짜';
const MSG_MODAL_DONE = '완료';

export const DateSelectModal = (props: DateSelectModalProps) => {
  const { title, onClose } = props;
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <ContentModal title={title} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <label htmlFor="record-date-select" className="text-body1 font-medium text-neutral-80">
          {MSG_DATE_SELECT_LABEL}
        </label>
        <input
          id="record-date-select"
          type="date"
          value={selectedDate}
          onChange={handleChangeDate}
          className="h-12 rounded-lg border border-neutral-20 px-4 text-body1 text-neutral-100"
        />
      </div>
      <Button onClick={onClose}>{MSG_MODAL_DONE}</Button>
    </ContentModal>
  );
};
