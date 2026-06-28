import { useState } from 'react';
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import validateNickname from 'utils/validateNickname';

import { CompleteStep } from './CompleteStep';
import { NicknameStep } from './NicknameStep';
import { TermsStep } from './TermsStep';
import { useNicknameAvailabilityMutation } from './useNicknameAvailabilityMutation';

const STEP = {
  NICKNAME: 'NICKNAME',
  TERMS: 'TERMS',
  COMPLETE: 'COMPLETE',
} as const;

type Step = (typeof STEP)[keyof typeof STEP];

const MSG_SIGNUP_NICKNAME_INVALID = '사용할 수 없는 닉네임입니다. 다시 확인해주세요.';

const TERMS = [
  {
    body: '',
    code: 'TERMS_OF_SERVICE',
    effectiveAt: '',
    id: 1,
    required: true,
    title: '서비스 이용약관',
    version: 1,
  },
  {
    body: '',
    code: 'PRIVACY_POLICY',
    effectiveAt: '',
    id: 2,
    required: true,
    title: '개인정보 처리방침',
    version: 1,
  },
  {
    body: '',
    code: 'MARKETING',
    effectiveAt: '',
    id: 3,
    required: false,
    title: '마케팅 정보 수신 동의',
    version: 1,
  },
] as const;

const SignUp = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const [step, setStep] = useState<Step>(STEP.NICKNAME);
  const [nickname, setNickname] = useState<string>('');
  const [agreedTermIds, setAgreedTermIds] = useState<number[]>([]);

  const { isPending: isNicknameAvailabilityPending, mutate: getNicknameAvailability } =
    useNicknameAvailabilityMutation();

  const handleChangeNickname = (nextNickname: string) => {
    setNickname(nextNickname);
  };

  const handleNicknameNext = () => {
    if (isNicknameAvailabilityPending) return;

    const trimmedNickname = nickname.trim();

    if (!validateNickname(trimmedNickname)) {
      addToast({
        description: MSG_SIGNUP_NICKNAME_INVALID,
        type: 'error',
      });
      return;
    }

    getNicknameAvailability(trimmedNickname, {
      onSuccess: (isAvailable) => {
        if (!isAvailable) return;

        setStep(STEP.TERMS);
      },
    });
  };

  const handleChangeAgreedTermIds = (nextAgreedTermIds: number[]) => setAgreedTermIds(nextAgreedTermIds);

  const handleTermsPrev = () => setStep(STEP.NICKNAME);
  const handleTermsNext = () => {
    setStep(STEP.COMPLETE);
  };

  const handleComplete = () => navigate('/');

  if (outlet) return <Outlet />;

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
        terms={TERMS}
      />
    );
  }

  return <CompleteStep onComplete={handleComplete} />;
};

export default SignUp;
