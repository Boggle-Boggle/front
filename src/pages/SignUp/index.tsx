import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import useNickNameInput from 'hooks/useNickNameInput';
import { getTermsAgreement } from 'services/user';

import Complete from './Complete';
import NickNameInput from './NickNameInput';
import TermsAgreement from './TermsAgreement';

type StepType = '닉네임입력' | '약관동의' | '가입완료';

const SignUp = () => {
  const [step, setStep] = useState<StepType>('닉네임입력');

  const { nickName, saveNickName, changeNickName } = useNickNameInput(() => setStep('약관동의'));

  const { data } = useQuery({
    queryKey: ['termsAgreement'],
    queryFn: () => getTermsAgreement(),
  });

  // const createTermsAgreement = () => {
  //   return data?.terms.map((term) => ({
  //     id: term.id,
  //     isAgree: true,
  //   }));
  // };

  return (
    <>
      {step === '닉네임입력' && (
        <NickNameInput nickName={nickName} changeNickName={changeNickName} saveNickName={saveNickName} />
      )}
      {step === '약관동의' && data?.terms && (
        <TermsAgreement terms={data.terms} onPrev={() => setStep('닉네임입력')} onNext={() => setStep('가입완료')} />
      )}
      {step === '가입완료' && <Complete nickName={nickName} />}
    </>
  );
};

export default SignUp;
