import { useQuery } from '@tanstack/react-query';

import { useNavigate, useParams } from 'react-router-dom';

import { Header } from 'components/Header';
import { BackButton } from 'components/Header/BackButton';
import { Loading } from 'components/Loading';

import { getLatestTerms } from 'services/terms';

const TermsDetail = () => {
  const navigate = useNavigate();
  const { termId } = useParams();
  const { data: terms = [], isLoading } = useQuery({
    queryKey: ['terms', 'latest'],
    queryFn: getLatestTerms,
    retry: false,
  });

  const parsedTermId = Number(termId);
  const term = terms.find((item) => item.id === parsedTermId);
  const handleClickBack = () => navigate('/signup');

  if (isLoading) return <Loading fullscreen />;

  if (!term) return null;

  return (
    <>
      <Header title={term.title} leftBtn={<BackButton onClick={handleClickBack} />} />

      <section className="h-full overflow-y-auto px-mobile pb-safe-bottom pt-4">
        <p className="whitespace-pre-wrap text-body1">{term.body}</p>
      </section>
    </>
  );
};

export default TermsDetail;
