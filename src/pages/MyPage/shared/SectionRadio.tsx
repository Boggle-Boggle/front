import { ReactNode, useId } from 'react';

import { Radio } from 'components/Radio';

type SectionRadioProps = {
  label: string;
  name: string;
  leading: ReactNode;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
};

export const SectionRadio = (props: SectionRadioProps) => {
  const { label, name, leading, checked, onChange, disabled = false } = props;

  const id = useId();

  const handleChange = () => {
    onChange();
  };

  return (
    <Radio
      id={id}
      name={name}
      checked={checked}
      onChange={handleChange}
      variant="primary"
      disabled={disabled}
      className="h-12 gap-2 px-mobile"
    >
      <div className="flex items-center gap-2">
        <div className="shrink-0">{leading}</div>
        <span className="flex-1 text-body1">{label}</span>
      </div>
    </Radio>
  );
};
