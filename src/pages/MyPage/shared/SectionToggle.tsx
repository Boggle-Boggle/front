import { ReactNode } from 'react';

import { Switch } from 'components/Switch';

type SectionToggleProps = {
  label: string;
  leading?: ReactNode;
  checked: boolean;
  onChange: () => void;
};

export const SectionToggle = (props: SectionToggleProps) => {
  const { label, leading, checked, onChange } = props;

  const handleChange = () => {
    onChange();
  };

  return (
    <div className="flex h-12 items-center gap-2 px-mobile">
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <span className="flex-1 text-body1">{label}</span>
      <Switch checked={checked} onChange={handleChange} ariaLabel={label} />
    </div>
  );
};
