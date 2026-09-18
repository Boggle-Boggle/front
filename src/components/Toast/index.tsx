import { useEffect, useState } from 'react';

import { IconCancel, IconCircleCancel, IconCircleCheck, IconCircleInfo } from 'components/icons';

export type ToastProps = {
  type: 'info' | 'error' | 'success';
  description: string;
  title?: string;
  size?: 'small' | 'large';
  dismissible?: boolean;
};

const TOAST_VISIBLE_DURATION_MS = 2000;

export const Toast = (props: ToastProps) => {
  const { type, description, title, size = 'small', dismissible = false } = props;
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
    }, TOAST_VISIBLE_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  const backgroundClass = type === 'info' ? 'bg-information' : type === 'error' ? 'bg-danger' : 'bg-primary';
  const animationClass = isLeaving ? 'animate-fadeOutSlow' : 'animate-toastIn';
  const layoutClass = size === 'large' ? 'flex flex-col gap-1' : 'flex items-center gap-1';
  const showTitle = Boolean(title) && size === 'large';
  const icon =
    type === 'info' ? (
      <IconCircleInfo className="size-4 text-neutral-0" />
    ) : type === 'error' ? (
      <IconCircleCancel className="size-4 text-neutral-0" />
    ) : (
      <IconCircleCheck className="size-4 text-neutral-0" />
    );

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`rounded-xl px-4 py-2 text-neutral-0 shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.16)] ${backgroundClass} ${animationClass} ${layoutClass}`}
    >
      {showTitle && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {icon}
            <span className="text-body2 text-neutral-0">{title}</span>
          </div>
          {dismissible && (
            <button type="button" aria-label="닫기">
              <IconCancel className="size-4 text-neutral-0 opacity-60" />
            </button>
          )}
        </div>
      )}
      <div className="flex items-center gap-1 text-caption1 text-neutral-0">
        {!showTitle && icon}
        {description}
      </div>
      {dismissible && !showTitle && (
        <button type="button" aria-label="닫기" className="ml-auto">
          <IconCancel className="size-4 text-neutral-0 opacity-60" />
        </button>
      )}
    </div>
  );
};
