import { ActionSheet } from 'components/Layer/ActionSheet';

type BookMenuActionSheetProps = {
  onOpenStore: () => void;
  onShare: () => void;
};

const MSG_BOOK_DETAIL_ACTION_MORE_AT_STORE = '서점 사이트에서 더보기';
const MSG_BOOK_DETAIL_ACTION_SHARE = '공유하기';

export const BookMenuActionSheet = (props: BookMenuActionSheetProps) => {
  const { onOpenStore, onShare } = props;

  return (
    <ActionSheet
      items={[
        {
          key: 'store',
          label: MSG_BOOK_DETAIL_ACTION_MORE_AT_STORE,
          onSelect: onOpenStore,
        },
        {
          key: 'share',
          label: MSG_BOOK_DETAIL_ACTION_SHARE,
          onSelect: onShare,
        },
      ]}
    />
  );
};
