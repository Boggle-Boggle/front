import { useEffect, useReducer, useState } from 'react';

import Alert from 'components/Alert';
import Button from 'components/Button';
import Header from 'components/Header';
import Highlight from 'components/Highlight';

import useDevice from 'hooks/useDevice';

import { TermWithAgree } from 'types/user';

import TermsItem from './TermsItem';

type TermsAgreementProps = {
  terms: TermWithAgree[];
  setTerms: React.Dispatch<React.SetStateAction<TermWithAgree[]>>;
  onPrev: () => void;
  onNext: () => void;
};

const TermsAgreement = ({ terms, setTerms, onPrev, onNext }: TermsAgreementProps) => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [selectedTerm, setSelectedTerm] = useState<TermWithAgree | null>(null);
  const [isAllMandatoryChecked, setIsAllMandatoryChecked] = useState<boolean>(false);
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);

  const { isIOS } = useDevice();

  const handleNext = () => {
    if (!isAllMandatoryChecked) {
      handleAlertActive();
      return;
    }

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
  };

  const handleAllCheck = () => {
    const newCheckStatus = !isAllChecked;
    setTerms((preStatus) => preStatus?.map((status) => ({ ...status, isAgree: newCheckStatus })));
  };

  useEffect(() => {
    const allChecked = terms.every((term) => term.isAgree);
    setIsAllChecked(allChecked);

    const newIsAllMAndatoryChecked = terms.every((term) => {
      if (term.mandatory) return term.isAgree === term.mandatory;
      return true;
    });

    setIsAllMandatoryChecked(newIsAllMAndatoryChecked);
  }, [terms]);

  return (
    <>
      {isAlertActive && <Alert message="모든 약관에 동의해주세요" onClose={handleAlertActive} />}
      {!selectedTerm && (
        <Header title={<>회원가입</>} leftBtn={<button onClick={onPrev} type="button" aria-label="뒤로가기" />} />
      )}
      <section
        className={`${isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd'} flex w-full flex-col p-9`}
      >
        <h1 className="text-[2rem] font-semibold leading-[3rem]">
          빼곡을
          <br /> 이용하기 전{' '}
          <span className="relative inline-block">
            <span className="relative z-10">몇 가지</span>
            <Highlight />
          </span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">동의</span>
            <Highlight />
          </span>
          가 필요해요
        </h1>
        <p className="pb-10 pt-2 text-sm opacity-50">원활한 사용을 위해 약관에 동의해주세요</p>
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
            <Button handleClick={handleNext} disabled={!isAllMandatoryChecked}>
              빼곡 시작하기
            </Button>
          </div>
        </form>
      </section>
      {selectedTerm && (
        <div className="absolute top-0 z-20 h-full w-full bg-white">
          <Header
            title={selectedTerm.title ?? '약관동의'}
            rightBtn={<button onClick={() => setSelectedTerm(null)} type="button" aria-label="뒤로가기" />}
          />
          <section
            className={` ${isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd'} mx-4 flex flex-col overflow-y-auto whitespace-pre-wrap`}
          >
            {selectedTerm.content}
          </section>
        </div>
      )}
    </>
  );
};

export default TermsAgreement;
