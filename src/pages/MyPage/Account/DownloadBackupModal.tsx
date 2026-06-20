import { ActionModal } from 'components/Layer/ActionModal';

type DownloadBackupModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

const MSG_DOWNLOAD_BACKUP_TITLE = '백업 기록을 다운 받으시겠습니까?';
const MSG_DOWNLOAD_BACKUP_DESCRIPTION =
  '백업 기록은 지금까지 저장한 책과 노트의 기록을 TXT 파일로 이 디바이스에 저장됩니다.';
const MSG_DOWNLOAD_BACKUP_CANCEL = '아니오';
const MSG_DOWNLOAD_BACKUP_CONFIRM = '다운받기';

const DownloadBackupModal = (props: DownloadBackupModalProps) => {
  const { onCancel, onConfirm } = props;

  return (
    <ActionModal
      title={MSG_DOWNLOAD_BACKUP_TITLE}
      description={MSG_DOWNLOAD_BACKUP_DESCRIPTION}
      cancelLabel={MSG_DOWNLOAD_BACKUP_CANCEL}
      confirmLabel={MSG_DOWNLOAD_BACKUP_CONFIRM}
      onCancel={onCancel}
      onConfirm={onConfirm}
      confirmVariant="grey"
    />
  );
};

export default DownloadBackupModal;
