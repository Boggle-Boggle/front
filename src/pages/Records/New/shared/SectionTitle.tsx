type SectionTitleProps = {
  title: string;
};

export const SectionTitle = (props: SectionTitleProps) => {
  const { title } = props;

  return <p className="text-body1">{title}</p>;
};
