import { ChangeEvent, useState } from 'react';

import { Button } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import { Input } from 'components/Input';
import { ContentModal } from 'components/Layer/ContentModal';
import { IconCircleDeleteFilled, IconPen } from 'components/icons';

import { EDIT_GROUP_ITEMS } from './mock';

type GroupEditModalProps = {
  onClose: () => void;
  onDeleteGroup: () => void;
};

const MSG_GROUP_EDIT_TITLE = '그룹 추가 및 편집하기';
const MSG_GROUP_INPUT_PLACEHOLDER = '내가 만든 그룹';
const MSG_GROUP_DELETE = '그룹 삭제';
const MSG_GROUP_MODIFY = '그룹 수정';
const MSG_GROUP_SUBMIT = '완료';

export const GroupEditModal = (props: GroupEditModalProps) => {
  const { onClose, onDeleteGroup } = props;
  const [groupName, setGroupName] = useState<string>('');

  const handleChangeGroupName = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGroupName(event.target.value);
  };

  const handleClearGroupName = () => {
    setGroupName('');
  };

  const handleEditGroup = (nextGroupName: string) => {
    setGroupName(nextGroupName);
  };

  return (
    <ContentModal title={MSG_GROUP_EDIT_TITLE} onClose={onClose}>
      <div className="-mt-4 flex min-h-0 flex-col gap-4">
        <Input
          value={groupName}
          onChange={handleChangeGroupName}
          onClear={handleClearGroupName}
          placeholder={MSG_GROUP_INPUT_PLACEHOLDER}
        />

        <ul className="max-h-40 min-h-0 flex-1 overflow-y-auto">
          {EDIT_GROUP_ITEMS.map((group) => (
            <li key={group.id} className="flex h-12 items-center">
              <IconButton
                label={MSG_GROUP_DELETE}
                icon={IconCircleDeleteFilled}
                onClick={onDeleteGroup}
                className="shrink-0 text-danger"
              />
              <span className="min-w-0 flex-1 truncate text-title4">{group.name}</span>
              <IconButton
                label={MSG_GROUP_MODIFY}
                icon={IconPen}
                onClick={() => handleEditGroup(group.name)}
                className="shrink-0"
              />
            </li>
          ))}
        </ul>

        <Button size="small" variant="primaryLine" width="short" onClick={onClose} className="ml-auto">
          {MSG_GROUP_SUBMIT}
        </Button>
      </div>
    </ContentModal>
  );
};
