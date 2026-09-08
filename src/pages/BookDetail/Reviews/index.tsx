import { useParams } from 'react-router-dom';

import { Header } from 'components/Header';

import { ReviewInput } from '../shared/ReviewInput';
import { ReviewList } from '../shared/ReviewList';

const MSG_REVIEW_PAGE_TITLE = '빼곡한 리뷰';

export const Reviews = () => {
  const { isbn13 = '' } = useParams();

  return (
    <>
      <Header withBack title={MSG_REVIEW_PAGE_TITLE} />
      <div className="flex h-full w-full flex-col overflow-y-auto px-mobile pb-safe-bottom">
        <ReviewInput isbn13={isbn13} />
        <ReviewList isbn13={isbn13} />
      </div>
    </>
  );
};

export default Reviews;
