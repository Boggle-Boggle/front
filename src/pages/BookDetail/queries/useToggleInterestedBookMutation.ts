import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import type { BookDetail } from 'types';

import { addInterestedBook, deleteInterestedBookByItemId } from '../api';

const MSG_BOOK_DETAIL_WISHLIST_FAILED = '관심도서 처리에 실패했어요.';
const MSG_BOOK_DETAIL_WISHLIST_ADD_SUCCESS = '관심도서에 등록되었어요.';
const MSG_BOOK_DETAIL_WISHLIST_DELETE_SUCCESS = '관심도서에서 해제되었어요.';

type ToggleInterestedBookParams = {
  itemId: number;
  isInterested: boolean;
};

type ToggleInterestedBookContext = {
  previousDetail?: BookDetail;
};

const getWishlistSuccessMessage = (isInterested: boolean) => {
  if (isInterested) return MSG_BOOK_DETAIL_WISHLIST_DELETE_SUCCESS;

  return MSG_BOOK_DETAIL_WISHLIST_ADD_SUCCESS;
};

export const useToggleInterestedBookMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<void, Error, ToggleInterestedBookParams, ToggleInterestedBookContext>({
    mutationFn: async ({ itemId, isInterested }) => {
      if (isInterested) {
        await deleteInterestedBookByItemId(itemId);
        return;
      }

      await addInterestedBook(itemId);
    },
    onMutate: async ({ itemId, isInterested }) => {
      await queryClient.cancelQueries({ queryKey: ['books', 'detail', itemId] });

      const previousDetail = queryClient.getQueryData<BookDetail>(['books', 'detail', itemId]);

      queryClient.setQueryData<BookDetail>(['books', 'detail', itemId], (prev) => {
        if (!prev) return prev;

        return { ...prev, isInterested: !isInterested };
      });

      return { previousDetail };
    },
    onError: (_error, { itemId }, context) => {
      if (context?.previousDetail) queryClient.setQueryData(['books', 'detail', itemId], context.previousDetail);

      addToast({ description: MSG_BOOK_DETAIL_WISHLIST_FAILED, type: 'error' });
    },
    onSuccess: (_data, { isInterested }) => {
      const successMessage = getWishlistSuccessMessage(isInterested);

      addToast({ description: successMessage, type: 'success' });
    },
    onSettled: (_data, _error, { itemId }) => {
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', itemId] });
      queryClient.invalidateQueries({ queryKey: ['interested-books'] });
    },
  });
};
