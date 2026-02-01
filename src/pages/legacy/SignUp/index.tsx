import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Complete from './Complete';
import NicknameInput from './NicknameInput';
import TermsAgreement from './TermsAgreement';

type StepType = '닉네임입력' | '약관동의' | '가입완료';

const SignUp = () => {
  const [step, setStep] = useState<StepType>('닉네임입력');
  const navigate = useNavigate();

  return (
    <>
      {step === '닉네임입력' && <NicknameInput onPrev={() => navigate('/home')} onNext={() => setStep('약관동의')} />}
      {step === '약관동의' && (
        <TermsAgreement onPrev={() => setStep('닉네임입력')} onNext={() => setStep('가입완료')} />
      )}
      {step === '가입완료' && <Complete />}
    </>
  );
};

export default SignUp;
