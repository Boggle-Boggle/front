import { useNavigate, useParams } from 'react-router-dom';

import { Header } from 'components/Header';
import { BackButton } from 'components/Header/BackButton';

import { TERM_BY_ID, type TermId } from 'constants/terms';

const TermsDetail = () => {
  const navigate = useNavigate();
  const { termId } = useParams();

  const parsedTermId = Number(termId);
  const term = TERM_BY_ID[parsedTermId as TermId];
  const handleClickBack = () => navigate('/signup');

  if (!term) return null;

  return (
    <>
      <Header title={term.title} leftBtn={<BackButton onClick={handleClickBack} />} />

      <section className="h-full overflow-y-auto px-mobile pb-safe-bottom pt-4">
        <p className="whitespace-pre-wrap text-body1">{term.content}</p>
      </section>
    </>
  );
};

export default TermsDetail;
