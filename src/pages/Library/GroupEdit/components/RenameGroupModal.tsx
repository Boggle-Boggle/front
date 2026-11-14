import { useState } from 'react';
import { useToastStore } from 'stores/useToastStore';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import type { InputChangeEvent, InputKeyboardEvent } from 'components/Input';
import { ContentModal } from 'components/Layer/ContentModal';
import type { BookshelfItem } from 'pages/Records/shared/api';

import { useRenameBookshelfMutation } from '../queries/useRenameBookshelfMutation';

type RenameGroupModalProps = {
  bookshelf: BookshelfItem;
  onClose: () => void;
};

const MSG_RENAME_GROUP_TITLE = '그룹 이름 변경';
const MSG_GROUP_NAME_PLACEHOLDER = '변경할 그룹 이름을 입력해 주세요';
const MSG_GROUP_COMPLETE = '완료';
const MSG_RENAME_GROUP_SUCCESS = '그룹 이름이 변경되었어요.';

export const RenameGroupModal = (props: RenameGroupModalProps) => {
  const { bookshelf, onClose } = props;
  const { addToast } = useToastStore();
  const [groupName, setGroupName] = useState<string>(bookshelf.name);

  const { mutate: renameBookshelf, isPending: isRenamePending } = useRenameBookshelfMutation({
    onSuccess: () => {
      onClose();
      addToast({ description: MSG_RENAME_GROUP_SUCCESS, type: 'success' });
    },
  });

  const handleChangeName = (event: InputChangeEvent) => setGroupName(event.target.value);
  const handleClearName = () => setGroupName('');
  const handleSubmit = () => {
    const name = groupName.trim();
    if (!name || name === bookshelf.name || isRenamePending) return;
    renameBookshelf({ bookshelfId: bookshelf.id, name });
  };
  const handleNameKeyDown = (event: InputKeyboardEvent) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) handleSubmit();
  };

  const isSubmitDisabled = !groupName.trim() || groupName.trim() === bookshelf.name;

  return (
    <ContentModal title={MSG_RENAME_GROUP_TITLE} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label htmlFor="rename-group-name" className="sr-only">
          {MSG_GROUP_NAME_PLACEHOLDER}
        </label>
        <Input
          id="rename-group-name"
          value={groupName}
          onChange={handleChangeName}
          onClear={handleClearName}
          onKeyDown={handleNameKeyDown}
          maxLength={100}
          placeholder={MSG_GROUP_NAME_PLACEHOLDER}
        />
        <Button
          size="small"
          variant="primaryLine"
          width="short"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          loading={isRenamePending}
          className="ml-auto"
        >
          {MSG_GROUP_COMPLETE}
        </Button>
      </div>
    </ContentModal>
  );
};
