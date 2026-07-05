export type SegmentedControlOption<TValue extends string> = {
  value: TValue;
  label: string;
};

export type SegmentedControlOptions<TValue extends string> = {
  left: SegmentedControlOption<TValue>;
  right: SegmentedControlOption<TValue>;
};

type SegmentedControlProps<TValue extends string> = {
  options: SegmentedControlOptions<TValue>;
  value: TValue;
  onChange: (value: TValue) => void;
  ariaLabel?: string;
  className?: string;
};

export const SegmentedControl = <TValue extends string>(props: SegmentedControlProps<TValue>) => {
  const { options, value, onChange, ariaLabel = '세그먼트 컨트롤', className = '' } = props;
  const { left, right } = options;
  const isLeftSelected = left.value === value;
  const isRightSelected = right.value === value;
  const leftButtonClassName = `h-full text-title4 transition-all duration-300 ease-out ${
    isLeftSelected ? 'bg-primary px-4 text-neutral-0' : 'bg-neutral-0 px-2 text-neutral-60'
  }`;
  const rightButtonClassName = `h-full text-title4 transition-all duration-300 ease-out ${
    isRightSelected ? 'bg-primary px-4 text-neutral-0' : 'bg-neutral-0 px-2 text-neutral-60'
  }`;

  const handleSelectOption = (nextValue: TValue) => () => {
    onChange(nextValue);
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`inline-flex h-7 overflow-hidden rounded border border-primary ${className}`}
    >
      <button
        type="button"
        aria-pressed={isLeftSelected}
        onClick={handleSelectOption(left.value)}
        className={leftButtonClassName}
      >
        {left.label}
      </button>
      <button
        type="button"
        aria-pressed={isRightSelected}
        onClick={handleSelectOption(right.value)}
        className={rightButtonClassName}
      >
        {right.label}
      </button>
    </div>
  );
};
