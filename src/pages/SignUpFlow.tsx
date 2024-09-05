import { useState } from 'react';

import NickNameInput from 'layouts/SignUp/NickNameInput';
import TermsAgreement from 'layouts/SignUp/TermsAgreement';

type StepType = '닉네임입력' | '약관동의' | '가입완료';

const SignUpFlow = () => {
  const [nickName, setNickName] = useState<string>('');
  const [step, setStep] = useState<StepType>('닉네임입력');

  return (
    <>
      {step === '닉네임입력' && (
        <NickNameInput
          nickName={nickName}
          setNickName={setNickName}
          onNext={() => setStep('약관동의')}
        />
      )}
      {step === '약관동의' && <TermsAgreement onNext={() => setStep('가입완료')} />}
      {step === '가입완료' && <div>가입완료다냥</div>}
    </>
  );
};

export default SignUpFlow;
