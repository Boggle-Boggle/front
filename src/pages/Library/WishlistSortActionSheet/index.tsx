import { ActionSheet } from 'components/Layer/ActionSheet';

import { STORAGE_KEY } from 'constants/storage';

import { type InterestedBookSort } from '../api';
import { useInvalidateWishlistQuery } from '../queries/useInvalidateWishlistQuery';

type WishlistSortActionSheetProps = {
  selectedSort: InterestedBookSort;
  searchKeyword: string;
  onSelectSort: (sort: InterestedBookSort) => void;
};

export const WishlistSortActionSheet = (props: WishlistSortActionSheetProps) => {
  const { selectedSort, searchKeyword, onSelectSort } = props;
  const invalidateWishlist = useInvalidateWishlistQuery(searchKeyword);

  const handleSelectSort = (nextSort: InterestedBookSort) => {
    if (nextSort === selectedSort) return;

    window.localStorage.setItem(STORAGE_KEY.LIBRARY_WISHLIST_SORT_TYPE, nextSort);
    onSelectSort(nextSort);
    invalidateWishlist(nextSort);
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
