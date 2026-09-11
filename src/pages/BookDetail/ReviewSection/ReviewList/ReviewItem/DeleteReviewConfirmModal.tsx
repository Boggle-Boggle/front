import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { ActionModal } from 'components/Layer/ActionModal';
import { deleteBookReview } from 'pages/BookDetail/api';

const MSG_DELETE_REVIEW_MODAL_TITLE = '리뷰 삭제하기';
const MSG_DELETE_REVIEW_MODAL_DESCRIPTION = '정말 작성하신 리뷰를 삭제하시겠어요?';
const MSG_DELETE_REVIEW_MODAL_CANCEL = '아니오';
const MSG_DELETE_REVIEW_MODAL_CONFIRM = '네';
const MSG_DELETE_REVIEW_SUCCESS_TOAST = '리뷰가 삭제되었습니다.';
const MSG_DELETE_REVIEW_FAILED_TOAST = '리뷰 삭제에 실패했습니다.';

type DeleteReviewConfirmModalProps = {
  reviewId: string;
};

export const DeleteReviewConfirmModal = ({ reviewId }: DeleteReviewConfirmModalProps) => {
  const queryClient = useQueryClient();

  const { pop } = useLayerStore();
  const { addToast } = useToastStore();
  const { isbn13 = '' } = useParams();

  const { mutate } = useMutation({
    mutationFn: () => deleteBookReview(reviewId),
    onSuccess: () => {
      addToast({ description: MSG_DELETE_REVIEW_SUCCESS_TOAST, type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['books', isbn13, 'reviews'] });
      pop();
    },
    onError: () => {
      addToast({ description: MSG_DELETE_REVIEW_FAILED_TOAST, type: 'error' });
    },
  });

  return (
    <ActionModal
      title={MSG_DELETE_REVIEW_MODAL_TITLE}
      description={MSG_DELETE_REVIEW_MODAL_DESCRIPTION}
      cancelLabel={MSG_DELETE_REVIEW_MODAL_CANCEL}
      confirmLabel={MSG_DELETE_REVIEW_MODAL_CONFIRM}
      onCancel={pop}
      onConfirm={mutate}
      confirmVariant="warning"
    />
  );
};
