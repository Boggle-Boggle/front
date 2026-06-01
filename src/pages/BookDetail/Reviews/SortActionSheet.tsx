import { ActionSheet } from 'components/Layer/ActionSheet';

export type ReviewSortType = 'latest' | 'popular';

type ReviewSortActionSheetProps = {
  selectedSort: ReviewSortType;
  onSelectSort: (sort: ReviewSortType) => void;
};

export const ReviewSortActionSheet = (props: ReviewSortActionSheetProps) => {
  const { selectedSort, onSelectSort } = props;

  const handleSelectLatest = () => onSelectSort('latest');
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
          key: 'popular',
          label: '좋아요순',
          selected: selectedSort === 'popular',
          onSelect: handleSelectPopular,
        },
      ]}
    />
  );
};
