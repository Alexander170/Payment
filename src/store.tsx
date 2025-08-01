import { create } from "zustand";

export type Status = "idle" | "ok" | "fail" | "loading";

interface StatusStore {
  status: Status;
  setStatus: (status: Status) => void;
  //   resetStatus: () => void;
}

export const useStatusStore = create<StatusStore>((set) => ({
  status: "idle",
  setStatus: (status) => set({ status }),
  //   resetStatus: () => set({ status: "idle" }),
}));
