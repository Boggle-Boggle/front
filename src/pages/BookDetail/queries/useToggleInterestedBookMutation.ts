import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import type { BookDetail } from 'types';

import { addInterestedBook, deleteInterestedBookByIsbn13 } from '../api';

const MSG_BOOK_DETAIL_WISHLIST_FAILED = '관심도서 처리에 실패했습니다.';
const MSG_BOOK_DETAIL_WISHLIST_ADD_SUCCESS = '관심도서에 등록되었습니다.';
const MSG_BOOK_DETAIL_WISHLIST_DELETE_SUCCESS = '관심도서에서 해제되었습니다.';

type ToggleInterestedBookParams = {
  isbn13: string;
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
    mutationFn: async ({ isbn13, isInterested }) => {
      if (isInterested) {
        await deleteInterestedBookByIsbn13(isbn13);
        return;
      }

      await addInterestedBook(isbn13);
    },
    onMutate: async ({ isbn13, isInterested }) => {
      await queryClient.cancelQueries({ queryKey: ['books', 'detail', isbn13] });

      const previousDetail = queryClient.getQueryData<BookDetail>(['books', 'detail', isbn13]);

      queryClient.setQueryData<BookDetail>(['books', 'detail', isbn13], (prev) => {
        if (!prev) return prev;

        return { ...prev, isInterested: !isInterested };
      });

      return { previousDetail };
    },
    onError: (_error, { isbn13 }, context) => {
      if (context?.previousDetail) queryClient.setQueryData(['books', 'detail', isbn13], context.previousDetail);

      addToast({ description: MSG_BOOK_DETAIL_WISHLIST_FAILED, type: 'error' });
    },
    onSuccess: (_data, { isInterested }) => {
      const successMessage = getWishlistSuccessMessage(isInterested);

      addToast({ description: successMessage, type: 'success' });
    },
    onSettled: (_data, _error, { isbn13 }) => {
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', isbn13] });
      queryClient.invalidateQueries({ queryKey: ['interested-books'] });
    },
  });
};
