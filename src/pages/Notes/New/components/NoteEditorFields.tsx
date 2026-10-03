import { ChangeEvent, RefObject } from 'react';

type NoteEditorFieldsProps = {
  title: string;
  body: string;
  bodyTextareaRef: RefObject<HTMLTextAreaElement>;
  titleMinLength: number;
  titleMaxLength: number;
  bodyMinLength: number;
  bodyMaxLength: number;
  titlePlaceholder: string;
  bodyPlaceholder: string;
  titleAriaLabel: string;
  bodyAriaLabel: string;
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBodyChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBodyFocus: () => void;
  onBodyBlur: () => void;
};

export const NoteEditorFields = (props: NoteEditorFieldsProps) => {
  const {
    title,
    body,
    bodyTextareaRef,
    titleMinLength,
    titleMaxLength,
    bodyMinLength,
    bodyMaxLength,
    titlePlaceholder,
    bodyPlaceholder,
    titleAriaLabel,
    bodyAriaLabel,
    onTitleChange,
    onBodyChange,
    onBodyFocus,
    onBodyBlur,
  } = props;

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-4">
      <input
        value={title}
        onChange={onTitleChange}
        minLength={titleMinLength}
        maxLength={titleMaxLength}
        placeholder={titlePlaceholder}
        aria-label={titleAriaLabel}
        className="mb-3 w-full px-mobile text-title3 text-neutral-80 outline-none placeholder:text-neutral-40"
      />

      <textarea
        ref={bodyTextareaRef}
        value={body}
        onChange={onBodyChange}
        onFocus={onBodyFocus}
        onBlur={onBodyBlur}
        minLength={bodyMinLength}
        maxLength={bodyMaxLength}
        placeholder={bodyPlaceholder}
        aria-label={bodyAriaLabel}
        className="min-h-[1.25rem] flex-1 resize-none overflow-hidden break-words px-mobile text-caption2 text-neutral-80 outline-none placeholder:text-neutral-40"
        rows={1}
      />
    </section>
  );
};
