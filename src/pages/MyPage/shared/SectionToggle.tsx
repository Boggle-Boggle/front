import { ReactNode } from 'react';

import { Switch } from 'components/Switch';

type SectionToggleProps = {
  label: string;
  leading: ReactNode;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
};

export const SectionToggle = (props: SectionToggleProps) => {
  const { label, leading, checked, onChange, disabled = false } = props;

  const handleChange = () => {
    onChange();
  };

  return (
    <div className="flex h-12 items-center gap-2 px-mobile">
      <div className="shrink-0">{leading}</div>
      <span className="flex-1 text-body1 text-neutral-80">{label}</span>
      <Switch checked={checked} onChange={handleChange} disabled={disabled} ariaLabel={label} />
    </div>
  );
};
