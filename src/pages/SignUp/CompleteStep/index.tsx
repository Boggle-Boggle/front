import { BottomButton } from 'components/Button';
import Highlight from 'components/Highlight';

import signupCompleteImage from 'assets/img/signup_complete.png';

type CompleteStepProps = {
  onComplete: () => void;
};

const MSG_SIGNUP_COMPLETE_TITLE_FIRST = '빼곡에 오신 것을';
const MSG_SIGNUP_COMPLETE_TITLE_SECOND = '진심으로';
const MSG_SIGNUP_COMPLETE_TITLE_THIRD = '환영합니다!';
const MSG_SIGNUP_COMPLETE_DESCRIPTION = '빼곡에서 즐거운 독서 생활을 즐겨보세요!';
const MSG_SIGNUP_COMPLETE_BUTTON = '내 책장에 책 꽂으러 가기';
const MSG_SIGNUP_COMPLETE_IMAGE_ALT = '회원가입 완료';

export const CompleteStep = (props: CompleteStepProps) => {
  const { onComplete } = props;

  return (
    <section className="px-mobile pb-safe-bottom pt-safe-top text-center">
      <h1 className="pt-11 text-h1">
        <Highlight text={MSG_SIGNUP_COMPLETE_TITLE_FIRST} />
        <br />
        <Highlight text={MSG_SIGNUP_COMPLETE_TITLE_SECOND} />
        <br />
        <Highlight text={MSG_SIGNUP_COMPLETE_TITLE_THIRD} />
      </h1>

      <img src={signupCompleteImage} className="mx-auto mt-6 size-80" alt={MSG_SIGNUP_COMPLETE_IMAGE_ALT} />

      <p className="text-body1">{MSG_SIGNUP_COMPLETE_DESCRIPTION}</p>

      <BottomButton onClick={onComplete}>{MSG_SIGNUP_COMPLETE_BUTTON}</BottomButton>
    </section>
  );
};
