import { useGLTF } from '@react-three/drei';
import { useQuery } from '@tanstack/react-query';

import { useEffect, useReducer, useState } from 'react';

import Alert from 'components/Alert';

import useNickNameInput from 'hooks/useNickNameInput';
import { getTermsAgreement } from 'services/user';

import { TermWithAgree } from 'types/user';

import Complete from './Complete';
import NickNameInput from './NickNameInput';
import TermsAgreement from './TermsAgreement';

type StepType = '닉네임입력' | '약관동의' | '가입완료';

const SignUp = () => {
  const { scene } = useGLTF(`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/Splash.glb`);

  const [step, setStep] = useState<StepType>('닉네임입력');
  const [terms, setTerms] = useState<TermWithAgree[]>([]);

  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);
  const { nickName, saveNickName, changeNickName } = useNickNameInput('', handleAlertActive, () => setStep('약관동의'));

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
      {isAlertActive && (
        <Alert message={`사용중인 닉네임이에요 \n다른 닉네임을 입력해주세요`} onClose={handleAlertActive} />
      )}

      {step === '닉네임입력' && (
        <NickNameInput nickName={nickName} changeNickName={changeNickName} saveNickName={saveNickName} />
      )}
      {step === '약관동의' && terms && (
        <TermsAgreement
          terms={terms}
          setTerms={setTerms}
          onPrev={() => setStep('닉네임입력')}
          onNext={() => setStep('가입완료')}
        />
      )}
      {step === '가입완료' && <Complete nickName={nickName} terms={createTermsAgreement()} scene={scene} />}
    </div>
  );
};

export default SignUp;
