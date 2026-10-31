import { useParams } from 'react-router-dom';

import { ReviewInput } from './ReviewInput';
import { ReviewList } from './ReviewList';

export const ReviewSection = () => {
  const { itemId = '' } = useParams();
  const parsedItemId = Number(itemId);

  return (
    <div className="flex w-full flex-col">
      <ReviewInput itemId={parsedItemId} />
      <ReviewList itemId={parsedItemId} />
    </div>
  );
};
