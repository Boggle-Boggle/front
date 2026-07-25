import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ChangeEvent, useState } from 'react';
import { useToastStore } from 'stores/useToastStore';

import { Button } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import { Input } from 'components/Input';
import { ContentModal } from 'components/Layer/ContentModal';
import { IconCircleDeleteFilled, IconPen } from 'components/icons';

import { BOOKSHELVES_QUERY_KEY, createBookshelf, getBookshelves, type BookshelfItem } from './api';

type GroupEditModalProps = {
  onClose: () => void;
  onDeleteGroup: (bookshelf: BookshelfItem) => void;
};

const MSG_GROUP_EDIT_TITLE = '그룹 추가 및 편집하기';
const MSG_GROUP_INPUT_PLACEHOLDER = '내가 만든 그룹';
const MSG_GROUP_DELETE = '그룹 삭제';
const MSG_GROUP_MODIFY = '그룹 수정';
const MSG_GROUP_SUBMIT = '완료';
const MSG_GROUP_SAVE_FAILED = '그룹을 저장하지 못했습니다. 다시 시도해주세요.';

export const GroupEditModal = (props: GroupEditModalProps) => {
  const { onClose, onDeleteGroup } = props;

  const [groupName, setGroupName] = useState<string>('');

  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const { data: bookshelves = [] } = useQuery({
    queryKey: BOOKSHELVES_QUERY_KEY,
    queryFn: getBookshelves,
  });

  const { isPending: isCreatePending, mutate: createGroup } = useMutation({
    mutationFn: createBookshelf,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKSHELVES_QUERY_KEY });
      onClose();
    },
    onError: () => {
      addToast({
        description: MSG_GROUP_SAVE_FAILED,
        type: 'error',
      });
    },
  });

  const handleChangeGroupName = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGroupName(event.target.value);
  };

  const handleClearGroupName = () => {
    setGroupName('');
  };

  const handleSubmitGroup = () => {
    const name = groupName.trim();

    if (name === '') {
      onClose();
      return;
    }

    createGroup({ name });
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
          {bookshelves.map((bookshelf) => (
            <li key={bookshelf.id} className="flex h-12 items-center">
              <IconButton
                label={MSG_GROUP_DELETE}
                icon={IconCircleDeleteFilled}
                onClick={() => onDeleteGroup(bookshelf)}
                className="shrink-0 text-danger"
              />
              <span className="min-w-0 flex-1 truncate text-title4">{bookshelf.name}</span>
              <IconButton
                label={MSG_GROUP_MODIFY}
                icon={IconPen}
                onClick={() => {}}
                className="shrink-0"
              />
            </li>
          ))}
        </ul>

        <Button
          size="small"
          variant="primaryLine"
          width="short"
          onClick={handleSubmitGroup}
          loading={isCreatePending}
          className="ml-auto"
        >
          {MSG_GROUP_SUBMIT}
        </Button>
      </div>
    </ContentModal>
  );
};
