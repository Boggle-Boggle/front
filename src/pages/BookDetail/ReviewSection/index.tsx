import { useParams } from 'react-router-dom';

import { ReviewInput } from '../shared/ReviewInput';
import { ReviewList } from '../shared/ReviewList';

export const ReviewSection = () => {
  const { isbn13 = '' } = useParams();

  return (
    <div className="flex w-full flex-col">
      <ReviewInput isbn13={isbn13} />
      <ReviewList isbn13={isbn13} />
    </div>
  );
};
