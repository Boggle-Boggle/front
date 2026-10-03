import { useMutation } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import { getAddRecordErrorMessage } from '../addRecordError';
import { createReadingLog } from '../api';

export const useCreateReadingLogMutation = () => {
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: createReadingLog,
    onSuccess: ({ id }) => navigate('/records/new/completed', { replace: true, state: { readingLogId: id } }),
    onError: (error) => addToast({ description: getAddRecordErrorMessage(error), type: 'error' }),
  });
};
