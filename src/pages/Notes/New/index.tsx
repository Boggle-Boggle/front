import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import { IconButton } from 'components/Button';
import { Header } from 'components/Header';
import { IconPlus } from 'components/icons';
import { createReadingNote } from 'pages/Records/Detail/api';

const MSG_NOTE_NEW_PAGE_TITLE = '노트 작성하기';
const MSG_NOTE_NEW_SUBMIT = '완료';
const MSG_NOTE_NEW_TITLE_PLACEHOLDER = '노트의 제목을 입력하세요';
const MSG_NOTE_NEW_BODY_PLACEHOLDER = '여기를 터치하여 내용을 입력하세요';
const MSG_NOTE_NEW_TITLE_ARIA_LABEL = '노트 제목';
const MSG_NOTE_NEW_BODY_ARIA_LABEL = '노트 본문';
const MSG_NOTE_NEW_TAG = '태그 : ';
const MSG_NOTE_NEW_ADD_TAG_ARIA_LABEL = '태그 추가';
// const MSG_NOTE_NEW_TAG_DEFAULT = '태그';
const MSG_NOTE_NEW_CHARACTER_COUNT_SUFFIX = '자';
const MSG_NOTE_NEW_SUCCESS = '독서 노트가 저장되었습니다.';
const MSG_NOTE_NEW_FAILED = '독서 노트를 저장하지 못했습니다. 다시 시도해 주세요.';
const MAX_NOTE_CHARACTER_COUNT = 10000;

const NoteNew = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const readingLogId = location.state?.readingLogId as string;
  const { mutate: saveNote, isPending } = useMutation({
    mutationFn: (data: { title: string; body: string }) => {
      return createReadingNote(readingLogId, {
        title: data.title,
        body: data.body,
        page: null,
        tags: [],
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
  const noteCharacterCountText = `${characterCount.toLocaleString()} / ${MAX_NOTE_CHARACTER_COUNT.toLocaleString()}${MSG_NOTE_NEW_CHARACTER_COUNT_SUFFIX}`;

  const handleSubmitClick = () => {
    if (!isSubmitEnabled) return;
    saveNote({ title: title.trim(), body: body.trim() });
  };

  const handleAddTag = () => {
    // setTags((prev) => [...prev, `${MSG_NOTE_NEW_TAG_DEFAULT} ${prev.length + 1}`]);
  };

  return (
    <div className="flex h-full flex-col bg-neutral-0 pt-safe-top">
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

      <section className="flex-1 overflow-y-auto pt-4">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={MSG_NOTE_NEW_TITLE_PLACEHOLDER}
          aria-label={MSG_NOTE_NEW_TITLE_ARIA_LABEL}
          className="mb-3 w-full px-mobile text-title3 text-neutral-80 outline-none placeholder:text-neutral-40"
        />

        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value.slice(0, MAX_NOTE_CHARACTER_COUNT))}
          placeholder={MSG_NOTE_NEW_BODY_PLACEHOLDER}
          aria-label={MSG_NOTE_NEW_BODY_ARIA_LABEL}
          className="min-h-[1.25rem] w-full resize-none px-mobile text-caption2 text-neutral-80 outline-none placeholder:text-neutral-40"
          rows={1}
        />
      </section>

      <footer className="px-mobile pb-safe-bottom">
        <p className="mb-1 text-right text-caption2 text-neutral-60">{noteCharacterCountText}</p>

        {/* 태그영역 */}
        <div className="flex h-11 items-center border-t border-neutral-20 text-caption1 text-neutral-60">
          <span>{MSG_NOTE_NEW_TAG}</span>

          <IconButton
            icon={IconPlus}
            onClick={handleAddTag}
            label={MSG_NOTE_NEW_ADD_TAG_ARIA_LABEL}
            size="xs"
            className="m-2 rounded-full bg-neutral-20"
          />
        </div>
      </footer>
    </div>
  );
};

export default NoteNew;
