import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { updateCustomBook, type UpdateCustomBookRequest } from '../api';

const MSG_EDIT_CUSTOM_BOOK_SUCCESS = '책 정보가 수정되었습니다.';
const MSG_EDIT_CUSTOM_BOOK_FAILED = '책 정보 수정에 실패했습니다.';

type UpdateCustomBookParams = {
  bookId: string | number;
  recordId?: string | number;
  request: UpdateCustomBookRequest;
};

export const useUpdateCustomBookMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: ({ bookId, request }: UpdateCustomBookParams) => updateCustomBook(bookId, request),
    onSuccess: (_data, { recordId }) => {
      queryClient.invalidateQueries({ queryKey: ['reading-log', recordId] });
      queryClient.invalidateQueries({ queryKey: ['reading-logs'] });
      addToast({ type: 'success', description: MSG_EDIT_CUSTOM_BOOK_SUCCESS });
      onSuccess?.();
    },
    onError: () => {
      addToast({ type: 'error', description: MSG_EDIT_CUSTOM_BOOK_FAILED });
    },
  });
};
