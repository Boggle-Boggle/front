import { useMutation } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import { createCustomReadingLog } from 'pages/AddCustomBook/api';

import { getAddRecordErrorMessage } from '../addRecordError';

export const useCreateCustomReadingLogMutation = () => {
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: createCustomReadingLog,
    onSuccess: ({ id }) => navigate('/records/new/completed', { replace: true, state: { readingLogId: id } }),
    onError: (error) => addToast({ description: getAddRecordErrorMessage(error), type: 'error' }),
  });
};
