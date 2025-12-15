'use client';

import { useQuery } from '@apollo/client/react';
import { GET_MANGAS } from '@/graphql/queries';
import MangaCard from '@/components/MangaCard';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const { data, loading, error } = useQuery(GET_MANGAS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;

  const mangas = data?.getMangas ?? [];

  return (
    <div className="space-y-6">
      {/* 🔍 ПОИСК */}
      <SearchBar />

      {/* 📚 КАТАЛОГ */}
      <div className="grid grid-cols-3 gap-4">
        {mangas.map((manga: any) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </div>
  );
}

