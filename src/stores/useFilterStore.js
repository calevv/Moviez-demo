import { create } from "zustand";

const useFilterStore = create((set) => ({
  selectedGenre: "",
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  selectedPopular: "",
  setSelectedPopular: (Popular) => set({ selectedPopular: Popular }),
}));

export default useFilterStore;
