import { TextButton } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import Cancel from 'components/icons/Cancel';

type RecentSearchChipProps = {
  keyword: string;
  onClick: () => void;
  onRemove: () => void;
};

const MSG_SEARCH_RECENT_REMOVE = '최근 검색어 삭제';

export const RecentSearchChip = (props: RecentSearchChipProps) => {
  const { keyword, onClick, onRemove } = props;

  return (
    <div className="inline-flex h-[1.875rem] items-center gap-[2px] rounded-full border border-neutral-20 bg-neutral-0 pl-[10px] pr-2.5">
      <TextButton
        onClick={onClick}
        variant="default"
        size="xs"
        text={keyword}
        className="max-w-40 truncate font-medium"
      />
      <IconButton
        label={MSG_SEARCH_RECENT_REMOVE}
        icon={Cancel}
        onClick={onRemove}
        size="xxs"
        className="shrink-0 text-neutral-40 hover:text-neutral-60"
      />
    </div>
  );
};
