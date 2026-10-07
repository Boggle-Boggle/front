import { Button } from 'components/Button';
import { Header } from 'components/Header';

import { SectionButton } from '../../shared/SectionButton';
import { SectionHeader } from '../../shared/SectionHeader';

const MSG_ACCOUNT_TITLE = '계정 설정하기';
const MSG_ACCOUNT_NICKNAME_CHANGE = '닉네임 변경';
const MSG_ACCOUNT_RECORD_DOWNLOAD = '빼곡 기록 다운로드';
const MSG_ACCOUNT_RECORD_BACKUP_DOWNLOAD = '백업 기록 다운로드';
const MSG_ACCOUNT_LOGIN_MANAGEMENT = '로그인 관리';
const MSG_ACCOUNT_LOGOUT = '이 계정에서 로그아웃 하기';
const MSG_ACCOUNT_DELETE = '이 계정을 삭제하기';

const noop = () => {};

export const AccountSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_ACCOUNT_TITLE} withBack />

      <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom">
        <div className="flex w-full flex-col items-center p-10">
          <div className="skeleton h-8 w-32" />
          <div className="skeleton mb-4 mt-0.5 h-5 w-36" />
          <Button width="short" size="small" variant="primaryLine" onClick={noop} disabled>
            {MSG_ACCOUNT_NICKNAME_CHANGE}
          </Button>
        </div>

        <SectionHeader title={MSG_ACCOUNT_RECORD_DOWNLOAD} />
        <div className="flex flex-col gap-2 px-mobile pb-8">
          <SectionButton onClick={noop}>{MSG_ACCOUNT_RECORD_BACKUP_DOWNLOAD}</SectionButton>
        </div>

        <SectionHeader title={MSG_ACCOUNT_LOGIN_MANAGEMENT} />
        <div className="flex flex-col gap-2 px-mobile">
          <SectionButton onClick={noop}>{MSG_ACCOUNT_LOGOUT}</SectionButton>
          <SectionButton onClick={noop}>{MSG_ACCOUNT_DELETE}</SectionButton>
        </div>
      </div>
    </div>
  );
};
