import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import { useToastStore } from 'stores/useToastStore';

import { addInterestedBook, deleteInterestedBook } from '../api';

const MSG_MYBOOKS_WISHLIST_DELETE_SUCCESS = '관심도서에서 해제되었어요.';
const MSG_MYBOOKS_WISHLIST_DELETE_FAILED = '관심도서 해제에 실패했어요.';
const MSG_MYBOOKS_WISHLIST_ADD_SUCCESS = '관심도서에 등록되었어요.';
const MSG_MYBOOKS_WISHLIST_ADD_FAILED = '관심도서 등록에 실패했어요.';

type ToggleWishlistBookParams = {
  isbn13: string;
  isInterested: boolean;
};

type ToggleWishlistBookMutationOptions = {
  onAddMutate?: (isbn13: string) => void;
  onDeleteMutate?: (isbn13: string) => void;
  onAddError?: (isbn13: string) => void;
  onDeleteError?: (isbn13: string) => void;
};

export const useToggleWishlistBookMutation = (options: ToggleWishlistBookMutationOptions = {}) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ['interested-books'] });
    };
  }, [queryClient]);

  return useMutation({
    mutationFn: ({ isbn13, isInterested }: ToggleWishlistBookParams) =>
      isInterested ? deleteInterestedBook(isbn13) : addInterestedBook(isbn13),
    onMutate: ({ isbn13, isInterested }) => {
      if (isInterested) {
        options.onDeleteMutate?.(isbn13);
        return;
      }

      options.onAddMutate?.(isbn13);
    },
    onSuccess: (_data, { isbn13, isInterested }) => {
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', isbn13] });

      const description = isInterested ? MSG_MYBOOKS_WISHLIST_DELETE_SUCCESS : MSG_MYBOOKS_WISHLIST_ADD_SUCCESS;
      addToast({ description, type: 'success' });
    },
    onError: (_error, { isbn13, isInterested }) => {
      if (isInterested) {
        options.onDeleteError?.(isbn13);
        addToast({ description: MSG_MYBOOKS_WISHLIST_DELETE_FAILED, type: 'error' });
        return;
      }

      options.onAddError?.(isbn13);
      addToast({ description: MSG_MYBOOKS_WISHLIST_ADD_FAILED, type: 'error' });
    },
  });
};
