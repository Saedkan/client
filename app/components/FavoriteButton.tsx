'use client';

import { useFavoriteStore } from '@/stores/favorites.store';

export function FavoriteButton({ mangaId }: { mangaId: string }) {
  const { favorites, toggle } = useFavoriteStore();
  const active = favorites.includes(mangaId);

  return (
    <button onClick={() => toggle(mangaId)}>
      {active ? '❤️' : '🤍'}
    </button>
  );
}
