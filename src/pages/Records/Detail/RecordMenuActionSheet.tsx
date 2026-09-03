import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { ActionModal } from 'components/Layer/ActionModal';
import { ActionSheet } from 'components/Layer/ActionSheet';

import { deleteReadingLog } from './api';

type RecordMenuActionSheetProps = {
  recordId: string | number;
  isbn13?: string | null;
};

const MSG_RECORD_ACTION_SEARCH_MORE = '도서 검색에서 더보기';
const MSG_RECORD_ACTION_EDIT_CUSTOM = '내가 등록한 책 정보 수정하기';
const MSG_RECORD_ACTION_DELETE = '내 책에서 삭제하기';
const MSG_RECORD_ACTION_EXPORT = '노트 TXT 파일 내보내기';

const MSG_RECORD_ACTION_DELETE_SUCCESS = '내 책에서 정상적으로 삭제되었습니다.';
const MSG_RECORD_ACTION_DELETE_FAILED = '삭제에 실패했습니다. 다시 시도해 주세요.';
const MSG_RECORD_ACTION_DELETE_CONFIRM_TITLE = '내 책에서 삭제하시겠어요?';
const MSG_RECORD_ACTION_DELETE_CONFIRM_DESC = '이 책에 등록하신 모든 정보가 삭제되며 복구할 수 없습니다.\n정말로 삭제하시겠습니까?';
const MSG_RECORD_ACTION_CANCEL = '아니오';
const MSG_RECORD_ACTION_CONFIRM = '삭제합니다';
const MSG_RECORD_ACTION_EDIT_CUSTOM_PREPARING = '책 정보 수정 기능이 준비 중입니다.';

export const RecordMenuActionSheet = (props: RecordMenuActionSheetProps) => {
  const { recordId, isbn13 } = props;
  const { push, pop } = useLayerStore();
  const { addToast } = useToastStore();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isCustomBook = !isbn13;

  const { mutate: deleteLog, isPending } = useMutation({
    mutationFn: () => deleteReadingLog(recordId),
    onSuccess: () => {
      pop();

      queryClient.invalidateQueries({ queryKey: ['reading-logs'] });
      queryClient.invalidateQueries({ queryKey: ['library'] });
      if (isbn13) queryClient.invalidateQueries({ queryKey: ['books', 'detail', isbn13] });

      addToast({
        type: 'success',
        description: MSG_RECORD_ACTION_DELETE_SUCCESS,
      });

      navigate('/library', { replace: true });
    },
    onError: () => {
      addToast({
        type: 'error',
        description: MSG_RECORD_ACTION_DELETE_FAILED,
      });
    },
  });

  const handleDeleteClick = () => {
    pop();
    push({
      id: 'delete-confirm-modal',
      component: (
        <ActionModal
          title={MSG_RECORD_ACTION_DELETE_CONFIRM_TITLE}
          description={MSG_RECORD_ACTION_DELETE_CONFIRM_DESC}
          cancelLabel={MSG_RECORD_ACTION_CANCEL}
          confirmLabel={MSG_RECORD_ACTION_CONFIRM}
          confirmVariant="warning"
          onCancel={pop}
          onConfirm={deleteLog}
          isConfirmLoading={isPending}
        />
      ),
    });
  };

  const handleSearchMoreOrEdit = () => {
    if (isCustomBook) {
      // 수동 등록 도서인 경우 (수정하기 클릭)
      addToast({
        type: 'info',
        description: MSG_RECORD_ACTION_EDIT_CUSTOM_PREPARING,
      });
    } else if (isbn13) {
      // 일반 도서인 경우 (서점 사이트 열기)
      window.location.href = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=${encodeURIComponent(isbn13)}`;
    }
  };

  const handleExportNote = () => undefined;

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
        {
          key: 'export_note',
          label: MSG_RECORD_ACTION_EXPORT,
          onSelect: handleExportNote,
        },
      ]}
    />
  );
};
