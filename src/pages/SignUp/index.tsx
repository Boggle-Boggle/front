import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useNickNameInput from 'hooks/useNickNameInput';
import { getTermsAgreement } from 'services/signup';
import { TermWithAgree } from 'types/user';

import NickNameInput from './NickNameInput';
import TermsAgreement from './TermsAgreement';
import Complete from './Complete';

type StepType = '닉네임입력' | '약관동의' | '가입완료';

const SignUp = () => {
  const { nickName, isValid, updateNickName } = useNickNameInput();
  const [step, setStep] = useState<StepType>('닉네임입력');
  const [terms, setTerms] = useState<TermWithAgree[]>([]);

  const { data } = useQuery({
    queryKey: ['termsAgreement'],
    queryFn: () => getTermsAgreement(),
  });

  useEffect(() => {
    if (data && data.terms) {
      const initialTerms = data.terms.map((term) => ({ ...term, isAgree: false }));
      setTerms(initialTerms);
    }
  }, [data]);

  const createTermsAgreement = () => {
    return terms.map((term) => ({
      id: term.id,
      isAgree: term.isAgree,
    }));
  };

  return (
    <div className="bg-white">
      {step === '닉네임입력' && (
        <NickNameInput
          nickName={nickName}
          isValid={isValid}
          updateNickName={updateNickName}
          onNext={() => setStep('약관동의')}
        />
      )}
      {step === '약관동의' && terms && (
        <TermsAgreement
          terms={terms}
          setTerms={setTerms}
          onPrev={() => setStep('닉네임입력')}
          onNext={() => setStep('가입완료')}
        />
      )}
      {step === '가입완료' && <Complete nickName={nickName} terms={createTermsAgreement()} />}
    </div>
  );
};

export default SignUp;
