import { ActionSheet } from 'components/Layer/ActionSheet';

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
