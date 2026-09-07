import { ActionSheet } from 'components/Layer/ActionSheet';

import { type ReadingLogSort } from '../api';

type SortActionSheetProps = {
  selectedSort: ReadingLogSort;
  onSelectSort: (sort: ReadingLogSort) => void;
};

export const SortActionSheet = (props: SortActionSheetProps) => {
  const { selectedSort, onSelectSort } = props;

  return (
    <ActionSheet
      items={[
        {
          key: 'START_DATE_DESC',
          label: '최근 읽은 순',
          selected: selectedSort === 'START_DATE_DESC',
          onSelect: () => onSelectSort('START_DATE_DESC'),
        },
        {
          key: 'START_DATE_ASC',
          label: '과거 읽은 순',
          selected: selectedSort === 'START_DATE_ASC',
          onSelect: () => onSelectSort('START_DATE_ASC'),
        },
        {
          key: 'CREATED_AT_DESC',
          label: '최근 등록 순',
          selected: selectedSort === 'CREATED_AT_DESC',
          onSelect: () => onSelectSort('CREATED_AT_DESC'),
        },
        {
          key: 'CREATED_AT_ASC',
          label: '과거 등록 순',
          selected: selectedSort === 'CREATED_AT_ASC',
          onSelect: () => onSelectSort('CREATED_AT_ASC'),
        },
        {
          key: 'RATING_DESC',
          label: '인기순',
          selected: selectedSort === 'RATING_DESC',
          onSelect: () => onSelectSort('RATING_DESC'),
        },
      ]}
    />
  );
};
