import { NICKNAME_VALIDATION_MESSAGE_BY_ERROR, parseNickname } from 'policy/nickname';
import { useState } from 'react';
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import { CompleteStep } from './CompleteStep';
import { NicknameStep } from './NicknameStep';
import { TermsStep } from './TermsStep';
import { useCreateSignupCompleteMutation } from './useCreateSignupCompleteMutation';
import { useGetLatestTermsMutation } from './useGetLatestTermsMutation';
import { useGetNicknameAvailabilityMutation } from './useGetNicknameAvailabilityMutation';

const STEP = {
  NICKNAME: 'NICKNAME',
  TERMS: 'TERMS',
  COMPLETE: 'COMPLETE',
} as const;

type Step = (typeof STEP)[keyof typeof STEP];

const SignUp = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const [step, setStep] = useState<Step>(STEP.NICKNAME);
  const [nickname, setNickname] = useState<string>('');
  const [agreedTermIds, setAgreedTermIds] = useState<number[]>([]);

  const { isPending: isNicknameAvailabilityPending, mutate: checkNicknameAvailability } =
    useGetNicknameAvailabilityMutation();
  const {
    data: terms = [],
    isPending: isTermsPending,
    mutate: loadLatestTerms,
  } = useGetLatestTermsMutation({
    onSuccess: () => setStep(STEP.TERMS),
  });
  const { isPending: isSignupCompletePending, mutate: completeSignup } = useCreateSignupCompleteMutation();

  const handleChangeNickname = (nextNickname: string) => {
    setNickname(nextNickname);
  };

  const handleNicknameNext = () => {
    const { normalizedNickname, error } = parseNickname(nickname);

    if (error) {
      addToast({
        description: NICKNAME_VALIDATION_MESSAGE_BY_ERROR[error],
        type: 'error',
      });
      return;
    }

    checkNicknameAvailability(normalizedNickname, {
      onSuccess: (isAvailable) => {
        if (!isAvailable) return;

        loadLatestTerms();
      },
    });
  };

  const handleChangeAgreedTermIds = (nextAgreedTermIds: number[]) => setAgreedTermIds(nextAgreedTermIds);

  const handleTermsPrev = () => setStep(STEP.NICKNAME);

  const handleTermsNext = () => {
    const { normalizedNickname } = parseNickname(nickname);

    completeSignup(
      {
        nickname: normalizedNickname,
        agreements: terms.map((term) => ({
          termsId: term.termsId,
          agreed: agreedTermIds.includes(term.termsId),
        })),
      },
      {
        onSuccess: () => setStep(STEP.COMPLETE),
      },
    );
  };

  const handleComplete = () => navigate('/', { replace: true });

  if (outlet) return <Outlet />;

  if (step === STEP.NICKNAME) {
    return (
      <NicknameStep
        isNextLoading={isNicknameAvailabilityPending || isTermsPending}
        nickname={nickname}
        onChangeNickname={handleChangeNickname}
        onNext={handleNicknameNext}
      />
    );
  }

  if (step === STEP.TERMS) {
    return (
      <TermsStep
        agreedTermIds={agreedTermIds}
        isSubmitLoading={isSignupCompletePending}
        onChangeAgreedTermIds={handleChangeAgreedTermIds}
        onPrev={handleTermsPrev}
        onNext={handleTermsNext}
        terms={terms}
      />
    );
  }

  return <CompleteStep onComplete={handleComplete} />;
};

export default SignUp;
