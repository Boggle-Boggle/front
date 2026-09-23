import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NOTE_BODY } from 'policy/input';
import { ChangeEvent, PointerEvent, SVGProps, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import { Header } from 'components/Header';
import { createReadingNote } from 'pages/Records/Detail/api';

const MSG_NOTE_NEW_PAGE_TITLE = '노트 작성하기';
const MSG_NOTE_NEW_SUBMIT = '완료';
const MSG_NOTE_NEW_TITLE_PLACEHOLDER = '노트의 제목을 입력하세요';
const MSG_NOTE_NEW_BODY_PLACEHOLDER = '여기를 터치하여 내용을 입력하세요';
const MSG_NOTE_NEW_TITLE_ARIA_LABEL = '노트 제목';
const MSG_NOTE_NEW_BODY_ARIA_LABEL = '노트 본문';
const MSG_NOTE_NEW_DISMISS_KEYBOARD = '키보드 닫기';
const MSG_NOTE_NEW_CHARACTER_COUNT_SUFFIX = '자';
const MSG_NOTE_NEW_SUCCESS = '독서 노트가 저장되었습니다.';
const MSG_NOTE_NEW_FAILED = '독서 노트를 저장하지 못했습니다. 다시 시도해 주세요.';

type NoteNewLocationState = {
  readingLogId?: string;
};

// TODO: 피그마 시안으로 교체
const KeyboardDismissIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <rect x="4" y="5" width="24" height="15" rx="2.5" stroke="currentColor" strokeWidth="2.4" />
    <path
      d="M9 10h.01M13.5 10h.01M18 10h.01M22.5 10h.01M11.25 14h.01M15.75 14h.01M20.25 14h.01"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path d="M13 17h6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="m11 24 5 5 5-5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NoteNew = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isBodyFocused, setIsBodyFocused] = useState<boolean>(false);
  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const locationState = location.state as NoteNewLocationState | undefined;
  const readingLogId = locationState?.readingLogId ?? '';
  const { mutate: saveNote, isPending } = useMutation({
    mutationFn: (data: { title: string; body: string }) => {
      return createReadingNote(readingLogId, {
        title: data.title,
        body: data.body,
        page: null,
      });
    },

    onSuccess: () => {
      addToast({ description: MSG_NOTE_NEW_SUCCESS, type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['reading-log-notes', readingLogId] });
      navigate(`/records/${readingLogId}`, { state: { activeTab: 'note' }, replace: true });
    },
    onError: () => addToast({ description: MSG_NOTE_NEW_FAILED, type: 'error' }),
  });

  const isSubmitEnabled = title.trim().length > 0 && body.trim().length > 0 && !isPending;

  const characterCount = title.length + body.length;
  const noteCharacterCountText = `${characterCount.toLocaleString()} / ${NOTE_BODY.maxLength.toLocaleString()}${MSG_NOTE_NEW_CHARACTER_COUNT_SUFFIX}`;

  const handleSubmitClick = () => {
    if (!isSubmitEnabled) return;
    saveNote({ title: title.trim(), body: body.trim() });
  };

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value.slice(0, NOTE_BODY.maxLength));
  };

  const handleBodyFocus = () => setIsBodyFocused(true);

  const handleBodyBlur = () => setIsBodyFocused(false);

  const handleKeyboardDismissPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault(); // 버튼 터치로 포커스가 다시 이동하지 않도록 기본 동작 방지
    bodyTextareaRef.current?.blur(); // 본문 입력창 포커스 해제
    setIsBodyFocused(false); // 키보드 닫기 버튼 숨김 처리
  };

  useEffect(() => {
    if (!bodyTextareaRef.current) return;

    bodyTextareaRef.current.style.height = 'auto';
    bodyTextareaRef.current.style.height = `${bodyTextareaRef.current.scrollHeight}px`;
  }, [body]);

  return (
    <div className="flex h-full flex-col bg-neutral-0">
      <Header
        title={MSG_NOTE_NEW_PAGE_TITLE}
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

      <section className="flex flex-1 flex-col overflow-y-auto pt-4">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={MSG_NOTE_NEW_TITLE_PLACEHOLDER}
          aria-label={MSG_NOTE_NEW_TITLE_ARIA_LABEL}
          className="mb-3 w-full px-mobile text-title3 text-neutral-80 outline-none placeholder:text-neutral-40"
        />

        <textarea
          ref={bodyTextareaRef}
          value={body}
          onChange={handleBodyChange}
          onFocus={handleBodyFocus}
          onBlur={handleBodyBlur}
          maxLength={NOTE_BODY.maxLength}
          placeholder={MSG_NOTE_NEW_BODY_PLACEHOLDER}
          aria-label={MSG_NOTE_NEW_BODY_ARIA_LABEL}
          className="min-h-[1.25rem] flex-1 resize-none overflow-hidden break-words px-mobile text-caption2 text-neutral-80 outline-none placeholder:text-neutral-40"
          rows={1}
        />
      </section>

      <footer className="px-mobile pb-safe-bottom">
        <p className="mb-1 text-right text-caption2 text-neutral-60">{noteCharacterCountText}</p>
      </footer>

      {isBodyFocused && (
        <div className="fixed inset-x-0 bottom-2 z-fixedBtn mx-auto flex max-w-mobile justify-end px-mobile">
          <button
            type="button"
            aria-label={MSG_NOTE_NEW_DISMISS_KEYBOARD}
            onPointerDown={handleKeyboardDismissPointerDown}
            className="grid size-11 place-items-center rounded-full bg-neutral-100 text-neutral-0 shadow-[0_0.25rem_1rem_rgba(0,0,0,0.18)]"
          >
            <KeyboardDismissIcon className="size-7" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteNew;
