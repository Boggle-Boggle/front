import { useNavigate } from 'react-router-dom';

import { BottomButton } from 'components/Button';
import Highlight from 'components/refactor/Highlight';

import signup_complete from 'assets/img/signup_complete.png';

const Complete = () => {
  const navigate = useNavigate();

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
