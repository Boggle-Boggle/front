import { useNavigate } from 'react-router-dom';

import { BottomButton } from 'components/Button';
import Highlight from 'components/Highlight';

import withdrawCompleteImage from 'assets/img/withdraw_complete.png';

const MSG_WITHDRAW_COMPLETE_TITLE_FIRST = '그동안 빼곡을';
const MSG_WITHDRAW_COMPLETE_TITLE_SECOND = '사용해주셔서 감사합니다';
const MSG_WITHDRAW_COMPLETE_DESCRIPTION = '다시 찾아주시길 기다리고 있겠습니다';
const MSG_WITHDRAW_COMPLETE_BUTTON = '회원가입 페이지로';
const MSG_WITHDRAW_COMPLETE_IMAGE_ALT = '회원 탈퇴 완료';

const WithdrawComplete = () => {
  const navigate = useNavigate();

  const handleMoveToLogin = () => {
    navigate('/login', { replace: true });
  };

  return (
    <section className="px-mobile pb-safe-bottom pt-safe-top text-center">
      <h1 className="pt-11 text-h1">
        <Highlight text={MSG_WITHDRAW_COMPLETE_TITLE_FIRST} />
        <br />
        <Highlight text={MSG_WITHDRAW_COMPLETE_TITLE_SECOND} />
      </h1>

      <img
        src={withdrawCompleteImage}
        className="mx-auto mt-[3.875rem] h-auto w-full max-w-[21.5rem]"
        alt={MSG_WITHDRAW_COMPLETE_IMAGE_ALT}
      />

      <p className="mt-2 text-body1">{MSG_WITHDRAW_COMPLETE_DESCRIPTION}</p>

      <BottomButton variant="grey" onClick={handleMoveToLogin}>
        {MSG_WITHDRAW_COMPLETE_BUTTON}
      </BottomButton>
    </section>
  );
};

export default WithdrawComplete;
