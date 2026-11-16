import { useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { useToastStore } from 'stores/useToastStore';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import type { InputChangeEvent, InputKeyboardEvent } from 'components/Input';
import { ContentModal } from 'components/Layer/ContentModal';
import { useCreateBookshelfMutation } from 'pages/Records/shared/queries/useCreateBookshelfMutation';

type AddGroupModalProps = {
  onClose: () => void;
};

const MSG_ADD_GROUP_TITLE = '새로운 그룹 추가';
const MSG_GROUP_NAME_PLACEHOLDER = '새 그룹 이름을 입력해 주세요';
const MSG_GROUP_COMPLETE = '완료';
const MSG_ADD_GROUP_SUCCESS = '그룹이 추가되었어요.';

export const AddGroupModal = (props: AddGroupModalProps) => {
  const { onClose } = props;
  const { addToast } = useToastStore();
  const [groupName, setGroupName] = useState<string>('');

  const queryClient = useQueryClient();
  const { mutate: createBookshelf, isPending: isCreatePending } = useCreateBookshelfMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reading-logs', 'summary'] });
      onClose();
      addToast({ description: MSG_ADD_GROUP_SUCCESS, type: 'success' });
    },
  });

  const handleChangeName = (event: InputChangeEvent) => setGroupName(event.target.value);
  const handleClearName = () => setGroupName('');
  const handleSubmit = () => {
    const name = groupName.trim();
    if (!name || isCreatePending) return;
    createBookshelf({ name });
  };
  const handleNameKeyDown = (event: InputKeyboardEvent) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) handleSubmit();
  };

  return (
    <ContentModal title={MSG_ADD_GROUP_TITLE} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label htmlFor="new-group-name" className="sr-only">
          {MSG_GROUP_NAME_PLACEHOLDER}
        </label>
        <Input
          id="new-group-name"
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
          disabled={!groupName.trim()}
          loading={isCreatePending}
          className="ml-auto"
        >
          {MSG_GROUP_COMPLETE}
        </Button>
      </div>
    </ContentModal>
  );
};
