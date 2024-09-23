import { create } from 'zustand';

type SnapshotWithScale = {
  snapshot: any;
  scale: number;
};

interface SnapshotStore {
  snapshot: SnapshotWithScale | null;
  setSnapshot: (snapshot: SnapshotWithScale) => void;
}

export const useSnapshotStore = create<SnapshotStore>((set) => ({
  snapshot: null,
  setSnapshot: (snapshot) => set({ snapshot }),
}));
