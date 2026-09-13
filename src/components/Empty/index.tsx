import { ComponentType } from 'react';

import { IconCircleInfo } from 'components/icons';

interface EmptyProps {
  text?: string;
  icon?: ComponentType<{ className?: string }>;
}

export const Empty = ({ text = '데이터가 없습니다', icon: Icon = IconCircleInfo }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-solid border-neutral-20 px-6 py-8 text-center text-neutral-40">
      <Icon className="size-icon-md" />
      <p className="whitespace-pre-line break-keep text-body2">{text}</p>
    </div>
  );
};

export default Empty;
