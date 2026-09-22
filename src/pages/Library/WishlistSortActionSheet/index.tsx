import { ActionSheet } from 'components/Layer/ActionSheet';

import { type InterestedBookSort } from '../api';

type WishlistSortActionSheetProps = {
  selectedSort: InterestedBookSort;
  onSelectSort: (sort: InterestedBookSort) => void;
};

export const WishlistSortActionSheet = (props: WishlistSortActionSheetProps) => {
  const { selectedSort, onSelectSort } = props;

  return (
    <ActionSheet
      items={[
        {
          key: 'RECENT',
          label: '최근 등록 순',
          selected: selectedSort === 'RECENT',
          onSelect: () => onSelectSort('RECENT'),
        },
        {
          key: 'OLDEST',
          label: '과거 등록 순',
          selected: selectedSort === 'OLDEST',
          onSelect: () => onSelectSort('OLDEST'),
        },
      ]}
    />
  );
};
