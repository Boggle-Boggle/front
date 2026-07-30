import type { AddRecordStatus } from 'types';

import completedImage from 'assets/img/add-record-status-completed.png';
import droppedImage from 'assets/img/add-record-status-pending.png';
import readingImage from 'assets/img/add-record-status-reading.png';

export type AddRecordStatusOption = {
  id: AddRecordStatus;
  label: string;
  imageSrc: string;
};

export const ADD_RECORD_STATUS_OPTIONS: AddRecordStatusOption[] = [
  {
    id: 'COMPLETED',
    label: '다 읽은 책',
    imageSrc: completedImage,
  },
  {
    id: 'READING',
    label: '읽고 있는 책',
    imageSrc: readingImage,
  },
  {
    id: 'DROPPED',
    label: '중단한 책',
    imageSrc: droppedImage,
  },
];

export const getAddRecordStatus = (value: string | null): AddRecordStatus => {
  const matchedStatus = ADD_RECORD_STATUS_OPTIONS.find((option) => option.id === value?.toUpperCase());

  return matchedStatus?.id ?? 'COMPLETED';
};
