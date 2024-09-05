import { FaCheck } from 'react-icons/fa6';
import { GoChevronRight } from 'react-icons/go';

type Term = {
  id: number;
  title: string;
  text: string;
  isChecked: boolean;
  isRequired: boolean;
};

type TermsItemProps = {
  term: Term;
  handleCheckboxChange: (id: number) => void;
};

const TermsItem = ({ term, handleCheckboxChange }: TermsItemProps) => {
  return (
    <label
      htmlFor={`termsAgreement-${term.id}`}
      className="relative flex h-[50px] cursor-pointer items-center p-4"
    >
      <span className="bg-accent mr-3 flex h-6 w-6 items-center justify-center rounded-sm">
        <input
          type="checkbox"
          id={`termsAgreement-${term.id}`}
          className="mr-2 hidden h-6 w-6"
          checked={term.isChecked}
          onChange={() => handleCheckboxChange(term.id)}
        />
        {term.isChecked && <FaCheck style={{ width: '20px', height: '20px', color: 'white' }} />}
      </span>
      <p className="text-sub text-sm">(필수)</p>
      <p className="mx-1 text-sm">{term.title}</p>
      <span className="absolute right-0">
        <GoChevronRight style={{ color: '#2F3645' }} />
      </span>
    </label>
  );
};

export default TermsItem;
