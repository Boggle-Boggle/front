import { TextButton } from 'components/Button/TextButton';
import { StarRating } from 'components/StarRating';

import { SectionTitle } from './SectionTitle';

type RatingSectionProps = {
  rating: number;
  onChange: (value: number) => void;
  isEdit?: boolean;
};

const MSG_ADD_RECORD_RATING_TITLE = '빼곡한 별점';

export const RatingSection = (props: RatingSectionProps) => {
  const { rating, onChange, isEdit = false } = props;

  return (
    <section className="w-full">
      <SectionTitle title={MSG_ADD_RECORD_RATING_TITLE} />

      <div className="flex flex-col items-center gap-4 pt-4">
        {isEdit && <TextButton onClick={() => {}} text={`${rating.toFixed(1)}점`} size="lg" variant="primaryLine" />}
        <StarRating value={rating} readOnly={!isEdit} onChange={onChange} size={40} />
      </div>
    </section>
  );
};
