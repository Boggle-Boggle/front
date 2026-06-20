import { create } from 'zustand';

type Layer = {
  id: string;
  component: React.ReactNode;
};

type LayerStoreType = {
  layers: Layer[];
  push: (layer: Layer) => void;
  pop: () => void;
};

export const useLayerStore = create<LayerStoreType>((set, get) => ({
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
