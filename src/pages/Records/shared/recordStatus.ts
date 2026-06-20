import completedImage from 'assets/img/add-record-status-completed.png';
import pendingImage from 'assets/img/add-record-status-pending.png';
import readingImage from 'assets/img/add-record-status-reading.png';

export type AddRecordStatus = 'completed' | 'reading' | 'pending';

export type AddRecordStatusOption = {
  id: AddRecordStatus;
  label: string;
  imageSrc: string;
};

export const ADD_RECORD_STATUS_OPTIONS: AddRecordStatusOption[] = [
  {
    id: 'completed',
    label: '다 읽은 책',
    imageSrc: completedImage,
  },
  {
    id: 'reading',
    label: '읽고 있는 책',
    imageSrc: readingImage,
  },
  {
    id: 'pending',
    label: '중단한 책',
    imageSrc: pendingImage,
  },
];

export const getAddRecordStatus = (value: string | null): AddRecordStatus => {
  const matchedStatus = ADD_RECORD_STATUS_OPTIONS.find((option) => option.id === value);

  return matchedStatus?.id ?? 'completed';
};
