type FullScreenType = {
  children: React.ReactNode;
};

export const FullScreen = ({ children }: FullScreenType) => {
  return <div className="absolute z-layer h-full w-full bg-neutral-0">{children}</div>;
};
