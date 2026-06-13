import { ReactNode } from 'react';

import { IconArrowRight } from 'components/icons';

type SectionLinkProps = {
  label: string;
  leading?: ReactNode;
  onClick: () => void;
};

export const SectionLink = (props: SectionLinkProps) => {
  const { label, leading, onClick } = props;

  return (
    <button type="button" onClick={onClick} className="flex h-12 w-full items-center justify-between gap-2 px-mobile">
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <span className="flex-1 text-left text-body1">{label}</span>
      <IconArrowRight className="size-4 shrink-0" />
    </button>
  );
};
