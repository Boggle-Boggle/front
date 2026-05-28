import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import Loading from 'pages/Loading';

import { completeSignup } from 'services/auth';
import { getLatestTerms } from 'services/terms';
import { getNicknameAvailability } from 'services/users';
import validateNickname from 'utils/validateNickname';

import { CompleteStep } from './CompleteStep';
import { NicknameStep } from './NicknameStep';
import { TermsStep } from './TermsStep';

const STEP = {
  NICKNAME: 'NICKNAME',
  TERMS: 'TERMS',
  COMPLETE: 'COMPLETE',
} as const;

const MSG_SIGNUP_NICKNAME_DUPLICATED = '이미 사용 중인 닉네임입니다.';
const MSG_SIGNUP_NICKNAME_INVALID = '사용할 수 없는 닉네임입니다. 다시 확인해주세요.';

type Step = (typeof STEP)[keyof typeof STEP];

const SignUp = () => {
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const outlet = useOutlet();
  const queryClient = useQueryClient();

  const [step, setStep] = useState<Step>(STEP.NICKNAME);
  const [nickname, setNickname] = useState<string>('');
  const [agreedTermIds, setAgreedTermIds] = useState<number[]>([]);

  const {
    data: terms = [],
    isError: isTermsError,
    isLoading: isTermsLoading,
  } = useQuery({
    queryKey: ['terms', 'latest'],
    queryFn: getLatestTerms,
    retry: false,
  });

  const completeSignupMutation = useMutation({
    mutationFn: completeSignup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      setStep(STEP.COMPLETE);
    },
  });

  const nicknameAvailabilityMutation = useMutation({
    mutationFn: getNicknameAvailability,
    onSuccess: (data) => {
      if (data?.available) {
        setStep(STEP.TERMS);
        return;
      }

      addToast({
        description: MSG_SIGNUP_NICKNAME_DUPLICATED,
        type: 'error',
      });
    },
    onError: () => {
      addToast({
        description: MSG_SIGNUP_NICKNAME_INVALID,
        type: 'error',
      });
    },
  });

  const handleChangeNickname = (nextNickname: string) => {
    setNickname(nextNickname);
    nicknameAvailabilityMutation.reset();
  };

  const handleNicknameNext = () => {
    if (!validateNickname(nickname.trim())) {
      addToast({
        description: MSG_SIGNUP_NICKNAME_INVALID,
        type: 'error',
      });
      return;
    }

    nicknameAvailabilityMutation.mutate(nickname.trim());
  };

  const handleChangeAgreedTermIds = (nextAgreedTermIds: number[]) => setAgreedTermIds(nextAgreedTermIds);

  const handleTermsPrev = () => setStep(STEP.NICKNAME);
  const handleTermsNext = () => {
    if (completeSignupMutation.isPending) return;

    completeSignupMutation.mutate({
      agreements: agreedTermIds.map((termsId) => ({
        agreed: true,
        termsId,
      })),
      nickname: nickname.trim(),
    });
  };

  const handleComplete = () => navigate('/');

  if (outlet) return <Outlet />;

  if (step === STEP.NICKNAME) {
    return (
      <NicknameStep
        isChecking={nicknameAvailabilityMutation.isPending}
        nickname={nickname}
        onChangeNickname={handleChangeNickname}
        onNext={handleNicknameNext}
      />
    );
  }

  if (step === STEP.TERMS) {
    if (isTermsLoading) return <Loading />;

    if (isTermsError)
      return <NicknameStep nickname={nickname} onChangeNickname={handleChangeNickname} onNext={handleNicknameNext} />;

    return (
      <TermsStep
        agreedTermIds={agreedTermIds}
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
