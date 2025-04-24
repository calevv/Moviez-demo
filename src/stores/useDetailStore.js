import { create } from "zustand";

const useDetailStore = create((set, get) => ({
  detailData: {},
  setDetailData: (data) => set({ detailData: data }),
}));

export default useDetailStore;
