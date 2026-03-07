import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CompleteStep } from './CompleteStep';
import { NicknameStep } from './NicknameStep';
import { TermsStep } from './TermsStep';

const STEP = {
  NICKNAME: 'NICKNAME',
  TERMS: 'TERMS',
  COMPLETE: 'COMPLETE',
} as const;

type Step = (typeof STEP)[keyof typeof STEP];

const SignUp = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(STEP.NICKNAME);
  const [nickname, setNickname] = useState<string>('');
  const [agreedTermIds, setAgreedTermIds] = useState<number[]>([]);

  const handleChangeNickname = (nextNickname: string) => setNickname(nextNickname);
  const handleNicknameNext = () => setStep(STEP.TERMS);

  const handleChangeAgreedTermIds = (nextAgreedTermIds: number[]) => setAgreedTermIds(nextAgreedTermIds);

  const handleTermsPrev = () => setStep(STEP.NICKNAME);
  const handleTermsNext = () => setStep(STEP.COMPLETE);

  const handleComplete = () => navigate('/');

  if (step === STEP.NICKNAME) {
    return <NicknameStep nickname={nickname} onChangeNickname={handleChangeNickname} onNext={handleNicknameNext} />;
  }

  if (step === STEP.TERMS) {
    return (
      <TermsStep
        agreedTermIds={agreedTermIds}
        onChangeAgreedTermIds={handleChangeAgreedTermIds}
        onPrev={handleTermsPrev}
        onNext={handleTermsNext}
      />
    );
  }

  return <CompleteStep onComplete={handleComplete} />;
};

export default SignUp;
