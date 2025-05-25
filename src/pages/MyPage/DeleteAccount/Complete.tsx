import useAuthStore from 'stores/useAuthStore';

import Button from 'components/Button';
import Header from 'components/Header';

const Complete = () => {
  const { logout } = useAuthStore();

  return (
    <>
      <Header />

      <h1 className="grow text-[2rem] font-semibold leading-[3rem]">
        회원 탈퇴가
        <br />
        완료되었어요
        <p className="pb-6 pt-2 text-base opacity-50">
          그 동안 당신의 이야기를 기록해 주셔서 고마웠어요 <br />
          잠시 멀어져도, 빼곡은 언제나 여기 있을게요.
        </p>
      </h1>

      <Button handleClick={logout}>네 탈퇴할게요</Button>
    </>
  );
};

export default Complete;
