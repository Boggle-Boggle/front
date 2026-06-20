import { useLayerStore } from 'stores/useLayerStore';

import { Button } from 'components/Button';
import { Modal } from 'components/Layer/Modal';

type ClearAllConfirmModalProps = {
  onConfirm: () => void;
};

const MSG_RECENT_SEARCH_CLEAR_TITLE = '최근 검색어를 전체 삭제하시겠어요?';
const MSG_RECENT_SEARCH_CLEAR_DESCRIPTION = '삭제된 검색어는 복구되지 않습니다.';
const MSG_RECENT_SEARCH_CLEAR_CANCEL = '아니오';
const MSG_RECENT_SEARCH_CLEAR_CONFIRM = '네';

export const ClearAllConfirmModal = (props: ClearAllConfirmModalProps) => {
  const { onConfirm } = props;
  const { pop } = useLayerStore();

  const handleClose = () => pop();

  const handleConfirm = () => {
    onConfirm();
    pop();
  };

  return (
    <Modal>
      <div className="flex flex-col gap-5 px-5 py-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-title2 text-neutral-100">{MSG_RECENT_SEARCH_CLEAR_TITLE}</h2>
          <p className="text-body1 text-neutral-60">{MSG_RECENT_SEARCH_CLEAR_DESCRIPTION}</p>
        </div>
        <div className="flex gap-1">
          <Button onClick={handleClose} variant="grey" size="small" className="flex-1">
            {MSG_RECENT_SEARCH_CLEAR_CANCEL}
          </Button>
          <Button onClick={handleConfirm} variant="grey" size="small" className="flex-1">
            {MSG_RECENT_SEARCH_CLEAR_CONFIRM}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
