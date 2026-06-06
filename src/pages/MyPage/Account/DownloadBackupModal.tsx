import { Button } from 'components/Button';
import { Modal } from 'components/Layer/Modal';

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
    <Modal>
      <div className="flex flex-col gap-1 pb-4">
        <h2 className="text-title2">{MSG_DOWNLOAD_BACKUP_TITLE}</h2>
        <p className="text-body1 text-neutral-60">{MSG_DOWNLOAD_BACKUP_DESCRIPTION}</p>
      </div>

      <div className="flex items-center gap-1 text-body1">
        <Button onClick={onCancel} variant="grey" size="small" className="text-neutral-60">
          {MSG_DOWNLOAD_BACKUP_CANCEL}
        </Button>
        <Button onClick={onConfirm} variant="grey" size="small">
          {MSG_DOWNLOAD_BACKUP_CONFIRM}
        </Button>
      </div>
    </Modal>
  );
};

export default DownloadBackupModal;
