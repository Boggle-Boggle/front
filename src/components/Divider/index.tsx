type DividerProps = {
  size?: number;
  className?: string;
};

export const Divider = (props: DividerProps) => {
  const { size = 1, className } = props;
  const dividerClassName = className ?? 'border-neutral-20';

  return <div className={`w-full border-t ${dividerClassName}`} style={{ borderTopWidth: size }} />;
};
