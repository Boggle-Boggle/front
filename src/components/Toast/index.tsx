import { useEffect, useState } from 'react';

import { IconCancel, IconCircleCancel, IconCircleCheck, IconCircleInfo } from 'components/icons';

export type ToastProps = {
  type: 'info' | 'error' | 'success';
  description: string;
  title?: string;
  size?: 'small' | 'large';
  dismissible?: boolean;
};

export const Toast = (props: ToastProps) => {
  const { type, description, title, size = 'small', dismissible = false } = props;
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const borderClass = type === 'info' ? 'border-information' : type === 'error' ? 'border-danger' : 'border-primary';
  const animationClass = isLeaving ? 'animate-fadeOutSlow' : 'animate-fadeInSlow';
  const layoutClass = size === 'large' ? 'flex flex-col gap-1' : 'flex items-center gap-1';
  const contentColorClass = size === 'large' ? 'text-neutral-60' : 'text-neutral-80';
  const showTitle = Boolean(title) && size === 'large';
  const icon =
    type === 'info' ? (
      <IconCircleInfo className="size-4 text-information" />
    ) : type === 'error' ? (
      <IconCircleCancel className="size-4 text-danger" />
    ) : (
      <IconCircleCheck className="size-4 text-primary" />
    );

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`rounded-xl border bg-neutral-0 px-4 py-2 ${borderClass} ${animationClass} ${layoutClass}`}
    >
      {showTitle && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {icon}
            <span className="text-body2 text-neutral-80">{title}</span>
          </div>
          {dismissible && (
            <button type="button" aria-label="닫기">
              <IconCancel className="size-4 text-neutral-100 opacity-20" />
            </button>
          )}
        </div>
      )}
      <div className={`flex items-center gap-1 text-caption1 ${contentColorClass}`}>
        {!showTitle && icon}
        {description}
      </div>
      {dismissible && !showTitle && (
        <button type="button" aria-label="닫기" className="ml-auto">
          <IconCancel className="size-4 text-neutral-100 opacity-20" />
        </button>
      )}
    </div>
  );
};
