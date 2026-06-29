import { IconButton } from 'components/Button';
import { ContentModal } from 'components/Layer/ContentModal';
import { IconTrash } from 'components/icons';

import { EDIT_GROUP_ITEMS } from './mock';

type GroupEditModalProps = {
  onClose: () => void;
  onDeleteGroup: () => void;
};

const MSG_GROUP_EDIT_TITLE = '그룹 관리';
const MSG_GROUP_DELETE = '그룹 삭제';

export const GroupEditModal = (props: GroupEditModalProps) => {
  const { onClose, onDeleteGroup } = props;

  return (
    <ContentModal title={MSG_GROUP_EDIT_TITLE} onClose={onClose}>
      <ul className="flex flex-col divide-y divide-neutral-20">
        {EDIT_GROUP_ITEMS.map((group) => (
          <li key={group.id} className="flex min-h-12 items-center justify-between gap-3 py-2">
            <span className="text-body1 text-neutral-100">{group.name}</span>
            <IconButton label={MSG_GROUP_DELETE} icon={IconTrash} onClick={onDeleteGroup} size="sm" />
          </li>
        ))}
      </ul>
    </ContentModal>
  );
};
