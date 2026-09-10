import { ActionSheet } from 'components/Layer/ActionSheet';

type MyReviewActionSheetProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const MSG_MY_REVIEW_EDIT = '수정하기';
const MSG_MY_REVIEW_DELETE = '삭제하기';

export const MyReviewActionSheet = (props: MyReviewActionSheetProps) => {
  const { onEdit, onDelete } = props;

  return (
    <ActionSheet
      items={[
        {
          key: 'edit',
          label: MSG_MY_REVIEW_EDIT,
          onSelect: onEdit,
        },
        {
          key: 'delete',
          label: MSG_MY_REVIEW_DELETE,
          onSelect: onDelete,
        },
      ]}
    />
  );
};
