import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import useNicknameStore from 'stores/useNicknameStore';

import Header from 'components/Header';
import { IconArrowRight } from 'components/icons';
import { BottomButton, Button } from 'components/Button';
import CheckBox from 'components/refactor/CheckBox';
import Highlight from 'components/refactor/Highlight';

import { refreshToken, signUp, getTerms } from 'services/user';

import { Term } from 'types/user';

type TermsAgreementProps = {
  onPrev: () => void;
  onNext: () => void;
};

const TermsAgreement = ({ onPrev, onNext }: TermsAgreementProps) => {
  const [selectedTermIds, setSelectedTermIds] = useState<Term['id'][]>([]);
  const { nickname } = useNicknameStore();

  const { data: terms } = useQuery({
    queryKey: ['termsAgreement'],
    queryFn: () => getTerms(),
  });

  const handleToggleTerm = (id: number) => {
    if (selectedTermIds.includes(id)) setSelectedTermIds((prev) => prev.filter((termId) => termId !== id));
    else setSelectedTermIds([...selectedTermIds, id]);
  };

  const handleToggleAllTerms = () => {
    if (!terms) return;
    if (selectedTermIds.length === terms.length) setSelectedTermIds([]);
    else setSelectedTermIds(terms.map((term) => term.id));
  };

  const handleNext = async () => {
    if (!terms) return;
    if (selectedTermIds.length !== terms.length) {
      // 예외처리 : 약관에 모두 동의하지 않았어요 선택약관이 없을 경우
      return;
    }

    try {
      const signUpParams = {
        nickname,
        agreements: terms.map(({ id }) => ({
          id,
          isAgree: true,
        })),
      };

      await signUp(signUpParams);
      await refreshToken();
    } catch (error) {
      return;
    }

    onNext();
  };

  return (
    <>
      <Header title="회원가입" prev={onPrev} />
      <div className="flex h-full flex-col justify-between px-mobile">
        <h1 className="mt-10 whitespace-pre-line text-h1">
          <Highlight>빼곡에 가입하시려면</Highlight>
          {'\n'}
          <Highlight>이용약관에 동의해주세요!</Highlight>
          <p className="pt-2 text-caption1 text-neutral-80">회원가입을 마치기 전에 빼곡의 이용약관을 확인해주세요</p>
        </h1>

        <div className="mb-3">
          <Button onClick={handleToggleAllTerms} variant="primaryLine">
            모든 약관에 동의합니다
          </Button>
          <ul className="ml-[0.375rem] mr-3 mt-4 text-title3">
            {terms &&
              terms.map(({ id, title }) => (
                <li className="flex h-12 items-center justify-between" key={id}>
                  <p className="flex items-center">
                    <span className="mr-2 text-body2 text-danger">필수</span>
                    {title}
                    <IconArrowRight />
                  </p>
                  <CheckBox id={`${id}`} onChange={() => handleToggleTerm(id)} checked={selectedTermIds.includes(id)} />
                </li>
              ))}
          </ul>
        </div>
      </div>

      <BottomButton onClick={handleNext} disabled={selectedTermIds.length !== terms?.length}>
        회원가입 완료하기
      </BottomButton>
    </>
  );
};

export default TermsAgreement;
