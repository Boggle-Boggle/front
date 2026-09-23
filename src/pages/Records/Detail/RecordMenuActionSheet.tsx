import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { ActionSheet } from 'components/Layer/ActionSheet';

import { RecordDeleteConfirmModal } from './RecordDeleteConfirmModal';

type EditableCustomBook = {
  id?: string | number;
  title: string;
  author: string;
  publisher?: string;
  isbn?: string;
  totalPages?: number;
  coverUrl?: string;
  description?: string;
};

type RecordMenuActionSheetProps = {
  recordId: string | number;
  isbn13?: string | null;
  customBook?: EditableCustomBook;
};

const MSG_RECORD_ACTION_SEARCH_MORE = '도서 검색에서 더보기';
const MSG_RECORD_ACTION_EDIT_CUSTOM = '내가 등록한 책 정보 수정하기';
const MSG_RECORD_ACTION_DELETE = '독서기록 삭제하기';

export const RecordMenuActionSheet = (props: RecordMenuActionSheetProps) => {
  const { recordId, isbn13, customBook } = props;
  const { push, pop } = useLayerStore();

  const navigate = useNavigate();

  const isCustomBook = !isbn13;

  const handleDeleteClick = () => {
    pop();
    push({
      id: 'delete-confirm-modal',
      component: <RecordDeleteConfirmModal recordId={recordId} isbn13={isbn13} />,
    });
  };

  const handleSearchMoreOrEdit = () => {
    if (isCustomBook && customBook) {
      pop();
      navigate('/records/new/custom-book', {
        state: {
          mode: 'edit',
          recordId,
          customBook: {
            ...customBook,
            mediaType: 'BOOK',
          },
        },
      });
    } else if (isbn13) {
      navigate(`/books/${isbn13}`);
    }
  };

  return (
    <ActionSheet
      items={[
        {
          key: isCustomBook ? 'edit_custom' : 'search_more',
          label: isCustomBook ? MSG_RECORD_ACTION_EDIT_CUSTOM : MSG_RECORD_ACTION_SEARCH_MORE,
          onSelect: handleSearchMoreOrEdit,
        },
        {
          key: 'delete_my_book',
          label: MSG_RECORD_ACTION_DELETE,
          onSelect: handleDeleteClick,
        },
      ]}
    />
  );
};
