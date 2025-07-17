import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomButton } from 'components/refactor/Button';
import Highlight from 'components/refactor/Highlight';

import { agreeTerms, getRefresh, updateNickname } from 'services/user';

import signup_complete from 'assets/img/signup_complete.png';

type CompleteProps = {
  nickName: string;
};

const Complete = ({ nickName }: CompleteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeSignUp = async () => {
      try {
        await updateNickname(nickName);
        await agreeTerms([
          { id: 1, isAgree: true },
          { id: 2, isAgree: true },
        ]);
        await getRefresh();
      } catch (error) {
        // TODO : 위의 상황에서 에러 발생시 로그인 페이지로 이동(각각확인)
        navigate('/login');
      }
    };

    completeSignUp();
  }, [nickName, navigate]);

  return (
    <div className="h-dvh pb-2 text-center">
      <div className="mt-12 whitespace-pre-line text-h1">
        <Highlight>빼곡에 오신것을</Highlight>
        {'\n'}
        <Highlight>진심으로</Highlight>
        {'\n'}
        <Highlight>환영합니다!</Highlight>
      </div>
      <img src={signup_complete} className="m-auto size-96" alt="" />
      <p className="text-title3">빼곡에서 즐거운 독서 생활을 즐겨보세요</p>
      <BottomButton onClick={() => navigate('/')}>내 책장에 책 꽂으러 가기!</BottomButton>
    </div>
  );
};

export default Complete;
