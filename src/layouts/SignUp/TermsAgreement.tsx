import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import Header from 'components/ui/Header';

import SignUpBtn from './SignUpBtn';
import TermsItem from './TermsItem';

const TERMS = [
  {
    id: 1,
    title: '서비스 이용 약관 동의',
    text: '서비스 이용 약관 동의 본문',
    isChecked: false,
    isRequired: true,
  },
  {
    id: 2,
    title: '개인정보 수집 및 이용 동의',
    text: '개인정보 수집 및 이용 동의 본문',
    isChecked: false,
    isRequired: true,
  },
  {
    id: 3,
    title: '개인정보 제 3자 제공 동의',
    text: '개인정보 제 3자 제공 동의 본문',
    isChecked: false,
    isRequired: true,
  },
];

type TermsAgreementProps = {
  onNext: () => void;
};

const TermsAgreement = ({ onNext }: TermsAgreementProps) => {
  const navigate = useNavigate();

  const [terms, setTerms] = useState(TERMS);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const handleCheckboxChange = (id: number) => {
    const newTerms = terms.map((term) =>
      term.id === id ? { ...term, isChecked: !term.isChecked } : term,
    );

    setTerms(() => newTerms);

    const allChecked = newTerms.every((term) => term.isChecked);
    setIsAllChecked(allChecked);
  };

  const handleAllCheck = () => {
    const newCheckStatus = !isAllChecked;
    setIsAllChecked(newCheckStatus);

    setTerms((prevTerms) => prevTerms.map((term) => ({ ...term, isChecked: newCheckStatus })));
  };

  const handleLeftBtnClick = () => navigate('/login');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAllChecked) return;

    onNext();
  };

  return (
    <>
      <Header
        title={{ text: '회원가입' }}
        leftBtn={{
          icon: <GoArrowLeft style={{ width: '24px', height: '24px' }} />,
          handleLeftBtnClick,
        }}
      />
      <section className="height-with-header flex w-full flex-col p-9">
        <h1 className="text-decoration: solid #888888; text-[32px] font-semibold">
          빼곡을
          <br /> 이용하기 전{' '}
          <span className="relative">
            몇 가지 <span className="absolute bottom-0 left-0 h-4 w-full bg-[#939185] opacity-50" />
            <span className="absolute bottom-0 right-0 h-4 w-1 bg-[#939185] opacity-50" />
          </span>
          <br />
          <span className="relative">
            동의
            <span className="absolute bottom-0 left-0 h-4 w-full bg-[#939185] opacity-50" />
            <span className="absolute bottom-0 right-0 h-4 w-1 bg-[#939185] opacity-50" />
          </span>
          가 필요해요
        </h1>
        <p className="pb-10 pt-2 text-[13px] text-neutral-500">
          원활한 사용을 위해 약관에 동의해주세요
        </p>
        <form onSubmit={handleNext} className="relative flex-grow">
          <label
            htmlFor="termsAllAgreement"
            className="flex h-[50px] cursor-pointer items-center rounded-lg bg-[#EEED] p-4"
          >
            <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-sm bg-[#747264]">
              <input
                type="checkbox"
                id="termsAllAgreement"
                className="mr-2 hidden h-6 w-6"
                checked={isAllChecked}
                onChange={handleAllCheck}
              />
              {isAllChecked && (
                <FaCheck style={{ width: '20px', height: '20px', color: 'white' }} />
              )}
            </span>

            <p className="text-base font-semibold">모든 약관에 동의합니다</p>
          </label>
          <ul className="pt-6">
            {terms.map((term) => (
              <li key={term.id}>
                <TermsItem term={term} handleCheckboxChange={handleCheckboxChange} />
              </li>
            ))}
          </ul>
          <div className={`absolute bottom-0 w-full ${!isAllChecked && 'opacity-30'}`}>
            <SignUpBtn onClick={handleNext} type="약관동의" />
          </div>
        </form>
      </section>
    </>
  );
};

export default TermsAgreement;
