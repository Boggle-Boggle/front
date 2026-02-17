import { useEffect, useState } from 'react';

import { IconCircleCancel, IconCircleCheck, IconCircleInfo } from 'components/icons';

export type ToastProps = {
  type: 'info' | 'error' | 'success';
  description: string;
  title?: string;
  // dismissible?: boolean;
};

export const Toast = (props: ToastProps) => {
  const { type, description, title } = props;
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const borderClass = type === 'info' ? 'border-information' : type === 'error' ? 'border-danger' : 'border-primary';
  const icon =
    type === 'info' ? (
      <IconCircleInfo className="mr-1 text-information" />
    ) : type === 'error' ? (
      <IconCircleCancel className="mr-1 text-danger" />
    ) : (
      <IconCircleCheck className="mr-1 text-primary" />
    );

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`${borderClass} ${isLeaving ? 'animate-fadeOutSlow' : 'animate-fadeInSlow'} rounded-xl border bg-neutral-0 px-4 py-2`}
    >
      {title && (
        <div className="mb-1 flex items-center text-body2 text-neutral-80">
          {icon}
          {title}
        </div>
      )}
      <div className={`flex items-center text-caption1 ${title ? 'text-neutral-60' : 'text-neutral-80'}`}>
        {!title && icon}
        {description}
      </div>
    </div>
  );
};
