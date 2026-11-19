import { ChangeEvent, RefObject } from 'react';

type NoteEditorFieldsProps = {
  title: string;
  body: string;
  titleTextareaRef: RefObject<HTMLTextAreaElement>;
  bodyTextareaRef: RefObject<HTMLTextAreaElement>;
  titleMinLength: number;
  titleMaxLength: number;
  bodyMinLength: number;
  bodyMaxLength: number;
  titlePlaceholder: string;
  bodyPlaceholder: string;
  titleAriaLabel: string;
  bodyAriaLabel: string;
  onTitleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBodyChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onTitleFocus: () => void;
  onTitleBlur: () => void;
  onBodyFocus: () => void;
  onBodyBlur: () => void;
  disabled?: boolean;
};

export const NoteEditorFields = (props: NoteEditorFieldsProps) => {
  const {
    title,
    body,
    titleTextareaRef,
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
    onTitleFocus,
    onTitleBlur,
    onBodyFocus,
    onBodyBlur,
    disabled = false,
  } = props;

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-4">
      <textarea
        disabled={disabled}
        ref={titleTextareaRef}
        value={title}
        onChange={onTitleChange}
        onFocus={onTitleFocus}
        onBlur={onTitleBlur}
        minLength={titleMinLength}
        maxLength={titleMaxLength}
        placeholder={titlePlaceholder}
        aria-label={titleAriaLabel}
        rows={1}
        className="mb-3 min-h-0 w-full resize-none break-words px-mobile text-title3 text-neutral-80 outline-none placeholder:text-neutral-40"
      />

      <textarea
        disabled={disabled}
        ref={bodyTextareaRef}
        value={body}
        onChange={onBodyChange}
        onFocus={onBodyFocus}
        onBlur={onBodyBlur}
        minLength={bodyMinLength}
        maxLength={bodyMaxLength}
        placeholder={bodyPlaceholder}
        aria-label={bodyAriaLabel}
        className="min-h-0 flex-1 resize-none overflow-y-auto break-words px-mobile text-caption2 text-neutral-80 outline-none placeholder:text-neutral-40"
        rows={1}
      />
    </section>
  );
};
