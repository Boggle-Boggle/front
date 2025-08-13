import { createPortal } from 'react-dom';
import useLayerStore from 'stores/useLayerStore';

const LayerContainer = () => {
  const { layers, pop } = useLayerStore();

  return (
    layers.length > 0 &&
    createPortal(
      <div
        className="z-layer fixed grid h-dvh w-full max-w-mobile place-items-center bg-neutral-100 opacity-30"
        onClick={pop}
        role="presentation"
      >
        {/* TODO */}
        {layers.map((layer) => (
          <div key={layer.toString()} />
        ))}
      </div>,
      document.getElementById('modal') as HTMLElement,
    )
  );
};

export default LayerContainer;
