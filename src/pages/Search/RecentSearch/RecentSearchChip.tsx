import { TextButton } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import Cancel from 'components/icons/Cancel';

type RecentSearchChipProps = {
  keyword: string;
  onClick: () => void;
  onRemove: () => void;
};

const MSG_SEARCH_RECENT_REMOVE = '최근 검색어 삭제';

// TODO: Chips 정의되면 수정예정
export const RecentSearchChip = (props: RecentSearchChipProps) => {
  const { keyword, onClick, onRemove } = props;

  return (
    <div className="inline-flex h-9 items-center rounded-full border border-neutral-20 bg-neutral-0 pl-2">
      <TextButton
        onClick={onClick}
        variant="default"
        text={keyword}
        className="max-w-48 truncate text-title4 font-semibold"
      />
      <IconButton
        label={MSG_SEARCH_RECENT_REMOVE}
        icon={Cancel}
        onClick={onRemove}
        size="xs"
        className="mr-1 text-neutral-80"
      />
    </div>
  );
};
