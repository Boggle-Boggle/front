type BadgeProps = {
  text: string;
  variant?: 'gray' | 'white';
  className?: string;
};

export const Badge = (props: BadgeProps) => {
  const { text, variant = 'gray', className = '' } = props;

  const variantClass =
    variant === 'gray'
      ? 'bg-[#888888] text-white mix-blend-multiply'
      : 'border border-neutral-20 bg-white text-neutral-100';

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-caption3 ${variantClass} ${className}`}>
      {text}
    </span>
  );
};
