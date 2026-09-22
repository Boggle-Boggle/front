import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useLayerStore } from 'stores/useLayerStore';

import { ActionModal } from 'components/Layer/ActionModal';

import { deleteRecentSearch } from './api';

type ClearAllConfirmModalProps = {
  keywords: string[];
};

const MSG_RECENT_SEARCH_CLEAR_TITLE = '최근 검색어를 전체 삭제하시겠어요?';
const MSG_RECENT_SEARCH_CLEAR_DESCRIPTION = '삭제된 검색어는 복구되지 않습니다.';
const MSG_RECENT_SEARCH_CLEAR_CANCEL = '아니오';
const MSG_RECENT_SEARCH_CLEAR_CONFIRM = '네';

export const ClearAllConfirmModal = (props: ClearAllConfirmModalProps) => {
  const { keywords } = props;
  const { pop } = useLayerStore();
  const queryClient = useQueryClient();

  const { mutate: clearRecentSearches, isPending } = useMutation({
    mutationFn: async () => {
      await Promise.all(keywords.map((keyword) => deleteRecentSearch(keyword)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books', 'recent-searches'] });
      pop();
    },
  });

  const handleClose = () => pop();

  const handleConfirm = () => clearRecentSearches();

  return (
    <ActionModal
      title={MSG_RECENT_SEARCH_CLEAR_TITLE}
      description={MSG_RECENT_SEARCH_CLEAR_DESCRIPTION}
      cancelLabel={MSG_RECENT_SEARCH_CLEAR_CANCEL}
      confirmLabel={MSG_RECENT_SEARCH_CLEAR_CONFIRM}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      isConfirmLoading={isPending}
      confirmVariant="grey"
    />
  );
};
