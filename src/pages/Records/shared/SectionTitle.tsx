type SectionTitleProps = {
  title: string;
};

export const SectionTitle = (props: SectionTitleProps) => {
  const { title } = props;

  return <p className="h-[1.875rem] text-body1">{title}</p>;
};
