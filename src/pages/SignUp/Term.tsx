import { BiX } from 'react-icons/bi';

import Button from 'components/Button';
import Header from 'components/Header';

import { TermWithAgree } from 'types/user';

type TermProps = {
  selectedTerm: TermWithAgree;
  handleCheckboxChange: (id: number) => void;
  setSelectedTerm: React.Dispatch<React.SetStateAction<TermWithAgree | null>>;
};

const Term = ({ selectedTerm, setSelectedTerm, handleCheckboxChange }: TermProps) => {
  const { title, content, id, isAgree } = selectedTerm;

  const handleAgreementClick = () => {
    if (!isAgree) handleCheckboxChange(id);

    setSelectedTerm(null);
  };

  return (
    <div className="absolute top-0 z-20 w-full bg-white">
      <Header
        title={title ?? '약관동의'}
        rightBtn={<BiX style={{ width: '28px', height: '28px' }} onClick={() => setSelectedTerm(null)} />}
      />
      <section className="height-without-header mx-4 flex flex-col overflow-y-auto">
        <p className="h-full overflow-y-scroll whitespace-pre-wrap">{content}</p>

        <div className="flex flex-col items-center gap-4">
          <Button handleClick={handleAgreementClick} className="my-4 w-full text-white">
            동의하기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Term;
