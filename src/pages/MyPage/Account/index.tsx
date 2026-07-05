import { useQuery } from '@tanstack/react-query';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { IconPen } from 'components/icons';
import Loading from 'pages/Loading';

import NICKNAME_RULE from 'constants/index';

import DownloadBackupModal from './DownloadBackupModal';
import LogoutConfirmModal from './LogoutConfirmModal';
import { useChangeNicknameMutation } from './useChangeNicknameMutation';
import { getMyPageProfile } from '../api';
import { SectionButton } from '../shared/SectionButton';
import { SectionHeader } from '../shared/SectionHeader';
import { LOGIN_PROVIDER_LABEL } from '../shared/loginProvider';

const MSG_ACCOUNT_TITLE = '계정 설정하기';
const MSG_ACCOUNT_NICKNAME_SUFFIX = '님';
const MSG_ACCOUNT_LOGIN_STATUS = '로그인 중';
const MSG_ACCOUNT_NICKNAME_CHANGE = '닉네임 변경';
const MSG_ACCOUNT_NICKNAME_CHANGE_COMPLETE = '변경 완료!';
const MSG_ACCOUNT_NICKNAME_INPUT_LABEL = '닉네임 입력';
const MSG_ACCOUNT_RECORD_DOWNLOAD = '빼곡 기록 다운로드';
const MSG_ACCOUNT_RECORD_BACKUP_DOWNLOAD = '백업 기록 다운로드';
const MSG_ACCOUNT_LOGIN_MANAGEMENT = '로그인 관리';
const MSG_ACCOUNT_LOGOUT = '이 계정에서 로그아웃 하기';
const MSG_ACCOUNT_DELETE = '이 계정을 삭제하기';
const LAYER_ID_ACCOUNT_DOWNLOAD_BACKUP_MODAL = 'account-download-backup-modal';
const LAYER_ID_ACCOUNT_LOGOUT_CONFIRM_MODAL = 'account-logout-confirm-modal';

const Account = () => {
  const navigate = useNavigate();
  const { push, pop } = useLayerStore();
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['users', 'me', 'profile'],
    queryFn: getMyPageProfile,
    retry: false,
    throwOnError: true,
  });
  const { isPending: isChangeNicknamePending, mutate: changeNickname } = useChangeNicknameMutation();

  useEffect(() => {
    if (!isEditingNickname) return;

    nicknameInputRef.current?.focus();
  }, [isEditingNickname]);

  const handleChangeNickname = (event: ChangeEvent<HTMLInputElement>) => setNickname(event.target.value);

  const handleStartNicknameEdit = () => {
    setNickname('');
    setIsEditingNickname(true);
  };

  const handleCompleteNicknameEdit = () => {
    if (!profile) return;

    const trimmedNickname = nickname.trim();
    if (!trimmedNickname || isChangeNicknamePending) return;
    if (trimmedNickname === profile.nickname) {
      setIsEditingNickname(false);

      return;
    }

    changeNickname(
      { nickname: trimmedNickname },
      {
        onSuccess: () => {
          setNickname(trimmedNickname);
          setIsEditingNickname(false);
        },
      },
    );
  };

  const handleOpenDownloadBackupModal = () => {
    push({
      id: LAYER_ID_ACCOUNT_DOWNLOAD_BACKUP_MODAL,
      component: <DownloadBackupModal onCancel={pop} onConfirm={pop} />,
    });
  };

  const handleOpenLogoutConfirmModal = () => {
    push({
      id: LAYER_ID_ACCOUNT_LOGOUT_CONFIRM_MODAL,
      component: <LogoutConfirmModal onCancel={pop} />,
    });
  };

  const handleOpenWithdrawPage = () => {
    navigate('/mypage/account/withdraw');
  };

  if (isLoading || !profile) return <Loading />;

  const loginProviderLabel = LOGIN_PROVIDER_LABEL[profile.providers[0]];
  const trimmedNickname = nickname.trim();
  const isNicknameChangeDisabled = !trimmedNickname || isChangeNicknamePending;
  const nicknameInputSize = Math.max(
    Array.from(nickname).reduce((size, character) => size + (character.charCodeAt(0) > 255 ? 2 : 1), 0),
    1,
  );

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_ACCOUNT_TITLE} withBack />

      <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom">
        <div className="flex w-full flex-col items-center p-8">
          {isEditingNickname ? (
            <div className="flex w-full items-center justify-center gap-2">
              <input
                ref={nicknameInputRef}
                aria-label={MSG_ACCOUNT_NICKNAME_INPUT_LABEL}
                value={nickname}
                onChange={handleChangeNickname}
                maxLength={NICKNAME_RULE.MAX}
                size={nicknameInputSize}
                className="min-w-4 max-w-[12rem] bg-transparent text-center text-title1 outline-none"
              />
              <span className="shrink-0 text-h3">{MSG_ACCOUNT_NICKNAME_SUFFIX}</span>
              <IconPen className="size-6 shrink-0 text-neutral-60" />
            </div>
          ) : (
            <h2 className="text-title1">
              {profile.nickname}
              <span className="pl-[0.125rem] text-h3">{MSG_ACCOUNT_NICKNAME_SUFFIX}</span>
            </h2>
          )}
          <p className="pb-4 pt-0.5 text-body2 text-information">
            {loginProviderLabel}로 {MSG_ACCOUNT_LOGIN_STATUS}
          </p>
          <Button
            width="short"
            size="small"
            variant="primaryLine"
            onClick={isEditingNickname ? handleCompleteNicknameEdit : handleStartNicknameEdit}
            disabled={isEditingNickname && isNicknameChangeDisabled}
            loading={isChangeNicknamePending}
          >
            {isEditingNickname ? MSG_ACCOUNT_NICKNAME_CHANGE_COMPLETE : MSG_ACCOUNT_NICKNAME_CHANGE}
          </Button>
        </div>

        <SectionHeader title={MSG_ACCOUNT_RECORD_DOWNLOAD} />
        <div className="flex flex-col gap-2 px-mobile py-2">
          <SectionButton onClick={handleOpenDownloadBackupModal}>{MSG_ACCOUNT_RECORD_BACKUP_DOWNLOAD}</SectionButton>
        </div>

        <SectionHeader title={MSG_ACCOUNT_LOGIN_MANAGEMENT} />
        <div className="flex flex-col gap-2 px-mobile py-2">
          <SectionButton onClick={handleOpenLogoutConfirmModal}>{MSG_ACCOUNT_LOGOUT}</SectionButton>
          <SectionButton onClick={handleOpenWithdrawPage}>{MSG_ACCOUNT_DELETE}</SectionButton>
        </div>
      </div>
    </div>
  );
};

export default Account;
