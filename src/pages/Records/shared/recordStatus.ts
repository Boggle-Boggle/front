import type { AddRecordStatus } from 'types';

import completedImage from 'assets/records/record-status-completed-illustration.svg';
import droppedImage from 'assets/records/record-status-dropped-illustration.svg';
import readingImage from 'assets/records/record-status-reading-illustration.svg';

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
