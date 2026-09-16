import { ActionSheet } from 'components/Layer/ActionSheet';

type MyReviewActionSheetProps = {
  onDelete: () => void;
};

const MSG_MY_REVIEW_DELETE = '삭제하기';

export const MyReviewActionSheet = (props: MyReviewActionSheetProps) => {
  const { onDelete } = props;

  return (
    <ActionSheet
      items={[
        {
          key: 'delete',
          label: MSG_MY_REVIEW_DELETE,
          onSelect: onDelete,
        },
      ]}
    />
  );
};
