import { create } from 'zustand';

interface FavoriteState {
  favorites: string[];
  toggle: (id: string) => void;
  setFavorites: (ids: string[]) => void;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favorites: [],
  toggle: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),
  setFavorites: (ids) => set({ favorites: ids }),
}));
