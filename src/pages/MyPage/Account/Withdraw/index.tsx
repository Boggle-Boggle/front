import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Header } from 'components/Header';
import { Input } from 'components/Input';
import Loading from 'pages/Loading';

import WithdrawConfirmModal from './WithdrawConfirmModal';
import { getMyPageProfile } from '../../api';
import { getWithdrawalReasons, type WithdrawalReasonCode } from '../api';

const MSG_WITHDRAW_TITLE = '회원탈퇴';
const MSG_WITHDRAW_HEADING = '빼곡을 떠나시나요?';
const MSG_WITHDRAW_DESCRIPTION =
  '빼곡 서비스를 그동안 사용해주셔서 감사합니다.\n사용자님께서 어플을 사용하면서 느끼셨던 점을 저희에게 공유해주시면 더욱 훌륭한 서비스를 제공할 수 있도록 노력하겠습니다.';
const MSG_WITHDRAW_FEEDBACK_SUFFIX = ' 님의';
const MSG_WITHDRAW_FEEDBACK_TITLE = '소중한 피드백을 알려주세요';
const MSG_WITHDRAW_FEEDBACK_PLACEHOLDER = '더 나은 빼곡을 위해 아쉬웠던 점을 알려주세요';
const MSG_WITHDRAW_BACK = '뒤로가기';
const MSG_WITHDRAW_CONFIRM = '계정을 삭제합니다';
const LAYER_ID_ACCOUNT_WITHDRAW_CONFIRM_MODAL = 'account-withdraw-confirm-modal';

const Withdraw = () => {
  const navigate = useNavigate();
  const { push, pop } = useLayerStore();
  const [selectedReasons, setSelectedReasons] = useState<WithdrawalReasonCode[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['users', 'me', 'profile'],
    queryFn: getMyPageProfile,
    retry: false,
    throwOnError: true,
  });

  const { data: withdrawalReasonItems, isLoading } = useQuery({
    queryKey: ['users', 'me', 'withdrawal-reasons'],
    queryFn: getWithdrawalReasons,
    retry: false,
    throwOnError: true,
  });

  if (isLoading || isProfileLoading || !withdrawalReasonItems || !profile) return <Loading />;

  const hasSelectedReasons = selectedReasons.length > 0;
  const feedbackTitle = `${profile.nickname}${MSG_WITHDRAW_FEEDBACK_SUFFIX}\n${MSG_WITHDRAW_FEEDBACK_TITLE}`;

  const handleReasonChange = (reasonCode: WithdrawalReasonCode) => {
    setSelectedReasons((prevSelectedReasons) => {
      if (prevSelectedReasons.includes(reasonCode)) {
        return prevSelectedReasons.filter((selectedReason) => selectedReason !== reasonCode);
      }

      return [...prevSelectedReasons, reasonCode];
    });
  };

  const handleOpenWithdrawConfirmModal = () => {
    if (!hasSelectedReasons) return;

    push({
      id: LAYER_ID_ACCOUNT_WITHDRAW_CONFIRM_MODAL,
      component: <WithdrawConfirmModal onCancel={pop} reasons={selectedReasons} customText={feedback} />,
    });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_WITHDRAW_TITLE} withBack />

      <div className="flex min-h-0 flex-1 flex-col px-mobile pb-safe-bottom">
        <h2 className="py-3 text-title1">{MSG_WITHDRAW_HEADING}</h2>
        <p className="whitespace-pre-line text-body1">{MSG_WITHDRAW_DESCRIPTION}</p>

        <h2 className="whitespace-pre-line pb-3 pt-8 text-title1">{feedbackTitle}</h2>
        <div className="flex flex-col gap-1">
          {withdrawalReasonItems.map((reason) => (
            <div key={reason.code} className="flex h-9 items-center gap-2">
              <Checkbox
                id={`withdraw-reason-${reason.code}`}
                name="withdraw-reason"
                checked={selectedReasons.includes(reason.code)}
                onChange={() => handleReasonChange(reason.code)}
                size="xs"
              />
              <label htmlFor={`withdraw-reason-${reason.code}`} className="cursor-pointer text-body1 font-medium">
                {reason.label}
              </label>
            </div>
          ))}
          <Input
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            onClear={() => setFeedback('')}
            placeholder={MSG_WITHDRAW_FEEDBACK_PLACEHOLDER}
          />
        </div>

        <div className="mt-auto flex items-center gap-1 pb-[1.125rem] pt-5">
          <Button
            width="short"
            size="medium"
            variant="grey"
            className="shrink-0 whitespace-nowrap"
            onClick={() => navigate(-1)}
          >
            {MSG_WITHDRAW_BACK}
          </Button>
          <Button
            width="long"
            size="medium"
            variant="warning"
            disabled={!hasSelectedReasons}
            onClick={handleOpenWithdrawConfirmModal}
          >
            {MSG_WITHDRAW_CONFIRM}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
