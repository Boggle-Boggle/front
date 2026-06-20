import { ActionSheet } from 'components/Layer/ActionSheet';

type ReviewActionSheetProps = {
  onReport: () => void;
  onBlock: () => void;
};

const MSG_REVIEW_REPORT = '신고';
const MSG_REVIEW_BLOCK = '차단';

export const ReviewActionSheet = (props: ReviewActionSheetProps) => {
  const { onReport, onBlock } = props;

  return (
    <ActionSheet
      items={[
        {
          key: 'report',
          label: MSG_REVIEW_REPORT,
          onSelect: onReport,
        },
        {
          key: 'block',
          label: MSG_REVIEW_BLOCK,
          onSelect: onBlock,
        },
      ]}
    />
  );
};
