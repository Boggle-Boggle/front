import { Button } from 'components/Button';
import { Header } from 'components/Header';

import SettingsSection from '../shared/SettingsSection';
import SettingsSectionBody from '../shared/SettingsSectionBody';

const MSG_ACCOUNT_TITLE = '계정 설정하기';
const MSG_ACCOUNT_NICKNAME = '닉네임';
const MSG_ACCOUNT_NICKNAME_SUFFIX = '님';
const MSG_ACCOUNT_LOGIN_STATUS = '카카오톡으로 로그인 중';
const MSG_ACCOUNT_NICKNAME_CHANGE = '닉네임 변경';
const MSG_ACCOUNT_RECORD_DOWNLOAD = '빼곡 기록 다운로드';
const MSG_ACCOUNT_RECORD_BACKUP_DOWNLOAD = '백업 기록 다운로드';
const MSG_ACCOUNT_LOGIN_MANAGEMENT = '로그인 관리';
const MSG_ACCOUNT_LOGOUT = '이 계정에서 로그아웃 하기';
const MSG_ACCOUNT_DELETE = '이 계정을 삭제하기';

const Account = () => {
  return (
    <div className="min-h-full pb-safe-bottom">
      <Header title={MSG_ACCOUNT_TITLE} withBack />

      <section className="flex w-full flex-col items-center p-8">
        <h2 className="text-title1">
          {MSG_ACCOUNT_NICKNAME}
          <span className="pl-[0.125rem] text-h3">{MSG_ACCOUNT_NICKNAME_SUFFIX}</span>
        </h2>
        <p className="pb-4 pt-0.5 text-body2 text-information">{MSG_ACCOUNT_LOGIN_STATUS}</p>
        <Button width="short" size="small" variant="primaryLine" onClick={() => {}}>
          {MSG_ACCOUNT_NICKNAME_CHANGE}
        </Button>
      </section>

      <SettingsSection title={MSG_ACCOUNT_RECORD_DOWNLOAD} />
      <SettingsSectionBody>
        <Button variant="grey" onClick={() => {}}>
          {MSG_ACCOUNT_RECORD_BACKUP_DOWNLOAD}
        </Button>
      </SettingsSectionBody>

      <SettingsSection title={MSG_ACCOUNT_LOGIN_MANAGEMENT} />
      <SettingsSectionBody>
        <Button variant="grey" onClick={() => {}}>
          {MSG_ACCOUNT_LOGOUT}
        </Button>
        <Button variant="grey" onClick={() => {}}>
          {MSG_ACCOUNT_DELETE}
        </Button>
      </SettingsSectionBody>
    </div>
  );
};

export default Account;
