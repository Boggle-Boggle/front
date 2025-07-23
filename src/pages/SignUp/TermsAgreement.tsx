// import { useEffect, useReducer, useState } from 'react';

import Header from 'components/Header';
import { IconArrowRight } from 'components/icons';
import { BottomButton, Button } from 'components/refactor/Button';
import CheckBox from 'components/refactor/CheckBox';
import Highlight from 'components/refactor/Highlight';

import { Term } from 'types/user';

type TermsAgreementProps = {
  terms: Term[];
  onPrev: () => void;
  onNext: () => void;
};

const TermsAgreement = ({ terms, onPrev, onNext }: TermsAgreementProps) => {
  // const [selectedTerm, setSelectedTerm] = useState<TermWithAgree | null>(null);
  // const [isAllMandatoryChecked, setIsAllMandatoryChecked] = useState<boolean>(false);
  // const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);

  // const handleNext = () => {
  //   if (!isAllMandatoryChecked) {
  //     handleAlertActive();
  //     return;
  //   }

  //   onNext();
  // };

  // const handleTermsClick = (id: number) => {
  //   if (!terms) return;

  //   const newSelectedTerm = terms.filter((term) => term.id === id)[0];
  //   setSelectedTerm(newSelectedTerm);
  // };

  // const handleCheckboxChange = (id: number) => {
  //   if (!terms) return;

  //   const newTerms = terms.map((term) => (term.id === id ? { ...term, isAgree: !term.isAgree } : term));
  //   setTerms(() => newTerms);
  // };

  // const handleAllCheck = () => {
  //   const newCheckStatus = !isAllChecked;
  //   setTerms((preStatus) => preStatus?.map((status) => ({ ...status, isAgree: newCheckStatus })));
  // };

  // useEffect(() => {
  //   const allChecked = terms.every((term) => term.isAgree);
  //   setIsAllChecked(allChecked);

  //   const newIsAllMAndatoryChecked = terms.every((term) => {
  //     if (term.mandatory) return term.isAgree === term.mandatory;
  //     return true;
  //   });

  //   setIsAllMandatoryChecked(newIsAllMAndatoryChecked);
  // }, [terms]);

  return (
    <>
      <Header title="회원가입" />
      <div className="flex h-full flex-col justify-between px-mobile">
        <h1 className="mt-10 whitespace-pre-line text-h1">
          <Highlight>빼곡에 가입하시려면</Highlight>
          {'\n'}
          <Highlight>이용약관에 동의해주세요!</Highlight>
          <p className="pt-2 text-caption1 text-neutral-80">회원가입을 마치기 전에 빼곡의 이용약관을 확인해주세요</p>
        </h1>

        <div className="mb-3">
          <Button onClick={() => {}} variant="primaryLine">
            모든 약관에 동의합니다
          </Button>
          <ul className="ml-[0.375rem] mr-3 mt-4 text-title3">
            {terms.map(({ id, title }) => (
              <li className="flex h-12 items-center justify-between" key={id}>
                <p className="flex items-center">
                  <span className="mr-2 text-body2 text-danger">필수</span>
                  <p>{title}</p>
                  <IconArrowRight />
                </p>
                <CheckBox onChange={() => {}} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <BottomButton onClick={onNext}>회원가입 완료하기</BottomButton>
      {/* 
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
        </form> */}
    </>
  );
};

export default TermsAgreement;
