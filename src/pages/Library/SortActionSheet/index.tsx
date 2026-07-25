import { ActionSheet } from 'components/Layer/ActionSheet';

import { type ReadingLogSort } from '../api';

type SortActionSheetProps = {
  selectedSort: ReadingLogSort;
  onSelectSort: (sort: ReadingLogSort) => void;
};

export const SortActionSheet = (props: SortActionSheetProps) => {
  const { selectedSort, onSelectSort } = props;

  const handleSelectLatest = () => onSelectSort('START_DATE_DESC');
  const handleSelectOldest = () => onSelectSort('START_DATE_ASC');
  const handleSelectPopular = () => onSelectSort('RATING_DESC');

  return (
    <ActionSheet
      items={[
        {
          key: 'START_DATE_DESC',
          label: '최신순',
          selected: selectedSort === 'START_DATE_DESC',
          onSelect: handleSelectLatest,
        },
        {
          key: 'START_DATE_ASC',
          label: '과거순',
          selected: selectedSort === 'START_DATE_ASC',
          onSelect: handleSelectOldest,
        },
        {
          key: 'RATING_DESC',
          label: '인기순',
          selected: selectedSort === 'RATING_DESC',
          onSelect: handleSelectPopular,
        },
      ]}
    />
  );
};
