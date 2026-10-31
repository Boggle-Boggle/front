import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import { useToastStore } from 'stores/useToastStore';

import { addInterestedBook, deleteInterestedBook } from '../api';

const MSG_MYBOOKS_WISHLIST_DELETE_SUCCESS = '관심도서에서 해제되었어요.';
const MSG_MYBOOKS_WISHLIST_DELETE_FAILED = '관심도서 해제에 실패했어요.';
const MSG_MYBOOKS_WISHLIST_ADD_SUCCESS = '관심도서에 등록되었어요.';
const MSG_MYBOOKS_WISHLIST_ADD_FAILED = '관심도서 등록에 실패했어요.';

type ToggleWishlistBookParams = {
  itemId: number;
  isInterested: boolean;
};

type ToggleWishlistBookMutationOptions = {
  onAddMutate?: (itemId: number) => void;
  onDeleteMutate?: (itemId: number) => void;
  onAddError?: (itemId: number) => void;
  onDeleteError?: (itemId: number) => void;
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
    mutationFn: ({ itemId, isInterested }: ToggleWishlistBookParams) =>
      isInterested ? deleteInterestedBook(itemId) : addInterestedBook(itemId),
    onMutate: ({ itemId, isInterested }) => {
      if (isInterested) {
        options.onDeleteMutate?.(itemId);
        return;
      }

      options.onAddMutate?.(itemId);
    },
    onSuccess: (_data, { itemId, isInterested }) => {
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', itemId] });

      const description = isInterested ? MSG_MYBOOKS_WISHLIST_DELETE_SUCCESS : MSG_MYBOOKS_WISHLIST_ADD_SUCCESS;
      addToast({ description, type: 'success' });
    },
    onError: (_error, { itemId, isInterested }) => {
      if (isInterested) {
        options.onDeleteError?.(itemId);
        addToast({ description: MSG_MYBOOKS_WISHLIST_DELETE_FAILED, type: 'error' });
        return;
      }

      options.onAddError?.(itemId);
      addToast({ description: MSG_MYBOOKS_WISHLIST_ADD_FAILED, type: 'error' });
    },
  });
};
