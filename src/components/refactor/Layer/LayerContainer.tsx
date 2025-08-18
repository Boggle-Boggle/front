import { createPortal } from 'react-dom';
import useLayerStore from 'stores/useLayerStore';

import BottomSheet from './BottomSheet';
import Modal from './Modal';
import SideBar from './SideBar';

const LayerContainer = () => {
  const { layers } = useLayerStore();

  return (
    layers.length > 0 &&
    createPortal(
      <section className="fixed inset-0 z-layer mx-auto flex max-w-mobile flex-col items-center justify-center">
        {layers.map(({ type, component }) => {
          if (type === 'MODAL') return <Modal>{component}</Modal>;
          if (type === 'BOTTOM_SHEET') return <BottomSheet>{component}</BottomSheet>;
          return <SideBar>{component}</SideBar>;
        })}
      </section>,
      document.getElementById('modal') as HTMLElement,
    )
  );
};

export default LayerContainer;
