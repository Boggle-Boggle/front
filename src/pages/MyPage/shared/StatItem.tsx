import { ReactNode } from 'react';

type StatItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

const StatItem = (props: StatItemProps) => {
  const { icon, label, value } = props;

  return (
    <div className="flex h-20 flex-1 flex-col items-center justify-center rounded-xl border-2 border-neutral-0 text-neutral-0">
      {icon}
      <p className="pb-[0.125rem] pt-1 text-caption3">{label}</p>
      <p className="text-title4">{value}</p>
    </div>
  );
};

export default StatItem;
