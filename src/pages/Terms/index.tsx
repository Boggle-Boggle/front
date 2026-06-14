import { useNavigate, useParams } from 'react-router-dom';

import { Header } from 'components/Header';
import { BackButton } from 'components/Header/BackButton';

import { TERM_BY_ID } from 'constants/terms';

const Terms = () => {
  const navigate = useNavigate();
  const { termId } = useParams();
  const parsedTermId = Number(termId);
  const fallbackTerm = Object.values(TERM_BY_ID).find((item) => item.id === parsedTermId);
  const title = fallbackTerm?.title ?? '';
  const body = fallbackTerm?.content ?? '';

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header title={title} leftBtn={<BackButton onClick={handleClickBack} />} />

      <section className="h-full overflow-y-auto px-mobile pb-safe-bottom pt-4">
        <p className="whitespace-pre-wrap text-body1">{body}</p>
      </section>
    </>
  );
};

export default Terms;
