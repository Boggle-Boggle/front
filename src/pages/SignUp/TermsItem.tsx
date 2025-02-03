import Icon from 'components/Icon';

import { TermWithAgree } from 'types/user';

import { CommonActCheck, CommonNext } from 'assets/icons';

type TermsItemProps = {
  term: TermWithAgree;
  handleCheckboxChange: (id: number) => void;
  handleTermsClick: () => void;
};

const TermsItem = ({ term, handleCheckboxChange, handleTermsClick }: TermsItemProps) => {
  const { id, title, isAgree, mandatory } = term;

  return (
    <label htmlFor={`termsAgreement-${id}`} className="relative flex h-[50px] cursor-pointer items-center p-4">
      <span
        className={`mr-3 flex h-6 w-6 items-center justify-center rounded-sm ${isAgree ? 'bg-accent' : 'border border-text opacity-50'}`}
      >
        <input
          type="checkbox"
          id={`termsAgreement-${term.id}`}
          className="mr-2 hidden h-6 w-6"
          checked={isAgree}
          onChange={() => handleCheckboxChange(term.id)}
        />
        {isAgree && <Icon Component={CommonActCheck} />}
      </span>
      <p className="text-sm text-sub">{mandatory ? '(필수)' : '(선택)'}</p>
      <button className="flex h-full grow justify-between pl-3" onClick={handleTermsClick} type="button">
        <p className="mx-1 text-sm">{title}</p>
        <Icon Component={CommonNext} size="sm" />
      </button>
    </label>
  );
};

export default TermsItem;
