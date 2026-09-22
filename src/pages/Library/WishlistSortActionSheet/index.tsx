import { useQueryClient } from '@tanstack/react-query';

import { ActionSheet } from 'components/Layer/ActionSheet';

import { type InterestedBookSort } from '../api';

type WishlistSortActionSheetProps = {
  selectedSort: InterestedBookSort;
  searchKeyword: string;
  onSelectSort: (sort: InterestedBookSort) => void;
};

const STORAGE_KEY_MYBOOKS_WISHLIST_SORT_TYPE = 'mybooks-wishlist-sort-type';

export const WishlistSortActionSheet = (props: WishlistSortActionSheetProps) => {
  const { selectedSort, searchKeyword, onSelectSort } = props;
  const queryClient = useQueryClient();

  const handleSelectSort = (nextSort: InterestedBookSort) => {
    if (nextSort === selectedSort) return;

    window.localStorage.setItem(STORAGE_KEY_MYBOOKS_WISHLIST_SORT_TYPE, nextSort);
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
