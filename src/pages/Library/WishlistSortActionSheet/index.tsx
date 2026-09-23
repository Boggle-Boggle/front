import { useQueryClient } from '@tanstack/react-query';

import { ActionSheet } from 'components/Layer/ActionSheet';

import { STORAGE_KEY } from 'constants/storage';

import { type InterestedBookSort } from '../api';

type WishlistSortActionSheetProps = {
  selectedSort: InterestedBookSort;
  searchKeyword: string;
  onSelectSort: (sort: InterestedBookSort) => void;
};

export const WishlistSortActionSheet = (props: WishlistSortActionSheetProps) => {
  const { selectedSort, searchKeyword, onSelectSort } = props;
  const queryClient = useQueryClient();

  const handleSelectSort = (nextSort: InterestedBookSort) => {
    if (nextSort === selectedSort) return;

    window.localStorage.setItem(STORAGE_KEY.LIBRARY_WISHLIST_SORT_TYPE, nextSort);
    onSelectSort(nextSort);
    queryClient.invalidateQueries({ queryKey: ['interested-books', 'library', searchKeyword.trim(), nextSort] });
  };

  return (
    <ActionSheet
      items={[
        {
          key: 'RECENT',
          label: '최근 등록 순',
          selected: selectedSort === 'RECENT',
          onSelect: () => handleSelectSort('RECENT'),
        },
        {
          key: 'OLDEST',
          label: '과거 등록 순',
          selected: selectedSort === 'OLDEST',
          onSelect: () => handleSelectSort('OLDEST'),
        },
      ]}
    />
  );
};
