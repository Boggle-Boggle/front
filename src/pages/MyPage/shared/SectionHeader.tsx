type SectionHeaderProps = {
  title: string;
};

export const SectionHeader = (props: SectionHeaderProps) => {
  const { title } = props;

  return <div className="bg-neutral-20 px-mobile py-3 text-body1">{title}</div>;
};
