type FullScreenType = {
  children: React.ReactNode;
};

const FullScreen = ({ children }: FullScreenType) => {
  return <div className="absolute z-layer h-full w-full bg-neutral-0">{children}</div>;
};

export default FullScreen;
