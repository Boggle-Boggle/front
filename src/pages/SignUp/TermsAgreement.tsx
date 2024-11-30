import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { FaCheck } from 'react-icons/fa6';
import { GoArrowLeft, GoChevronRight } from 'react-icons/go';

import { getTermsAgreement } from 'services/signup';
import { TermWithAgree } from 'types/user';

import Button from 'components/ui/Button';
import Header from 'components/ui/Header';

import TermsItem from './TermsItem';
import Term from './Term';

type TermsAgreementProps = {
  onPrev: () => void;
  onNext: () => void;
};

const TermsAgreement = ({ onPrev, onNext }: TermsAgreementProps) => {
  const [terms, setTerms] = useState<TermWithAgree[]>();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [selectedTerm, setSelectedTerm] = useState<TermWithAgree | null>(null);

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

  // TODO : 필수 약관 전부 체크 됐는지 먼저 확인하기
  const handleNext = (e: React.FormEvent) => {
    // e.preventDefault();
    // if (!isAllChecked) return;
    onNext();
  };

  const handleTermsClick = (id: number) => {
    if (!terms) return;

    const newSelectedTerm = terms.filter((term) => term.id === id)[0];
    setSelectedTerm(newSelectedTerm);
  };

  const handleCheckboxChange = (id: number) => {
    if (!terms) return;

    const newTerms = terms.map((term) => (term.id === id ? { ...term, isAgree: !term.isAgree } : term));
    setTerms(() => newTerms);

    const allChecked = newTerms.every((term) => term.isAgree);
    setIsAllChecked(allChecked);
  };

  const handleAllCheck = () => {
    const newCheckStatus = !isAllChecked;
    setIsAllChecked(!isAllChecked);

    setTerms((preStatus) => preStatus?.map((status) => ({ ...status, isAgree: newCheckStatus })));
  };

  return (
    terms && (
      <>
        <Header
          title={{ text: '회원가입' }}
          leftBtn={{
            icon: <GoArrowLeft style={{ width: '24px', height: '24px' }} />,
            handleLeftBtnClick: onPrev,
          }}
        />
        <section className="height-without-header flex w-full flex-col p-9">
          <h1 className="text-[32px] font-semibold">
            빼곡을
            <br /> 이용하기 전{' '}
            <span className="relative inline-block">
              <span className="relative z-10">몇 가지</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-accent opacity-50" />
              <span className="absolute bottom-1 right-0 h-3 w-1 bg-accent opacity-50" />
            </span>
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">동의</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-accent opacity-50" />
              <span className="absolute bottom-1 right-0 h-3 w-1 bg-accent opacity-50" />
            </span>
            가 필요해요
          </h1>
          <p className="pb-10 pt-2 text-sm text-sub">원활한 사용을 위해 약관에 동의해주세요</p>
          <form onSubmit={handleNext} className="relative flex-grow">
            <label
              htmlFor="termsAllAgreement"
              className="flex h-[50px] cursor-pointer items-center rounded-lg bg-main p-4"
            >
              <span
                className={`mr-3 flex h-6 w-6 items-center justify-center rounded-sm ${isAllChecked ? 'bg-accent' : 'border border-text opacity-50'} `}
              >
                <input
                  type="checkbox"
                  id="termsAllAgreement"
                  className="mr-2 hidden h-6 w-6"
                  checked={isAllChecked}
                  onChange={handleAllCheck}
                />
                {isAllChecked && <FaCheck style={{ width: '20px', height: '20px', color: 'white' }} />}
              </span>
              <p className="text-base font-semibold">모든 약관에 동의합니다</p>
            </label>
            <ul className="pt-6">
              {terms.map((term) => (
                <li key={term.id}>
                  <TermsItem
                    term={term}
                    handleCheckboxChange={handleCheckboxChange}
                    handleTermsClick={() => handleTermsClick(term.id)}
                  />
                </li>
              ))}
            </ul>
            <div className="absolute bottom-0 w-full">
              <Button handleClick={handleNext} disabled={!isAllChecked}>
                빼곡 시작하기
                <span>
                  <GoChevronRight style={{ color: 'white' }} />
                </span>
              </Button>
            </div>
          </form>
        </section>
        {selectedTerm && (
          <Term
            selectedTerm={selectedTerm}
            handleCheckboxChange={handleCheckboxChange}
            setSelectedTerm={setSelectedTerm}
          />
        )}
      </>
    )
  );
};

export default TermsAgreement;
