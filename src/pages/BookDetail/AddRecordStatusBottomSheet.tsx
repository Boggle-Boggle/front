import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { Button } from 'components/Button';
import { BottomSheet } from 'components/Layer/BottomSheet';
import { ADD_RECORD_STATUS_OPTIONS } from 'pages/Records/shared/recordStatus';

import type { AddRecordStatus, BookDetail } from 'types';

const MSG_ADD_RECORD_STATUS_TITLE = '이 책을 내 책 목록에 추가하시겠어요?';
const MSG_ADD_RECORD_STATUS_DESCRIPTION = '책을 얼마나 읽으셨나요?';
const MSG_ADD_RECORD_STATUS_HELP = '* 나중에 수정할 수 있어요';
const MSG_ADD_RECORD_STATUS_SUBMIT = '책 추가하기';

type AddRecordStatusBottomSheetProps = {
  isbn13?: string;
  bookDetail?: BookDetail;
  onSubmit?: (status: AddRecordStatus) => void;
};

export const AddRecordStatusBottomSheet = (props: AddRecordStatusBottomSheetProps) => {
  const { isbn13, bookDetail, onSubmit } = props;
  const [selectedStatus, setSelectedStatus] = useState<AddRecordStatus>('COMPLETED');
  const navigate = useNavigate();
  const { pop } = useLayerStore();

  const handleSelectStatus = (status: AddRecordStatus) => () => {
    setSelectedStatus(status);
  };

  const handleAddBookClick = () => {
    pop();
    if (onSubmit) onSubmit(selectedStatus);
    if (isbn13) {
      navigate(`/records/new?isbn13=${isbn13}&status=${selectedStatus}`, {
        state: { bookDetail },
      });
    }
  };

  return (
    <BottomSheet>
      <div className="px-mobile">
        <p className="text-title4">{MSG_ADD_RECORD_STATUS_TITLE}</p>
        <p className="text-body1 text-neutral-80">{MSG_ADD_RECORD_STATUS_DESCRIPTION}</p>

        <ul className="grid grid-cols-3 gap-1 pb-9 pt-5">
          {ADD_RECORD_STATUS_OPTIONS.map((option) => {
            const isSelected = option.id === selectedStatus;
            const cardClassName = isSelected ? 'border-primary opacity-100' : 'border-neutral-20 opacity-40';
            const labelClassName = isSelected ? 'text-title4' : 'text-body1';

            return (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={handleSelectStatus(option.id)}
                  className={`flex h-[8.875rem] w-full flex-col items-center justify-end gap-2 overflow-hidden rounded-xl border-[2px] bg-neutral-0 px-4 pb-3 pt-4 ${cardClassName}`}
                >
                  <img src={option.imageSrc} alt="" decoding="async" className="size-[5.125rem]" />
                  <span className={labelClassName}>{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="pb-1 text-caption1 text-information">{MSG_ADD_RECORD_STATUS_HELP}</p>
        <Button onClick={handleAddBookClick}>{MSG_ADD_RECORD_STATUS_SUBMIT}</Button>
      </div>
    </BottomSheet>
  );
};
