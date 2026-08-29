import { useMutation } from '@tanstack/react-query';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { BackButton } from 'components/Header/BackButton';

import { blockUserInReport, REPORT_REASONS_INFO, reportReview, type ReviewReportReasonType } from './api';

const MSG_REPORT_PAGE_TITLE = '문제 신고하기';
const MSG_REPORT_REASON_QUESTION = '어떠한 문제가 발생하였나요?';
const MSG_REPORT_COMPLETE_TITLE = '문제를 알려주셔서 감사합니다';
const MSG_REPORT_COMPLETE_DESCRIPTION =
  '신고해주신 내용은 꼼꼼히 확인할게요. 문제가 있다고 판단되면 해당 유저/리뷰는 조치 대상이 될 수 있어요.';
const MSG_REPORT_BLOCK_QUESTION = '추가로 해당 유저를 차단하시겠습니까?';
const MSG_REPORT_BLOCK_DESCRIPTION =
  '차단하면 상대방의 리뷰나 활동이 더 이상 내 목록에 보이지 않아요. 다만, 내 리뷰나 활동은 여전히 상대방에게 보일 수 있어요.';
const MSG_REPORT_BLOCK_BUTTON = '이 유저를 차단하기';
const MSG_REPORT_BLOCKED_BUTTON = '차단 완료됨';
const MSG_REPORT_BLOCK_SUCCESS_TOAST = '해당 유저가 차단되었습니다.';
const MSG_REPORT_SUCCESS_TOAST = '신고가 정상 접수되었습니다.';
const MSG_REPORT_FAILED_TOAST = '신고 접수에 실패했습니다.';
const MSG_REPORT_BLOCK_FAILED_TOAST = '유저 차단에 실패했습니다.';

type ReportStep = 'reason' | 'complete';

export const Report = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addToast } = useToastStore();

  const { reviewId, userId } = (state || {}) as { reviewId?: number; userId?: number };

  const [step, setStep] = useState<ReportStep>('reason');
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const isCompleteStep = step === 'complete';

  const reportMutation = useMutation({
    mutationFn: reportReview,
    onSuccess: () => {
      addToast({
        description: MSG_REPORT_SUCCESS_TOAST,
        type: 'error',
      });
      setStep('complete');
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : MSG_REPORT_FAILED_TOAST;
      addToast({
        description: message,
        type: 'error',
      });
    },
  });

  const blockMutation = useMutation({
    mutationFn: blockUserInReport,
    onSuccess: () => {
      addToast({
        description: MSG_REPORT_BLOCK_SUCCESS_TOAST,
        type: 'error',
      });
      setIsBlocked(true);
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : MSG_REPORT_BLOCK_FAILED_TOAST;
      addToast({
        description: message,
        type: 'error',
      });
    },
  });

  const handleReasonClick = (reason: ReviewReportReasonType) => {
    if (!reviewId || reportMutation.isPending) return;

    reportMutation.mutate({
      reviewId,
      body: {
        reason,
        customReason: reason === 'OTHER' ? '기타 사유 신고' : undefined,
      },
    });
  };

  const handleBackClick = () => navigate(-1);

  const handleBlockUserClick = () => {
    if (!userId || blockMutation.isPending || isBlocked) return;
    blockMutation.mutate(userId);
  };

  return (
    <>
      <Header
        title={MSG_REPORT_PAGE_TITLE}
        withBack={!isCompleteStep}
        leftBtn={isCompleteStep ? <BackButton onClick={handleBackClick} /> : undefined}
      />
      <section className="h-full overflow-y-auto px-mobile pb-safe-bottom pt-4">
        {step === 'reason' && (
          <>
            <h2 className="text-h3 text-neutral-60">{MSG_REPORT_REASON_QUESTION}</h2>

            <ul className="pt-5">
              {REPORT_REASONS_INFO.map((item) => (
                <li key={item.type}>
                  <button
                    type="button"
                    onClick={() => handleReasonClick(item.type)}
                    disabled={reportMutation.isPending}
                    className="h-[3.375rem] w-full border-b border-neutral-20 text-start text-title4 first:border-t disabled:opacity-50"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {step === 'complete' && (
          <>
            <div>
              <h2 className="text-title4">{MSG_REPORT_COMPLETE_TITLE}</h2>
              <p className="pt-3 text-body1 text-neutral-80">{MSG_REPORT_COMPLETE_DESCRIPTION}</p>
            </div>

            <div className="pt-[3.125rem]">
              <h3 className="mb-5 text-title1">{MSG_REPORT_BLOCK_QUESTION}</h3>
              <Button
                onClick={handleBlockUserClick}
                variant={isBlocked ? 'grey' : 'warning'}
                disabled={isBlocked || blockMutation.isPending}
              >
                {isBlocked ? MSG_REPORT_BLOCKED_BUTTON : MSG_REPORT_BLOCK_BUTTON}
              </Button>
              <p className="pt-5 text-caption1 text-neutral-60">{MSG_REPORT_BLOCK_DESCRIPTION}</p>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Report;
