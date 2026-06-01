import { useState } from 'react';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { BackButton } from 'components/Header/BackButton';

const MSG_REPORT_PAGE_TITLE = '문제 신고하기';
const MSG_REPORT_REASON_QUESTION = '어떠한 문제가 발생하였나요?';
const MSG_REPORT_COMPLETE_TITLE = '문제를 알려주셔서 감사합니다';
const MSG_REPORT_COMPLETE_DESCRIPTION =
  '신고해주신 내용은 꼼꼼히 확인할게요. 문제가 있다고 판단되면 해당 유저/리뷰는 조치 대상이 될 수 있어요.';
const MSG_REPORT_BLOCK_QUESTION = '추가로 해당 유저를 차단하시겠습니까?';
const MSG_REPORT_BLOCK_DESCRIPTION =
  '차단하면 상대방의 리뷰나 활동이 더 이상 내 목록에 보이지 않아요. 다만, 내 리뷰나 활동은 여전히 상대방에게 보일 수 있어요.';
const MSG_REPORT_BLOCK_BUTTON = '이 유저를 차단하기';

const REPORT_REASONS = [
  '부적절한 언어를 사용하였습니다',
  '작품과 관련 없는 내용입니다',
  '스팸 또는 광고입니다',
  '허위정보 또는 악의적인 평점 조작을 하였습니다',
  '과한 스포일러 요소가 있습니다',
  '누군가를 괴롭힘/명예훼손 하고 있습니다',
  '닉네임 규정을 위반하였습니다',
  '기타',
] as const;

type ReportStep = 'reason' | 'complete';

export const Report = () => {
  const [step, setStep] = useState<ReportStep>('reason');
  const isCompleteStep = step === 'complete';

  const handleReasonClick = () => setStep('complete');
  const handleBackClick = () => setStep('reason');

  const handleBlockUserClick = () => {};

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
              {REPORT_REASONS.map((reason) => (
                <li key={reason}>
                  <button
                    type="button"
                    onClick={handleReasonClick}
                    className="h-[3.375rem] w-full border-b border-neutral-20 text-start text-title4 first:border-t"
                  >
                    {reason}
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
              <Button onClick={handleBlockUserClick} variant="warning">
                {MSG_REPORT_BLOCK_BUTTON}
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
