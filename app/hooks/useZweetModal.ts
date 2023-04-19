import { create } from "zustand";

interface ZweetModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useZweetModal = create<ZweetModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useZweetModal;
