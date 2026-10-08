import { create } from 'zustand';

type BottomOverlayStoreType = {
  overlayHeightById: Record<string, number>;
  bottomOverlayHeight: number;
  setOverlayHeight: (id: string, height: number) => void;
  removeOverlayHeight: (id: string) => void;
};

const getMaxOverlayHeight = (overlayHeightById: Record<string, number>) => {
  return Math.max(0, ...Object.values(overlayHeightById));
};

export const useBottomOverlayStore = create<BottomOverlayStoreType>((set) => ({
  overlayHeightById: {},
  bottomOverlayHeight: 0,
  setOverlayHeight: (id, height) => {
    set((state) => {
      const overlayHeightById = {
        ...state.overlayHeightById,
        [id]: height,
      };

      return {
        overlayHeightById,
        bottomOverlayHeight: getMaxOverlayHeight(overlayHeightById),
      };
    });
  },
  removeOverlayHeight: (id) => {
    set((state) => {
      const overlayHeightById = { ...state.overlayHeightById };
      delete overlayHeightById[id];

      return {
        overlayHeightById,
        bottomOverlayHeight: getMaxOverlayHeight(overlayHeightById),
      };
    });
  },
}));

export default useBottomOverlayStore;
