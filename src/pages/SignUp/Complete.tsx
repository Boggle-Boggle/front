import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { agreeTerms, getRefresh, updateNickname } from 'services/user';

import { AgreementStatus } from 'types/user';

type CompleteProps = {
  nickName: string;
  terms: AgreementStatus[];
};

const Complete = ({ nickName, terms }: CompleteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeSignUp = async () => {
      try {
        await updateNickname(nickName);
        await agreeTerms(terms);
        await getRefresh();
      } catch (error) {
        // TODO : 위의 상황에서 에러 발생시 로그인 페이지로 이동(각각확인)
        navigate('/login');
      }
    };

    completeSignUp();
  }, [nickName, terms, navigate]);

  return <>가입 완료다냥</>;
};

export default Complete;
