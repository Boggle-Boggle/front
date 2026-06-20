import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { useLayerStore } from 'stores/useLayerStore';

const LayerContainer = () => {
  const { layers } = useLayerStore();

  return (
    layers.length > 0 &&
    createPortal(
      <section className="fixed inset-0 z-layer mx-auto flex max-w-mobile flex-col items-center justify-center">
        {layers.map(({ id, component }) => (
          <Fragment key={id}>{component}</Fragment>
        ))}
      </section>,
      document.getElementById('modal') as HTMLElement,
    )
  );
};

export default LayerContainer;
