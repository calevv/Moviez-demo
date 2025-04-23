import { create } from "zustand";

const useFilterStore = create((set) => ({
  selectedGenre: null,
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  selectedPopular: "",
  setSelectedPopular: (Popular) => set({ selectedPopular: Popular }),
}));

export default useFilterStore;
