import IconButton from 'components/Button/IconButton';
import { Header } from 'components/Header';
import { BackButton } from 'components/Header/BackButton';
import { Searchbar } from 'components/Searchbar';
import { IconSearch } from 'components/icons';

type NoteListHeaderProps = {
  isSearchMode: boolean;
  bookTitle: string;
  searchKeyword: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  onSearchKeywordChange: (value: string) => void;
  onOpenSearchMode: () => void;
  onCloseSearchMode: () => void;
};

export const NoteListHeader = (props: NoteListHeaderProps) => {
  const {
    isSearchMode,
    bookTitle,
    searchKeyword,
    searchPlaceholder,
    searchAriaLabel,
    onSearchKeywordChange,
    onOpenSearchMode,
    onCloseSearchMode,
  } = props;

  if (isSearchMode) {
    return (
      <div className="flex w-full items-center justify-start pr-mobile pt-safe-top">
        <BackButton onClick={onCloseSearchMode} />
        <Searchbar
          value={searchKeyword}
          onChange={onSearchKeywordChange}
          placeholder={searchPlaceholder}
          className="grow"
        />
      </div>
    );
  }

  return (
    <Header
      title={bookTitle}
      withBack
      rightBtn={<IconButton onClick={onOpenSearchMode} label={searchAriaLabel} icon={IconSearch} />}
    />
  );
};
