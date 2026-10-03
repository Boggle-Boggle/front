const NICKNAME_PATTERN = /^[가-힣a-zA-Z0-9]+$/;
const NICKNAME_MAX_BYTE_LENGTH = 45;

export type NicknameValidationError = 'EMPTY' | 'INVALID_CHARSET' | 'TOO_LONG';

export const NICKNAME_VALIDATION_MESSAGE_BY_ERROR: Record<NicknameValidationError, string> = {
  EMPTY: '닉네임을 입력해 주세요.',
  INVALID_CHARSET: '한글/영문/숫자만 사용할 수 있어요.',
  TOO_LONG: '닉네임이 너무 길어요.',
};

export const normalizeNickname = (nickname: string) => nickname.trim().normalize('NFC');

const getNicknameByteLength = (nickname: string) => new TextEncoder().encode(nickname).length;

export const parseNickname = (nickname: string): { normalizedNickname: string; error: NicknameValidationError | null } => {
  const normalizedNickname = normalizeNickname(nickname);

  if (!normalizedNickname.length) return { normalizedNickname, error: 'EMPTY' };
  if (!NICKNAME_PATTERN.test(normalizedNickname)) return { normalizedNickname, error: 'INVALID_CHARSET' };
  if (getNicknameByteLength(normalizedNickname) > NICKNAME_MAX_BYTE_LENGTH) {
    return { normalizedNickname, error: 'TOO_LONG' };
  }

  return { normalizedNickname, error: null };
};
