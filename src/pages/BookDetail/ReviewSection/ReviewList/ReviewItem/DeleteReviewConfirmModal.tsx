import { useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { ActionModal } from 'components/Layer/ActionModal';
import { useDeleteBookReviewMutation } from 'pages/BookDetail/queries/useDeleteBookReviewMutation';

const MSG_DELETE_REVIEW_MODAL_TITLE = '리뷰 삭제하기';
const MSG_DELETE_REVIEW_MODAL_DESCRIPTION = '정말 작성하신 리뷰를 삭제하시겠어요?';
const MSG_DELETE_REVIEW_MODAL_CANCEL = '아니오';
const MSG_DELETE_REVIEW_MODAL_CONFIRM = '네';

type DeleteReviewConfirmModalProps = {
  reviewId: string;
};

export const DeleteReviewConfirmModal = ({ reviewId }: DeleteReviewConfirmModalProps) => {
  const { pop } = useLayerStore();
  const { isbn13 = '' } = useParams();
  const { mutate: deleteReview } = useDeleteBookReviewMutation(pop);

  return (
    <ActionModal
      title={MSG_DELETE_REVIEW_MODAL_TITLE}
      description={MSG_DELETE_REVIEW_MODAL_DESCRIPTION}
      cancelLabel={MSG_DELETE_REVIEW_MODAL_CANCEL}
      confirmLabel={MSG_DELETE_REVIEW_MODAL_CONFIRM}
      onCancel={pop}
      onConfirm={() => deleteReview({ reviewId, isbn13 })}
      confirmVariant="warning"
    />
  );
};
