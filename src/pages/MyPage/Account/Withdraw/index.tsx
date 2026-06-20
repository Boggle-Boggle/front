import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Input } from 'components/Input';
import { Radio } from 'components/Radio';

import WithdrawConfirmModal from './WithdrawConfirmModal';

const MSG_WITHDRAW_TITLE = '회원탈퇴';
const MSG_WITHDRAW_HEADING = '빼곡을 떠나시나요?';
const MSG_WITHDRAW_DESCRIPTION =
  '빼곡 서비스를 그동안 사용해주셔서 감사합니다.\n사용자님께서 어플을 사용하면서 느끼셨던 점을 저희에게 공유해주시면 더욱 훌륭한 서비스를 제공할 수 있도록 노력하겠습니다.';
const MSG_WITHDRAW_FEEDBACK_PREFIX = '닉네임 님의';
const MSG_WITHDRAW_FEEDBACK_TITLE = '소중한 피드백을 알려주세요';
const MSG_WITHDRAW_FEEDBACK_PLACEHOLDER = 'Placeholder';
const MSG_WITHDRAW_BACK = '뒤로가기';
const MSG_WITHDRAW_CONFIRM = '계정을 삭제합니다';
const LAYER_ID_ACCOUNT_WITHDRAW_CONFIRM_MODAL = 'account-withdraw-confirm-modal';
const ROUTE_ACCOUNT_WITHDRAW_COMPLETE = '/mypage/account/withdraw-complete';

const WITHDRAW_REASONS = [
  '기능이 직관적이지 않아 불편해요',
  '비주얼이 아쉬웠어요',
  '책을 많이 읽지 않았어요',
  '부가적인 기능이 많아 불편해요',
  '없는 책이 많아 등록이 힘들었어요',
  '기타 사유, 또는 무응답',
] as const;

const Withdraw = () => {
  const navigate = useNavigate();
  const { push, pop } = useLayerStore();
  const [selectedReason, setSelectedReason] = useState<string>(WITHDRAW_REASONS[0]);
  const [feedback, setFeedback] = useState<string>('');

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleFeedbackChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackClear = () => {
    setFeedback('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    pop();
  };

  const handleMoveToWithdrawComplete = () => {
    pop();
    navigate(ROUTE_ACCOUNT_WITHDRAW_COMPLETE);
  };

  const handleOpenWithdrawConfirmModal = () => {
    push({
      id: LAYER_ID_ACCOUNT_WITHDRAW_CONFIRM_MODAL,
      component: <WithdrawConfirmModal onCancel={handleCloseModal} onConfirm={handleMoveToWithdrawComplete} />,
    });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_WITHDRAW_TITLE} withBack />

      <div className="flex min-h-0 flex-1 flex-col px-mobile pb-safe-bottom">
        <h2 className="py-3 text-title1">{MSG_WITHDRAW_HEADING}</h2>
        <p className="whitespace-pre-line text-body1">{MSG_WITHDRAW_DESCRIPTION}</p>

        <h2 className="whitespace-pre-line pb-3 pt-8 text-title1">{`${MSG_WITHDRAW_FEEDBACK_PREFIX}\n${MSG_WITHDRAW_FEEDBACK_TITLE}`}</h2>
        <div className="flex flex-col gap-1">
          {WITHDRAW_REASONS.map((reason, index) => (
            <label key={reason} htmlFor={`withdraw-reason-${index}`} className="flex h-9 items-center gap-1">
              <Radio
                id={`withdraw-reason-${index}`}
                name="withdraw-reason"
                checked={selectedReason === reason}
                onChange={() => handleReasonChange(reason)}
                size="small"
                variant="primary"
              />
              <span className="text-body1 font-medium">{reason}</span>
            </label>
          ))}
          <Input
            value={feedback}
            onChange={handleFeedbackChange}
            onClear={handleFeedbackClear}
            placeholder={MSG_WITHDRAW_FEEDBACK_PLACEHOLDER}
          />
        </div>

        <div className="mt-auto flex items-center gap-1 pb-[1.125rem] pt-5">
          <Button
            width="short"
            size="medium"
            variant="grey"
            className="shrink-0 whitespace-nowrap"
            onClick={handleBack}
          >
            {MSG_WITHDRAW_BACK}
          </Button>
          <Button width="long" size="medium" variant="warning" onClick={handleOpenWithdrawConfirmModal}>
            {MSG_WITHDRAW_CONFIRM}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
