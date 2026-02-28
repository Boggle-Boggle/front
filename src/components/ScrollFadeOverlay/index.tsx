type ScrollFadeOverlaySide = 'left' | 'right' | 'both';
type ScrollFadeOverlayIntensity = 'soft' | 'hard';

type ScrollFadeOverlayProps = {
  edge?: ScrollFadeOverlaySide;
  intensity?: ScrollFadeOverlayIntensity;
  className?: string;
};

const SIDE_POSITION_CLASS_NAME: Record<Exclude<ScrollFadeOverlaySide, 'both'>, string> = {
  left: 'left-0 bg-gradient-to-r',
  right: 'right-0 bg-gradient-to-l',
};

const INTENSITY_GRADIENT_CLASS_NAME: Record<ScrollFadeOverlayIntensity, string> = {
  soft: 'from-white/75 via-white/35 to-transparent',
  hard: 'from-white via-white/80 to-transparent',
};

const INTENSITY_GLOW_CLASS_NAME: Record<ScrollFadeOverlayIntensity, string> = {
  soft: 'bg-white/22 blur-[4px] opacity-65',
  hard: 'bg-white/34 blur-[6px] opacity-85',
};

const DEFAULT_EDGE_CLASS_NAME = 'w-14';
const GLOW_WIDTH_CLASS_NAME = 'w-mobile';

const FadeOverlayLayer = (props: {
  edge: ScrollFadeOverlaySide;
  intensity: ScrollFadeOverlayIntensity;
  className: string;
}) => {
  const { edge, intensity, className } = props;

  if (edge === 'both') return null;

  const positionClassName = SIDE_POSITION_CLASS_NAME[edge];
  const gradientClassName = INTENSITY_GRADIENT_CLASS_NAME[intensity];
  const glowClassName = INTENSITY_GLOW_CLASS_NAME[intensity];

  return (
    <>
      <div
        className={`pointer-events-none absolute top-0 z-fade h-full ${className} ${positionClassName} ${gradientClassName}`}
      />
      <div
        className={`pointer-events-none absolute top-0 z-glow h-full ${GLOW_WIDTH_CLASS_NAME} ${positionClassName} ${glowClassName}`}
      />
    </>
  );
};

export const ScrollFadeOverlay = (props: ScrollFadeOverlayProps) => {
  const { edge = 'right', intensity = 'hard', className = DEFAULT_EDGE_CLASS_NAME } = props;

  return (
    <>
      {(edge === 'left' || edge === 'both') && (
        <FadeOverlayLayer edge="left" intensity={intensity} className={className} />
      )}
      {(edge === 'right' || edge === 'both') && (
        <FadeOverlayLayer edge="right" intensity={intensity} className={className} />
      )}
    </>
  );
};
