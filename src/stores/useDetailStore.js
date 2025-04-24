import { create } from 'zustand';

const useDetailStore = create((set) => ({
    detailData: {},
    setDetailData: (data) => set({ detailData: data }),
}));

export default useDetailStore;
