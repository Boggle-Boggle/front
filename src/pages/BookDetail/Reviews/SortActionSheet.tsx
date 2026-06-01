import { ActionSheet } from 'components/Layer/ActionSheet';

export type ReviewSortType = 'latest' | 'oldest' | 'popular';

type ReviewSortActionSheetProps = {
  selectedSort: ReviewSortType;
  onSelectSort: (sort: ReviewSortType) => void;
};

export const ReviewSortActionSheet = (props: ReviewSortActionSheetProps) => {
  const { selectedSort, onSelectSort } = props;

  const handleSelectLatest = () => onSelectSort('latest');
  const handleSelectOldest = () => onSelectSort('oldest');
  const handleSelectPopular = () => onSelectSort('popular');

  return (
    <ActionSheet
      items={[
        {
          key: 'latest',
          label: '최신순',
          selected: selectedSort === 'latest',
          onSelect: handleSelectLatest,
        },
        {
          key: 'oldest',
          label: '과거순',
          selected: selectedSort === 'oldest',
          onSelect: handleSelectOldest,
        },
        {
          key: 'popular',
          label: '인기순',
          selected: selectedSort === 'popular',
          onSelect: handleSelectPopular,
        },
      ]}
    />
  );
};
