import { create } from "zustand";

type EmailViewMode = "center" | "right";

interface EmailStore {
  viewMode: EmailViewMode;
  setViewMode: (mode: EmailViewMode) => void;
}

export const useEmailStore = create<EmailStore>((set) => ({
  viewMode: "center",
  setViewMode: (mode) => set({ viewMode: mode }),
}));
