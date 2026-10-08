import { NOTE_BODY, NOTE_TITLE } from 'policy/input';
import { ChangeEvent, PointerEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Header } from 'components/Header';
import { useCreateReadingNoteMutation } from 'pages/Notes/shared/queries/useCreateReadingNoteMutation';
import { useReadingNoteQuery } from 'pages/Notes/shared/queries/useReadingNoteQuery';
import { useUpdateReadingNoteMutation } from 'pages/Notes/shared/queries/useUpdateReadingNoteMutation';

import { useKeyboard } from 'hooks/useKeyboard';

import { KeyboardDismissButton } from './components/KeyboardDismissButton';
import { NoteEditorFields } from './components/NoteEditorFields';

const MSG_NOTE_NEW_PAGE_TITLE = '노트 작성하기';
const MSG_NOTE_EDIT_PAGE_TITLE = '노트 수정하기';
const MSG_NOTE_NEW_SUBMIT = '완료';
const MSG_NOTE_NEW_TITLE_PLACEHOLDER = '노트의 제목을 입력해 주세요';
const MSG_NOTE_NEW_BODY_PLACEHOLDER = '여기를 터치하여 내용을 입력해 주세요';
const MSG_NOTE_NEW_TITLE_ARIA_LABEL = '노트 제목';
const MSG_NOTE_NEW_BODY_ARIA_LABEL = '노트 본문';
const MSG_NOTE_NEW_DISMISS_KEYBOARD = '키보드 닫기';
const MSG_NOTE_NEW_CHARACTER_COUNT_SUFFIX = '자';

type NoteNewLocationState = {
  readingLogId?: string;
};

const NoteNew = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isBodyFocused, setIsBodyFocused] = useState<boolean>(false);
  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null);

  const location = useLocation();
  const { noteId } = useParams();

  const locationState = location.state as NoteNewLocationState | undefined;
  const isEditMode = !!noteId;
  const { data: editableNote } = useReadingNoteQuery(isEditMode ? noteId : undefined);

  const readingLogId =
    locationState?.readingLogId ?? (editableNote?.readingLogId ? String(editableNote.readingLogId) : '');

  const { mutate: saveNote, isPending: isCreatePending } = useCreateReadingNoteMutation(readingLogId);
  const { mutate: editNote, isPending: isUpdatePending } = useUpdateReadingNoteMutation({
    noteId: noteId ?? '',
    readingLogId,
    editableNote,
  });
  const { bottomInset } = useKeyboard();

  useEffect(() => {
    if (!bodyTextareaRef.current) return;

    bodyTextareaRef.current.style.height = 'auto';
    bodyTextareaRef.current.style.height = `${bodyTextareaRef.current.scrollHeight}px`;
  }, [body]);

  useEffect(() => {
    if (!editableNote) return;

    setTitle(editableNote.title);
    setBody(editableNote.body);
  }, [editableNote]);

  const handleBodyFocus = () => setIsBodyFocused(true);

  const handleBodyBlur = () => setIsBodyFocused(false);

  const handleKeyboardDismissPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault(); // 버튼 터치로 포커스가 다시 이동하지 않도록 기본 동작 방지
    bodyTextareaRef.current?.blur(); // 본문 입력창 포커스 해제
    setIsBodyFocused(false); // 키보드 닫기 버튼 숨김 처리
  };

  const isPending = isCreatePending || isUpdatePending;
  const isSubmitEnabled = title.trim().length > 0 && body.trim().length > 0 && !isPending;

  const handleSubmitClick = () => {
    if (!isSubmitEnabled) return;
    if (isEditMode) {
      editNote({ title: title.trim(), body: body.trim() });
      return;
    }

    saveNote({ title: title.trim(), body: body.trim() });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.slice(0, NOTE_TITLE.maxLength));
  };

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value.slice(0, NOTE_BODY.maxLength));
  };

  const characterCount = title.length + body.length;
  const noteCharacterCountText = `${characterCount.toLocaleString()} / ${NOTE_BODY.maxLength.toLocaleString()}${MSG_NOTE_NEW_CHARACTER_COUNT_SUFFIX}`;

  return (
    <div className="flex h-full flex-col bg-neutral-0">
      <Header
        title={isEditMode ? MSG_NOTE_EDIT_PAGE_TITLE : MSG_NOTE_NEW_PAGE_TITLE}
        withBack
        rightBtn={
          <button
            type="button"
            className={`px-4 text-body2 font-bold transition-colors ${
              isSubmitEnabled ? 'font-bold text-primary' : 'text-neutral-40'
            }`}
            disabled={!isSubmitEnabled}
            onClick={handleSubmitClick}
          >
            {MSG_NOTE_NEW_SUBMIT}
          </button>
        }
      />

      <NoteEditorFields
        title={title}
        body={body}
        bodyTextareaRef={bodyTextareaRef}
        titleMinLength={NOTE_TITLE.minLength}
        titleMaxLength={NOTE_TITLE.maxLength}
        bodyMinLength={NOTE_BODY.minLength}
        bodyMaxLength={NOTE_BODY.maxLength}
        titlePlaceholder={MSG_NOTE_NEW_TITLE_PLACEHOLDER}
        bodyPlaceholder={MSG_NOTE_NEW_BODY_PLACEHOLDER}
        titleAriaLabel={MSG_NOTE_NEW_TITLE_ARIA_LABEL}
        bodyAriaLabel={MSG_NOTE_NEW_BODY_ARIA_LABEL}
        onTitleChange={handleTitleChange}
        onBodyChange={handleBodyChange}
        onBodyFocus={handleBodyFocus}
        onBodyBlur={handleBodyBlur}
      />

      <footer className="px-mobile pb-safe-bottom">
        <p className="mb-1 text-right text-caption2 text-neutral-60">{noteCharacterCountText}</p>
      </footer>

      {isBodyFocused && (
        <KeyboardDismissButton
          label={MSG_NOTE_NEW_DISMISS_KEYBOARD}
          bottomInset={bottomInset}
          onPointerDown={handleKeyboardDismissPointerDown}
        />
      )}
    </div>
  );
};

export default NoteNew;
