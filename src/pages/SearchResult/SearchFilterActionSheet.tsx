import { ActionSheet } from 'components/Layer/ActionSheet';

export type SearchFilterType = 'paper' | 'ebook';

type SearchFilterActionSheetProps = {
  selectedFilter: SearchFilterType;
  onSelectFilter: (filter: SearchFilterType) => void;
};

const MSG_SEARCH_FILTER_PAPER = '종이책 검색';
const MSG_SEARCH_FILTER_EBOOK = '전자책 검색';

export const SearchFilterActionSheet = (props: SearchFilterActionSheetProps) => {
  const { selectedFilter, onSelectFilter } = props;

  return (
    <ActionSheet
      items={[
        {
          key: 'paper',
          label: MSG_SEARCH_FILTER_PAPER,
          selected: selectedFilter === 'paper',
          onSelect: () => onSelectFilter('paper'),
        },
        {
          key: 'ebook',
          label: MSG_SEARCH_FILTER_EBOOK,
          selected: selectedFilter === 'ebook',
          onSelect: () => onSelectFilter('ebook'),
        },
      ]}
    />
  );
};
