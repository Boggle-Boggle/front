import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { TextButton } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import { Header } from 'components/Header';
import { IconCircleDeleteFilled, IconPen } from 'components/icons';

import { AddGroupModal } from './components/AddGroupModal';
import { RenameGroupModal } from './components/RenameGroupModal';
import { GroupDeleteConfirmModal } from '../../Records/shared/GroupDeleteConfirmModal';
import type { BookshelfItem } from '../../Records/shared/api';
import { useBookshelvesQuery } from '../../Records/shared/queries/useBookshelvesQuery';

const MSG_GROUP_EDIT_TITLE = '그룹 편집';
const MSG_GROUP_EDIT_CANCEL = '취소';
const MSG_GROUP_EDIT_COMPLETE = '완료';
const MSG_GROUP_LIST = '그룹 리스트';
const MSG_GROUP_ADD = '추가하기';
const MSG_GROUP_DELETE = '그룹 삭제';
const MSG_GROUP_RENAME = '그룹 이름 수정';
const MSG_GROUP_LIMIT_EXCEEDED = '그룹 책장은 20개까지 생성할 수 있어요';

const GroupEditPage = () => {
  const navigate = useNavigate();
  const { push, pop } = useLayerStore();
  const { addToast } = useToastStore();

  const {
    data: bookshelves = [],
    error: bookshelvesError,
    isLoading: isBookshelvesLoading,
    isError: isBookshelvesError,
  } = useBookshelvesQuery();
  const handleCancel = () => navigate('/library');
  const handleComplete = () => navigate('/library');

  const handleAddGroup = () => {
    if (bookshelves.length >= 20) {
      addToast({ description: MSG_GROUP_LIMIT_EXCEEDED, type: 'error' });
      return;
    }

    push({
      id: 'group-name-add',
      component: <AddGroupModal onClose={pop} />,
    });
  };

  const handleRenameGroup = (bookshelf: BookshelfItem) =>
    push({
      id: `group-name-rename-${bookshelf.id}`,
      component: <RenameGroupModal bookshelf={bookshelf} onClose={pop} />,
    });

  const handleDeleteGroup = (bookshelf: BookshelfItem) => {
    push({
      id: `group-edit-delete-${bookshelf.id}`,
      component: <GroupDeleteConfirmModal bookshelf={bookshelf} onClose={pop} />,
    });
  };

  if (isBookshelvesError) throw bookshelvesError;

  return (
    <div className="h-full overflow-y-auto pb-safe-bottom">
      <Header
        title={MSG_GROUP_EDIT_TITLE}
        leftBtn={
          <button type="button" onClick={handleCancel} className="px-4 text-body2 text-neutral-80">
            {MSG_GROUP_EDIT_CANCEL}
          </button>
        }
        rightBtn={
          <button type="button" onClick={handleComplete} className="px-4 text-body2 text-neutral-80">
            {MSG_GROUP_EDIT_COMPLETE}
          </button>
        }
      />

      <div className="flex items-center justify-between px-mobile">
        <h2 className="text-title4 text-neutral-80">{MSG_GROUP_LIST}</h2>
        <TextButton
          onClick={handleAddGroup}
          disabled={isBookshelvesLoading}
          text={MSG_GROUP_ADD}
          size="md"
          variant="filled"
        />
      </div>

      {isBookshelvesLoading && <div className="skeleton mt-6 h-12 w-full" />}
      {!isBookshelvesLoading && (
        <ul className="mt-3">
          {bookshelves.map((bookshelf) => (
            <li key={bookshelf.id} className="flex h-12 items-center">
              <IconButton
                label={`${bookshelf.name} ${MSG_GROUP_DELETE}`}
                icon={IconCircleDeleteFilled}
                onClick={() => handleDeleteGroup(bookshelf)}
                className="shrink-0 text-danger"
              />
              <span className="min-w-0 flex-1 truncate text-title4">{bookshelf.name}</span>
              <IconButton
                label={`${bookshelf.name} ${MSG_GROUP_RENAME}`}
                icon={IconPen}
                onClick={() => handleRenameGroup(bookshelf)}
                className="shrink-0"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupEditPage;
