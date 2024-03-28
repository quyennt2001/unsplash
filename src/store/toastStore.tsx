import { create } from "zustand";

export interface ToastState {
  mess: string | null;
  setToast: (mess: string) => void;
  clear: () => void;
}

export const toastStore = create<ToastState>((set) => ({
  mess: null,
  setToast: (mess: string) => set({ mess: mess }),
  clear: () => set({ mess: "" }),
}));
