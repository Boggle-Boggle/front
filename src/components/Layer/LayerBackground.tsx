type LayerBackgroundProps = {
  onClose: () => void;
};

const LayerBackground = ({ onClose }: LayerBackgroundProps) => {
  return (
    <div
      className="fixed inset-0 z-layer mx-auto max-w-mobile bg-black opacity-20"
      onClick={onClose}
      role="presentation"
    />
  );
};

export default LayerBackground;
