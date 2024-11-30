import { BiX } from 'react-icons/bi';

import { TermWithAgree } from 'types/user';

import Button from 'components/ui/Button';
import Header from 'components/ui/Header';

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
        title={{ text: title ?? '약관동의' }}
        rightBtn={{
          icon: <BiX style={{ width: '28px', height: '28px' }} />,
          handleRightBtnClick: () => setSelectedTerm(null),
        }}
      />
      <section className="height-without-header mx-4 flex flex-col overflow-y-auto">
        <p className="h-full overflow-y-scroll">{content}</p>

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
