type SectionValueProps = {
  label: string;
  value: string;
};

export const SectionValue = (props: SectionValueProps) => {
  const { label, value } = props;

  return (
    <div className="flex h-12 w-full items-center justify-between gap-2 px-mobile">
      <span className="text-body1">{label}</span>
      <span className="text-body1 text-neutral-60">{value}</span>
    </div>
  );
};
