import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { Button } from 'components/Button';

const MSG_BLOCK_USER_MODAL_TITLE = '유저 차단하기';
const MSG_BLOCK_USER_MODAL_DESCRIPTION = '해당 유저를 차단하시겠어요?\n앞으로 해당 유저의 리뷰를 볼 수 없게 됩니다.';
const MSG_BLOCK_USER_MODAL_CANCEL = '아니오';
const MSG_BLOCK_USER_MODAL_CONFIRM = '네';
const MSG_BLOCK_USER_SUCCESS_TOAST = '해당 유저가 차단되었습니다.';

export const BlockUserConfirmModal = () => {
  const { pop } = useLayerStore();
  const { addToast } = useToastStore();

  const handleClose = () => pop();

  const handleConfirm = () => {
    addToast({
      description: MSG_BLOCK_USER_SUCCESS_TOAST,
      type: 'success',
    });
    pop();
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-title2 text-neutral-100">{MSG_BLOCK_USER_MODAL_TITLE}</h2>
        <p className="whitespace-pre-line text-body1 text-neutral-60">{MSG_BLOCK_USER_MODAL_DESCRIPTION}</p>
      </div>

      <div className="flex gap-1">
        <Button onClick={handleClose} variant="grey" size="small" className="flex-[3]">
          {MSG_BLOCK_USER_MODAL_CANCEL}
        </Button>
        <Button onClick={handleConfirm} variant="warning" size="small" className="flex-[7]">
          {/* TODO 아이콘 추가 필요 */}
          {MSG_BLOCK_USER_MODAL_CONFIRM}
        </Button>
      </div>
    </div>
  );
};
