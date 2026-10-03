import { isApiError } from 'api';

const MSG_ADD_RECORD_FAILED = '독서 기록을 저장하지 못했습니다. 다시 시도해주세요.';
const MSG_ADD_RECORD_INVALID_INPUT = '입력한 독서 기록 정보를 다시 확인해주세요.';
const MSG_ADD_RECORD_BOOKSHELF_NOT_FOUND = '선택한 그룹을 찾을 수 없습니다. 다시 선택해주세요.';

const ADD_RECORD_INPUT_ERROR_CODES = [
  'COMMON_INVALID_REQUEST',
  'INVALID_READING_STATUS',
  'INVALID_RATING',
  'INVALID_PROGRESS',
  'INVALID_ISBN13',
] as const;

export const getAddRecordErrorMessage = (error: unknown) => {
  if (!isApiError(error)) return MSG_ADD_RECORD_FAILED;

  if (ADD_RECORD_INPUT_ERROR_CODES.some((code) => code === error.code)) return MSG_ADD_RECORD_INVALID_INPUT;
  if (error.code === 'BOOKSHELF_NOT_FOUND') return MSG_ADD_RECORD_BOOKSHELF_NOT_FOUND;

  return MSG_ADD_RECORD_FAILED;
};
