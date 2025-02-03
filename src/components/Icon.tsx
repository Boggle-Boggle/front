type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type IconProps = {
  size?: IconSize;
  style?: React.CSSProperties;
  // color
  // onClick?: () => void;
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const sizeMap: Record<IconSize, number | string> = {
  xs: '1rem',
  sm: '1.325rem',
  md: '1.75rem',
  lg: '2rem',
  xl: '2.25rem',
};

const Icon = ({ size = 'md', style, Component }: IconProps) => {
  const iconSize = sizeMap[size];
  return <Component width={iconSize} height={iconSize} style={style} />;
};

export default Icon;
