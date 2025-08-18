import { create } from 'zustand';

type LayerType = 'MODAL' | 'SIDEBAR' | 'BOTTOM_SHEET';

type Layer = {
  id: string;
  type: LayerType;
  component: React.ReactNode;
};

type LayerStoreType = {
  layers: Layer[];
  push: (layer: Layer) => void;
  pop: () => void;
};

const useLayerStore = create<LayerStoreType>((set, get) => ({
  layers: [],
  push: (layer) => {
    set((state) => ({ layers: [...state.layers, layer] }));
  },
  pop: () => {
    const layer = [...get().layers];
    layer.pop();
    set(() => ({ layers: layer }));
  },
}));

export default useLayerStore;
