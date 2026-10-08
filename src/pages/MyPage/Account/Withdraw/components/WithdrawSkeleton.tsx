import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Input } from 'components/Input';

const WITHDRAW_REASON_SKELETON_ITEMS = Array.from({ length: 4 }, (_, index) => `withdraw-reason-skeleton-${index}`);

const MSG_WITHDRAW_TITLE = '회원탈퇴';
const MSG_WITHDRAW_HEADING = '빼곡을 떠나시나요?';
const MSG_WITHDRAW_DESCRIPTION =
  '그동안 빼곡 서비스를 사용해 주셔서 감사해요.\n사용자님께서 어플을 사용하면서 느끼셨던 점을 공유해 주시면 더 좋은 서비스를 만들기 위해 노력할게요.';
const MSG_WITHDRAW_FEEDBACK_TITLE = '소중한 피드백을 알려 주세요';
const MSG_WITHDRAW_FEEDBACK_PLACEHOLDER = '더 나은 빼곡을 위해 아쉬웠던 점을 알려 주세요';
const MSG_WITHDRAW_BACK = '뒤로가기';
const MSG_WITHDRAW_CONFIRM = '계정을 삭제합니다';

const noop = () => {};

export const WithdrawSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_WITHDRAW_TITLE} withBack />

      <div className="flex min-h-0 flex-1 flex-col px-mobile pb-safe-bottom">
        <h2 className="py-3 text-title1">{MSG_WITHDRAW_HEADING}</h2>
        <p className="whitespace-pre-line text-body1">{MSG_WITHDRAW_DESCRIPTION}</p>

        <div className="pb-3 pt-8">
          <div className="skeleton mb-2 h-7 w-28" />
          <h2 className="text-title1">{MSG_WITHDRAW_FEEDBACK_TITLE}</h2>
        </div>

        <div className="flex flex-col gap-1">
          {WITHDRAW_REASON_SKELETON_ITEMS.map((item) => (
            <div key={item} className="flex h-9 items-center gap-2">
              <div className="skeleton size-5 rounded" />
              <div className="skeleton h-5 w-40" />
            </div>
          ))}
          <Input value="" onChange={noop} onClear={noop} placeholder={MSG_WITHDRAW_FEEDBACK_PLACEHOLDER} />
        </div>

        <div className="mt-auto flex items-center gap-1 pb-[1.125rem] pt-5">
          <Button width="short" size="medium" variant="grey" className="shrink-0 whitespace-nowrap" onClick={noop}>
            {MSG_WITHDRAW_BACK}
          </Button>
          <Button width="long" size="medium" variant="warning" disabled onClick={noop}>
            {MSG_WITHDRAW_CONFIRM}
          </Button>
        </div>
      </div>
    </div>
  );
};
