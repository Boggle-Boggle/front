type DividerProps = {
  size?: number;
  className?: string;
};

const DEFAULT_DIVIDER_CLASS_NAME = 'border-neutral-20';

export const Divider = (props: DividerProps) => {
  const { size = 1, className } = props;
  const dividerClassName = className ?? DEFAULT_DIVIDER_CLASS_NAME;

  return <div className={`w-full border-t ${dividerClassName}`} style={{ borderTopWidth: size }} />;
};
