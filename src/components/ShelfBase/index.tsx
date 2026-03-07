type ShelfBaseProps = {
  className?: string;
  height?: number;
  gradient?: string;
  layerOpacity?: number;
};

const DEFAULT_HEIGHT = 35;
const DEFAULT_LAYER_OPACITY = 0.5;
const DEFAULT_GRADIENT = 'linear-gradient(180deg, rgba(238, 238, 238, 1) 0%, rgba(255, 255, 255, 1) 100%)';

export const ShelfBase = (props: ShelfBaseProps) => {
  const {
    className,
    height = DEFAULT_HEIGHT,
    gradient = DEFAULT_GRADIENT,
    layerOpacity = DEFAULT_LAYER_OPACITY,
  } = props;
  const containerClassName = className ?? '';

  return (
    <div
      aria-hidden
      className={`w-full ${containerClassName} z-shelf`}
      style={{ height, background: gradient, opacity: layerOpacity }}
    />
  );
};
