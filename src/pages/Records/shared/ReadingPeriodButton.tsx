import { IconCalendar } from 'components/icons';

type ReadingPeriodButtonProps = {
  label: string;
  value: string;
  isActive?: boolean;
  onClick: () => void;
};

export const ReadingPeriodButton = (props: ReadingPeriodButtonProps) => {
  const { label, value, isActive = false, onClick } = props;

  const borderClass = isActive ? 'border-2 border-primary' : 'border border-neutral-20';
  const valueClassName = isActive ? 'text-caption1 text-neutral-100' : 'text-body1 text-neutral-100';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-16 flex-1 flex-col justify-center rounded-xl px-3 text-left ${borderClass}`}
    >
      <p className="pb-1 text-caption3 text-neutral-60">{label}</p>
      <span className={`flex items-center gap-1 ${valueClassName}`}>
        <IconCalendar className="size-icon-sm" />
        {value}
      </span>
    </button>
  );
};
