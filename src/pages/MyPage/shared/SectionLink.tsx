import { ReactNode } from 'react';

import { IconArrowRight } from 'components/icons';

type SectionLinkProps = {
  label: string;
  leading?: ReactNode;
  onClick: () => void;
  isLast?: boolean;
};

export const SectionLink = (props: SectionLinkProps) => {
  const { label, leading, onClick, isLast = false } = props;
  const marginClass = isLast ? 'mb-10' : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-12 w-full items-center justify-between gap-2 px-mobile ${marginClass}`}
    >
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <span className="flex-1 text-left text-body1">{label}</span>
      <IconArrowRight className="size-icon-sm shrink-0" />
    </button>
  );
};
