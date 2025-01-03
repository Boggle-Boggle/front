import { useEffect } from 'react';

import { agreeTerms, updateNickname } from 'services/user';

import { AgreementStatus } from 'types/user';

type CompleteProps = {
  nickName: string;
  terms: AgreementStatus[];
};

const Complete = ({ nickName, terms }: CompleteProps) => {
  useEffect(() => {
    updateNickname(nickName);
    agreeTerms(terms);
  }, [nickName, terms]);

  return <>가입 완료다냥</>;
};

export default Complete;
