import { useEffect, useState } from 'react';
import useLayerStore from 'stores/useLayerStore';

const useLayer = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const { pop } = useLayerStore();

  useEffect(() => {
    setMounted(true);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  const handleAnimationEnd = () => {
    if (!visible) {
      setMounted(false);
      pop();
    }
  };

  return { mounted, visible, handleAnimationEnd, handleClose };
};

export default useLayer;
