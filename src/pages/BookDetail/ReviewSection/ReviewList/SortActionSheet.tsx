import { ActionSheet } from 'components/Layer/ActionSheet';

import { REVIEW_SORT_OPTIONS, type ReviewSortType } from '../../api';

type ReviewSortActionSheetProps = {
  selectedSort: ReviewSortType;
  onSelectSort: (sort: ReviewSortType) => void;
};

export const ReviewSortActionSheet = (props: ReviewSortActionSheetProps) => {
  const { selectedSort, onSelectSort } = props;

  return (
    <ActionSheet
      items={(Object.keys(REVIEW_SORT_OPTIONS) as ReviewSortType[]).map((key) => ({
        key,
        label: REVIEW_SORT_OPTIONS[key],
        selected: selectedSort === key,
        onSelect: () => onSelectSort(key),
      }))}
    />
  );
};
