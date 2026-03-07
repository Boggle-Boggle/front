type DescriptionProps = {
  text: string;
  tone?: 'default' | 'warning';
  align?: 'left' | 'center';
};

export const Description = (props: DescriptionProps) => {
  const { text, tone = 'default', align = 'left' } = props;

  const toneClass = tone === 'warning' ? 'text-warning' : 'text-neutral-80';
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return <p className={`pt-2 text-caption1 ${toneClass} ${alignClass}`}>{text}</p>;
};
